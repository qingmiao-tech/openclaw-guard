import { computed, onMounted, reactive, ref, watch } from 'vue';
import {
  humanizeFieldName,
  isSensitiveField,
  parseBooleanLike,
  parseOptionalNumber,
} from '@/features/common/display';
import {
  clearChannelConfig,
  loadChannelsSnapshot,
  saveChannelConfig,
  type ChannelDefinition,
  type ChannelInfo,
} from '@/services/api/channels';
import { useFeedbackStore } from '@/stores/feedback';
import { useUiStore } from '@/stores/ui';
import { useAsyncResource } from '@/composables/useAsyncResource';

type SelectOption = {
  value: string;
  label: string;
};

export type FieldDescriptor = {
  key: string;
  label: string;
  kind: 'text' | 'boolean';
  inputType?: 'text' | 'password' | 'number' | 'select';
  help?: string;
  options?: SelectOption[];
  env?: boolean;
};

export type CatalogChannelItem = {
  definition: ChannelDefinition;
  enabled: boolean;
  configured: boolean;
};

export type ChannelDraftPreview = {
  enabled: boolean;
  fields: Record<string, string>;
  envFields: Record<string, string>;
};

export type ChannelsSnapshot = Awaited<ReturnType<typeof loadChannelsSnapshot>>;

const CHANNEL_SELECT_OPTIONS: Record<string, string[]> = {
  connectionMode: ['websocket', 'webhook'],
  dmPolicy: ['open', 'allowlist', 'closed'],
  groupPolicy: ['open', 'allowlist', 'closed'],
  renderMode: ['auto', 'rich', 'compact'],
};

let channelsCache: ChannelsSnapshot | null = null;

export function useChannelsPageState() {
  const ui = useUiStore();
  const feedback = useFeedbackStore();
  const resource = useAsyncResource(() => loadChannelsSnapshot(), channelsCache, {
    immediate: false,
  });

  const selectedId = ref('');
  const saving = ref(false);
  const clearing = ref(false);
  const textDraft = reactive<Record<string, string>>({});
  const boolDraft = reactive<Record<string, boolean>>({});

  const channelMap = computed(
    () => new Map((resource.data?.channels || []).map((channel) => [channel.id, channel])),
  );
  const definitionMap = computed(
    () =>
      new Map(
        (resource.data?.definitions || []).map((definition) => [definition.id, definition]),
      ),
  );

  const selectedDefinition = computed<ChannelDefinition | null>(() => {
    return definitionMap.value.get(selectedId.value) || resource.data?.definitions?.[0] || null;
  });

  const selectedChannel = computed<ChannelInfo | null>(() => {
    const definition = selectedDefinition.value;
    if (!definition) {
      return null;
    }

    return (
      channelMap.value.get(definition.id) || {
        id: definition.id,
        name: definition.name,
        icon: definition.icon,
        enabled: false,
        configured: false,
        config: {},
      }
    );
  });

  const enabledCount = computed(
    () => (resource.data?.channels || []).filter((item) => item.enabled).length,
  );
  const configuredCount = computed(
    () => (resource.data?.channels || []).filter((item) => item.configured).length,
  );

  const catalogItems = computed<CatalogChannelItem[]>(() =>
    (resource.data?.definitions || []).map((definition) => {
      const channel = channelMap.value.get(definition.id);
      return {
        definition,
        enabled: channel?.enabled === true,
        configured: channel?.configured === true,
      };
    }),
  );

  const fieldDescriptors = computed<FieldDescriptor[]>(() => {
    const definition = selectedDefinition.value;
    const result: FieldDescriptor[] = [
      {
        key: 'enabled',
        label: ui.label('启用这个渠道', 'Enable this channel'),
        kind: 'boolean',
        help: ui.label(
          '关闭后会保留配置，但运行态不会再接收这个入口的消息。',
          'Keep the config but stop receiving traffic from this channel.',
        ),
      },
    ];

    for (const fieldName of definition?.fields || []) {
      if (fieldName === 'requireMention' || fieldName === 'streaming') {
        result.push({
          key: fieldName,
          label: humanizeFieldName(fieldName),
          kind: 'boolean',
          help: ui.label('勾选即启用。', 'Checked means enabled.'),
        });
        continue;
      }

      if (CHANNEL_SELECT_OPTIONS[fieldName]) {
        result.push({
          key: fieldName,
          label: humanizeFieldName(fieldName),
          kind: 'text',
          inputType: 'select',
          options: CHANNEL_SELECT_OPTIONS[fieldName].map((value) => ({
            value,
            label: value,
          })),
        });
        continue;
      }

      result.push({
        key: fieldName,
        label: humanizeFieldName(fieldName),
        kind: 'text',
        inputType: /port/i.test(fieldName)
          ? 'number'
          : isSensitiveField(fieldName)
            ? 'password'
            : 'text',
      });
    }

    for (const fieldName of definition?.envFields || []) {
      result.push({
        key: `env:${fieldName}`,
        label: `${humanizeFieldName(fieldName)} (${fieldName})`,
        kind: 'text',
        inputType: 'password',
        env: true,
        help: ui.label(
          '留空会清除这个本机环境变量。',
          'Leave blank to clear this local environment variable.',
        ),
      });
    }

    return result;
  });

  const statusMessage = computed(() => {
    const channel = selectedChannel.value;
    if (!channel) {
      return '';
    }

    if (channel.id === 'feishu') {
      return channel.enabled
        ? ui.label(
            '飞书在开源版里作为官方渠道维护。保存后会直接更新当前机器上的接入配置和回复策略。',
            'Feishu is maintained here as an official channel. Saving updates the live connection settings on this machine.',
          )
        : ui.label(
            '飞书当前处于停用状态。先补齐机器人凭据和接入方式，再决定是否启用会更稳妥。',
            'Feishu is currently disabled. Complete the bot credentials and connection mode first, then decide whether to enable it.',
          );
    }

    return channel.enabled
      ? ui.label(
          '保存后会直接更新当前消息入口配置。',
          'Saving here updates the live channel configuration immediately.',
        )
      : ui.label(
          '这个消息入口当前停用中。可以先补齐配置，再决定是否启用。',
          'This channel is currently disabled. Finish the settings first, then decide whether to enable it.',
        );
  });

  const draftPreview = computed<ChannelDraftPreview>(() => ({
    enabled: boolDraft.enabled === true,
    fields: Object.fromEntries(
      Object.keys(textDraft)
        .filter((key) => !key.startsWith('env:'))
        .map((key) => [
          key,
          isSensitiveField(key) && textDraft[key] ? '******' : textDraft[key] ?? '',
        ]),
    ),
    envFields: Object.fromEntries(
      Object.keys(textDraft)
        .filter((key) => key.startsWith('env:'))
        .map((key) => [key, textDraft[key] ? '******' : '']),
    ),
  }));

  function resetDraft() {
    for (const key of Object.keys(textDraft)) {
      delete textDraft[key];
    }

    for (const key of Object.keys(boolDraft)) {
      delete boolDraft[key];
    }
  }

  function hydrateDraft() {
    resetDraft();

    const channel = selectedChannel.value;
    const definition = selectedDefinition.value;
    if (!channel || !definition) {
      return;
    }

    boolDraft.enabled = channel.enabled === true;

    for (const fieldName of definition.fields) {
      const value = channel.config?.[fieldName];
      if (fieldName === 'requireMention' || fieldName === 'streaming') {
        boolDraft[fieldName] = parseBooleanLike(value);
      } else {
        textDraft[fieldName] = value == null ? '' : String(value);
      }
    }

    for (const fieldName of definition.envFields) {
      const key = `env:${fieldName}`;
      textDraft[key] = channel.config?.[key] == null ? '' : String(channel.config[key]);
    }
  }

  watch(
    () => resource.data,
    (snapshot) => {
      if (snapshot) {
        channelsCache = snapshot;
      }

      const definitions = snapshot?.definitions || [];
      if (!definitions.length) {
        return;
      }

      if (!selectedId.value || !definitionMap.value.has(selectedId.value)) {
        selectedId.value = definitions[0].id;
        return;
      }

      hydrateDraft();
    },
    { immediate: true },
  );

  watch(selectedId, () => {
    hydrateDraft();
  });

  onMounted(() => {
    void resource.execute({ silent: !!resource.data });
  });

  async function refresh() {
    await resource.execute({ silent: true });
  }

  async function handleSave() {
    const channel = selectedChannel.value;
    const definition = selectedDefinition.value;
    if (!channel || !definition) {
      return;
    }

    saving.value = true;

    try {
      const payload: Record<string, unknown> = {
        enabled: boolDraft.enabled === true,
      };

      for (const fieldName of definition.fields) {
        if (fieldName === 'requireMention' || fieldName === 'streaming') {
          payload[fieldName] = boolDraft[fieldName] === true;
          continue;
        }

        const value = textDraft[fieldName] ?? '';
        if (/port/i.test(fieldName)) {
          payload[fieldName] = parseOptionalNumber(value) ?? '';
        } else {
          payload[fieldName] = value;
        }
      }

      for (const fieldName of definition.envFields) {
        payload[`env:${fieldName}`] = textDraft[`env:${fieldName}`] ?? '';
      }

      const result = await saveChannelConfig(channel.id, payload);
      feedback.pushToast({
        tone: result.success ? 'success' : 'error',
        message: result.message,
      });
      await refresh();
    } catch (error) {
      feedback.pushToast({
        tone: 'error',
        message: error instanceof Error ? error.message : String(error),
      });
    } finally {
      saving.value = false;
    }
  }

  async function handleClear() {
    const channel = selectedChannel.value;
    if (!channel) {
      return;
    }

    const confirmed = await feedback.confirm({
      title: ui.label('清空渠道配置', 'Clear channel configuration'),
      message: ui.label(
        `确认清空 ${channel.name || channel.id} 的配置吗？这会移除本机保存的字段和值。`,
        `Clear the configuration for ${channel.name || channel.id}? This removes the saved local values for this channel.`,
      ),
      confirmLabel: ui.label('确认清空', 'Clear configuration'),
      cancelLabel: ui.label('取消', 'Cancel'),
      tone: 'danger',
    });
    if (!confirmed) {
      return;
    }

    clearing.value = true;

    try {
      const result = await clearChannelConfig(channel.id);
      feedback.pushToast({
        tone: result.success ? 'success' : 'error',
        message: result.message,
      });
      await refresh();
    } catch (error) {
      feedback.pushToast({
        tone: 'error',
        message: error instanceof Error ? error.message : String(error),
      });
    } finally {
      clearing.value = false;
    }
  }

  return {
    resource,
    selectedId,
    saving,
    clearing,
    textDraft,
    boolDraft,
    catalogItems,
    selectedDefinition,
    selectedChannel,
    enabledCount,
    configuredCount,
    fieldDescriptors,
    statusMessage,
    draftPreview,
    refresh,
    hydrateDraft,
    handleSave,
    handleClear,
  };
}

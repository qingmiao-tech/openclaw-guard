<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useAsyncResource } from '@/composables/useAsyncResource';
import { humanizeFieldName, isSensitiveField, parseBooleanLike, parseOptionalNumber } from '@/features/common/display';
import PageCard from '@/features/common/PageCard.vue';
import { clearChannelConfig, loadChannelsSnapshot, saveChannelConfig, type ChannelDefinition } from '@/services/api/channels';
import { useFeedbackStore } from '@/stores/feedback';
import { useUiStore } from '@/stores/ui';

type SelectOption = {
  value: string;
  label: string;
};

type FieldDescriptor = {
  key: string;
  label: string;
  kind: 'text' | 'boolean';
  inputType?: 'text' | 'password' | 'number' | 'select';
  help?: string;
  options?: SelectOption[];
  env?: boolean;
};

const CHANNEL_SELECT_OPTIONS: Record<string, string[]> = {
  connectionMode: ['websocket', 'webhook'],
  dmPolicy: ['open', 'allowlist', 'closed'],
  groupPolicy: ['open', 'allowlist', 'closed'],
  renderMode: ['auto', 'rich', 'compact'],
};

const ui = useUiStore();
const feedback = useFeedbackStore();
const resource = useAsyncResource(() => loadChannelsSnapshot());
const selectedId = ref('');
const saving = ref(false);
const clearing = ref(false);
const textDraft = reactive<Record<string, string>>({});
const boolDraft = reactive<Record<string, boolean>>({});

const channelMap = computed(() => new Map((resource.data?.channels || []).map((channel) => [channel.id, channel])));
const definitionMap = computed(() => new Map((resource.data?.definitions || []).map((definition) => [definition.id, definition])));

const selectedDefinition = computed<ChannelDefinition | null>(() => {
  return definitionMap.value.get(selectedId.value) || resource.data?.definitions?.[0] || null;
});

const selectedChannel = computed(() => {
  const definition = selectedDefinition.value;
  if (!definition) return null;
  return channelMap.value.get(definition.id) || {
    id: definition.id,
    name: definition.name,
    icon: definition.icon,
    enabled: false,
    configured: false,
    config: {},
  };
});

const enabledCount = computed(() => (resource.data?.channels || []).filter((item) => item.enabled).length);
const configuredCount = computed(() => (resource.data?.channels || []).filter((item) => item.configured).length);

const fieldDescriptors = computed<FieldDescriptor[]>(() => {
  const definition = selectedDefinition.value;
  const result: FieldDescriptor[] = [
    {
      key: 'enabled',
      label: ui.label('启用这个渠道', 'Enable this channel'),
      kind: 'boolean',
      help: ui.label('关闭后保留配置，但运行态不会接收这个入口的消息。', 'Keep the config but stop receiving traffic from this channel.'),
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
        options: CHANNEL_SELECT_OPTIONS[fieldName].map((value) => ({ value, label: value })),
      });
      continue;
    }

    result.push({
      key: fieldName,
      label: humanizeFieldName(fieldName),
      kind: 'text',
      inputType: /port/i.test(fieldName) ? 'number' : isSensitiveField(fieldName) ? 'password' : 'text',
    });
  }

  for (const fieldName of definition?.envFields || []) {
    result.push({
      key: `env:${fieldName}`,
      label: `${humanizeFieldName(fieldName)} (${fieldName})`,
      kind: 'text',
      inputType: 'password',
      env: true,
      help: ui.label('留空会清除这个本机环境变量。', 'Leave blank to clear this local environment variable.'),
    });
  }

  return result;
});

function resetDraft() {
  for (const key of Object.keys(textDraft)) delete textDraft[key];
  for (const key of Object.keys(boolDraft)) delete boolDraft[key];
}

function hydrateDraft() {
  resetDraft();
  const channel = selectedChannel.value;
  const definition = selectedDefinition.value;
  if (!channel || !definition) return;

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
    const definitions = snapshot?.definitions || [];
    if (!definitions.length) return;
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

function statusMessage() {
  const channel = selectedChannel.value;
  if (!channel) return '';
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
    ? ui.label('保存后会直接更新当前消息入口配置。', 'Saving here updates the live channel configuration immediately.')
    : ui.label('这个消息入口当前停用中。可以先补齐配置，再决定是否启用。', 'This channel is currently disabled. Finish the settings first, then decide whether to enable it.');
}

async function handleSave() {
  const channel = selectedChannel.value;
  const definition = selectedDefinition.value;
  if (!channel || !definition) return;

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
    await resource.execute({ silent: true });
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
  if (!channel) return;

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
  if (!confirmed) return;

  clearing.value = true;
  try {
    const result = await clearChannelConfig(channel.id);
    feedback.pushToast({
      tone: result.success ? 'success' : 'error',
      message: result.message,
    });
    await resource.execute({ silent: true });
  } catch (error) {
    feedback.pushToast({
      tone: 'error',
      message: error instanceof Error ? error.message : String(error),
    });
  } finally {
    clearing.value = false;
  }
}

function getTextValue(key: string) {
  return textDraft[key] ?? '';
}
</script>

<template>
  <div class="page-stack">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ ui.label('渠道 / Second slice', 'Channels / Second slice') }}</p>
        <h2 class="page-header__title">{{ ui.label('渠道管理', 'Channel management') }}</h2>
        <p class="page-header__description">
          {{ ui.label('先把官方渠道和内置入口迁入模块化外壳，保持真实配置读写，后续再承接插件扩展。', 'Move official channels and built-in entry points into the modular shell with real read-write behavior, then extend from here later.') }}
        </p>
      </div>
      <button class="page-header__action" type="button" @click="resource.execute({ silent: true })">
        {{ resource.refreshing ? ui.label('刷新中…', 'Refreshing…') : ui.label('刷新', 'Refresh') }}
      </button>
    </header>

    <div v-if="resource.loading" class="page-empty">
      {{ ui.label('正在读取渠道配置…', 'Loading channel configuration…') }}
    </div>
    <div v-else-if="resource.error" class="page-empty page-empty--error">
      {{ resource.error }}
    </div>
    <template v-else-if="resource.data && selectedChannel">
      <PageCard :title="ui.label('当前概览', 'Current overview')" eyebrow="Summary">
        <div class="stat-grid">
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('可管理渠道', 'Channels') }}</p>
            <strong>{{ resource.data.definitions.length }}</strong>
            <span>{{ ui.label('当前内置和官方入口总数', 'Built-in and official entry points available now') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('已启用', 'Enabled') }}</p>
            <strong>{{ enabledCount }}</strong>
            <span>{{ ui.label('运行态会接收消息', 'Receives traffic at runtime') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('已配置', 'Configured') }}</p>
            <strong>{{ configuredCount }}</strong>
            <span>{{ ui.label('已经填写了字段或本机变量', 'Fields or local values already exist') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('飞书插件', 'Feishu plugin') }}</p>
            <strong>{{ resource.data.feishuPlugin.installed ? ui.label('已识别', 'Detected') : ui.label('未识别', 'Not detected') }}</strong>
            <span>{{ resource.data.feishuPlugin.version || ui.label('官方渠道仍可直接维护', 'Official channel still remains manageable') }}</span>
          </article>
        </div>
      </PageCard>

      <div class="page-two-column">
        <PageCard :title="ui.label('渠道目录', 'Channel catalog')" eyebrow="Catalog">
          <div class="catalog-list">
            <button
              v-for="definition in resource.data.definitions"
              :key="definition.id"
              class="catalog-list__item"
              :class="{ 'catalog-list__item--active': selectedId === definition.id }"
              type="button"
              @click="selectedId = definition.id"
            >
              <div class="catalog-list__title">
                <strong>{{ `${definition.icon} ${definition.name}` }}</strong>
              </div>
              <div class="pill-row">
                <span class="pill" :class="channelMap.get(definition.id)?.enabled ? 'pill--success' : 'pill--warning'">
                  {{ channelMap.get(definition.id)?.enabled ? ui.label('已启用', 'Enabled') : ui.label('停用', 'Disabled') }}
                </span>
                <span class="pill" :class="channelMap.get(definition.id)?.configured ? 'pill--success' : 'pill--muted'">
                  {{ channelMap.get(definition.id)?.configured ? ui.label('已配置', 'Configured') : ui.label('未配置', 'Empty') }}
                </span>
              </div>
            </button>
          </div>
        </PageCard>

        <div class="page-stack">
          <PageCard :title="selectedChannel.name" eyebrow="Editor">
            <div class="page-inline-status">
              <span class="pill" :class="selectedChannel.enabled ? 'pill--success' : 'pill--warning'">
                {{ selectedChannel.enabled ? ui.label('正在接收消息', 'Receiving traffic') : ui.label('当前停用', 'Currently disabled') }}
              </span>
              <span class="pill" :class="selectedChannel.configured ? 'pill--success' : 'pill--muted'">
                {{ selectedChannel.configured ? ui.label('配置已完成', 'Configured') : ui.label('还未配置', 'Not configured') }}
              </span>
            </div>
            <p class="muted-copy">{{ statusMessage() }}</p>

            <div class="settings-grid">
              <template v-for="field in fieldDescriptors" :key="field.key">
                <label class="settings-field">
                  <span>{{ field.label }}</span>
                  <small v-if="field.help">{{ field.help }}</small>

                  <input
                    v-if="field.kind === 'text' && field.inputType !== 'select'"
                    v-model="textDraft[field.key]"
                    class="settings-input"
                    :type="field.inputType || 'text'"
                  />

                  <select
                    v-else-if="field.kind === 'text' && field.inputType === 'select'"
                    v-model="textDraft[field.key]"
                    class="settings-input"
                  >
                    <option v-for="option in field.options" :key="option.value" :value="option.value">
                      {{ option.label }}
                    </option>
                  </select>

                  <label v-else class="checkbox-row">
                    <input v-model="boolDraft[field.key]" type="checkbox" />
                    <span>{{ field.help || ui.label('勾选即启用。', 'Checked means enabled.') }}</span>
                  </label>
                </label>
              </template>
            </div>

            <div class="page-actions">
              <button class="inline-link inline-link--primary" type="button" :disabled="saving" @click="handleSave">
                {{ saving ? ui.label('保存中…', 'Saving…') : ui.label('保存渠道配置', 'Save channel configuration') }}
              </button>
              <button class="inline-link" type="button" @click="hydrateDraft">
                {{ ui.label('恢复当前值', 'Reset draft') }}
              </button>
              <button class="inline-link inline-link--danger" type="button" :disabled="clearing" @click="handleClear">
                {{ clearing ? ui.label('清空中…', 'Clearing…') : ui.label('清空配置', 'Clear configuration') }}
              </button>
            </div>
          </PageCard>

          <PageCard :title="ui.label('配置摘要', 'Configuration summary')" eyebrow="Summary">
            <div class="list-stack">
              <article class="action-row">
                <div>
                  <h3>{{ ui.label('普通字段', 'Regular fields') }}</h3>
                  <p>{{ ui.label('优先看这里就能知道这个渠道是否已经具备基本接入条件。', 'Start here to see whether the channel has the basic information required to connect.') }}</p>
                </div>
                <strong>{{ selectedDefinition?.fields.length || 0 }}</strong>
              </article>
              <article class="action-row">
                <div>
                  <h3>{{ ui.label('本机变量', 'Local secrets') }}</h3>
                  <p>{{ ui.label('敏感值优先以本机变量方式保存，便于后续替换或清空。', 'Sensitive values are best stored as local variables so they can be rotated or cleared later.') }}</p>
                </div>
                <strong>{{ selectedDefinition?.envFields.length || 0 }}</strong>
              </article>
              <article class="action-row">
                <div>
                  <h3>{{ ui.label('当前草稿', 'Current draft') }}</h3>
                  <p>{{ ui.label('这里只显示你现在编辑中的内容，不会自动写入运行态。', 'This only shows the values you are editing now. Nothing reaches runtime until you save.') }}</p>
                </div>
                <strong>{{ selectedChannel.id }}</strong>
              </article>
            </div>

            <pre class="code-panel">{{ JSON.stringify({
              enabled: boolDraft.enabled,
              fields: Object.fromEntries(Object.keys(textDraft).filter((key) => !key.startsWith('env:')).map((key) => [key, isSensitiveField(key) && getTextValue(key) ? '******' : getTextValue(key)])),
              envFields: Object.fromEntries(Object.keys(textDraft).filter((key) => key.startsWith('env:')).map((key) => [key, getTextValue(key) ? '******' : ''])),
            }, null, 2) }}</pre>
          </PageCard>
        </div>
      </div>
    </template>
  </div>
</template>

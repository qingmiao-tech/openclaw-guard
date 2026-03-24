<script setup lang="ts">
import { computed } from 'vue';
import PageCard from '@/features/common/PageCard.vue';
import {
  schedulePlaceholder,
  type CronDraft,
  type CronEditorMode,
} from '@/features/cron/cron-helpers';
import { useUiStore } from '@/stores/ui';

const props = defineProps<{
  draft: CronDraft;
  editorMode: CronEditorMode;
  editingJobId: string;
  runningAction: string;
}>();

defineEmits<{
  (event: 'submit'): void;
  (event: 'reset'): void;
}>();

const ui = useUiStore();
const saving = computed(
  () => props.runningAction === 'create' || props.runningAction === 'update',
);
const placeholder = computed(() => schedulePlaceholder(props.draft.scheduleMode));
</script>

<template>
  <PageCard
    :title="
      editorMode === 'edit'
        ? ui.label(`编辑任务 ${editingJobId}`, `Edit ${editingJobId}`)
        : ui.label('新建 Cron 任务', 'Create cron job')
    "
    eyebrow="Editor"
  >
    <div class="provider-card__header">
      <p class="muted-copy">
        {{
          ui.label(
            '这里直接复用现有的 cron-ui 接口，所以保存后的任务会立刻回到同一套运行态里，不会产生第二套自动化系统。',
            'This editor talks to the existing cron-ui API directly, so saved jobs go back into the same runtime immediately instead of creating a second automation system.',
          )
        }}
      </p>
      <span
        data-testid="cron-editor-mode"
        class="pill"
        :class="editorMode === 'edit' ? 'pill--warning' : 'pill--success'"
      >
        {{ editorMode === 'edit' ? ui.label('编辑模式', 'Edit mode') : ui.label('创建模式', 'Create mode') }}
      </span>
    </div>

    <form class="page-form-stack" @submit.prevent="$emit('submit')">
      <div class="settings-grid settings-grid--wide">
        <label class="settings-field">
          <span>{{ ui.label('任务名称', 'Job name') }}</span>
          <input
            v-model="draft.name"
            data-testid="cron-editor-name"
            class="settings-input"
            type="text"
            :placeholder="ui.label('例如：每日汇总', 'Example: Daily brief')"
          />
        </label>

        <label class="settings-field">
          <span>{{ ui.label('Agent ID', 'Agent ID') }}</span>
          <input
            v-model="draft.agentId"
            class="settings-input"
            type="text"
            :placeholder="ui.label('例如：task-hub', 'Example: task-hub')"
          />
        </label>

        <label class="settings-field">
          <span>{{ ui.label('调度类型', 'Schedule mode') }}</span>
          <select v-model="draft.scheduleMode" class="settings-input">
            <option value="cron">cron</option>
            <option value="every">every</option>
            <option value="at">at</option>
          </select>
        </label>

        <label class="settings-field">
          <span>{{ ui.label('调度值', 'Schedule value') }}</span>
          <input
            v-model="draft.scheduleValue"
            class="settings-input"
            type="text"
            :placeholder="placeholder"
          />
          <small>
            {{
              ui.label(
                'cron 用 5 段表达式；every 例如 10m / 1h；at 支持 ISO 时间或 +20m。',
                'Use a 5-field cron expression, 10m / 1h for every, or ISO time / +20m for at.',
              )
            }}
          </small>
        </label>

        <label class="settings-field">
          <span>{{ ui.label('时区', 'Timezone') }}</span>
          <input v-model="draft.timezone" class="settings-input" type="text" placeholder="Asia/Shanghai" />
        </label>

        <label class="settings-field">
          <span>{{ ui.label('会话模式', 'Session mode') }}</span>
          <select v-model="draft.session" class="settings-input">
            <option value="main">main</option>
            <option value="isolated">isolated</option>
          </select>
        </label>

        <label class="settings-field">
          <span>{{ ui.label('模型覆盖', 'Model override') }}</span>
          <input
            v-model="draft.model"
            class="settings-input"
            type="text"
            :placeholder="ui.label('留空则使用 Agent 默认模型', 'Leave blank to use the agent default')"
          />
        </label>

        <label class="settings-field">
          <span>{{ ui.label('Thinking 等级', 'Thinking level') }}</span>
          <select v-model="draft.thinking" class="settings-input">
            <option value="">{{ ui.label('跟随默认', 'Use default') }}</option>
            <option value="off">off</option>
            <option value="minimal">minimal</option>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
        </label>

        <label class="settings-field">
          <span>{{ ui.label('唤醒时机', 'Wake mode') }}</span>
          <select v-model="draft.wake" class="settings-input">
            <option value="now">now</option>
            <option value="next-heartbeat">next-heartbeat</option>
          </select>
        </label>

        <label class="settings-field">
          <span>{{ ui.label('超时（秒）', 'Timeout (seconds)') }}</span>
          <input v-model="draft.timeoutSeconds" class="settings-input" type="number" min="1" placeholder="30" />
        </label>

        <label class="settings-field">
          <span>{{ ui.label('错峰', 'Stagger') }}</span>
          <input
            v-model="draft.stagger"
            class="settings-input"
            type="text"
            :placeholder="ui.label('例如：5m，填 0 表示精确执行', 'Example: 5m, use 0 for exact timing')"
          />
        </label>

        <label class="settings-field settings-field--full">
          <span>{{ ui.label('任务消息', 'Prompt') }}</span>
          <textarea
            v-model="draft.prompt"
            class="settings-textarea"
            :placeholder="ui.label('例如：汇总今天的新线索并输出为 Markdown。', 'Example: Summarize today’s new leads in Markdown.')"
          />
        </label>

        <label class="settings-field settings-field--full">
          <span>{{ ui.label('描述', 'Description') }}</span>
          <textarea
            v-model="draft.description"
            class="settings-textarea"
            :placeholder="ui.label('可选，用来解释这个任务的用途。', 'Optional note explaining what this job is for.')"
          />
        </label>
      </div>

      <div class="checkbox-grid">
        <label class="checkbox-card">
          <input v-model="draft.enabled" type="checkbox" />
          <div class="checkbox-card__body">
            <strong>{{ ui.label('保存后立即启用', 'Enable after save') }}</strong>
            <p>{{ ui.label('关闭时任务会保留，但不会按计划自动执行。', 'When disabled, the job stays available but will not run automatically.') }}</p>
          </div>
        </label>

        <label class="checkbox-card">
          <input v-model="draft.announce" type="checkbox" />
          <div class="checkbox-card__body">
            <strong>{{ ui.label('投递结果', 'Deliver output') }}</strong>
            <p>{{ ui.label('执行完成后尝试把结果投递回会话或目标渠道。', 'Try to deliver the result back to the session or target channel after execution.') }}</p>
          </div>
        </label>

        <label class="checkbox-card">
          <input v-model="draft.bestEffortDeliver" type="checkbox" />
          <div class="checkbox-card__body">
            <strong>{{ ui.label('尽力投递', 'Best effort deliver') }}</strong>
            <p>{{ ui.label('当目标暂时不可用时，尽量保留或稍后交付结果。', 'Keep or retry delivery when the target is temporarily unavailable.') }}</p>
          </div>
        </label>

        <label class="checkbox-card">
          <input v-model="draft.deleteAfterRun" type="checkbox" />
          <div class="checkbox-card__body">
            <strong>{{ ui.label('运行后删除', 'Delete after run') }}</strong>
            <p>{{ ui.label('适合一次性任务；普通巡检或日报不建议开启。', 'Useful for one-off jobs. Leave it off for recurring inspections or briefs.') }}</p>
          </div>
        </label>
      </div>
    </form>

    <div class="page-actions">
      <button
        class="inline-link inline-link--primary"
        type="button"
        :disabled="saving"
        @click="$emit('submit')"
      >
        {{
          saving
            ? ui.label('保存中…', 'Saving…')
            : editorMode === 'edit'
              ? ui.label('保存修改', 'Save changes')
              : ui.label('创建任务', 'Create job')
        }}
      </button>
      <button
        data-testid="cron-editor-reset"
        class="inline-link"
        type="button"
        @click="$emit('reset')"
      >
        {{
          editorMode === 'edit'
            ? ui.label('切回创建模式', 'Switch to create mode')
            : ui.label('重置表单', 'Reset form')
        }}
      </button>
    </div>
  </PageCard>
</template>

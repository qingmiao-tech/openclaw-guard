export function formatDateTime(value?: string | null) {
  if (!value) return '-';
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) return value;
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));
}

export function shortSha(value?: string | null) {
  if (!value) return '-';
  return value.slice(0, 7);
}

export function humanizeFieldName(fieldName: string) {
  const namedLabels: Record<string, string> = {
    appId: 'App ID',
    appSecret: 'App Secret',
    encryptKey: 'Encrypt Key',
    verificationToken: 'Verification Token',
    domain: 'Domain',
    connectionMode: 'Connection Mode',
    webhookPath: 'Webhook Path',
    webhookHost: 'Webhook Host',
    webhookPort: 'Webhook Port',
    dmPolicy: 'DM Policy',
    groupPolicy: 'Group Policy',
    requireMention: 'Require Mention',
    streaming: 'Streaming Reply',
    renderMode: 'Render Mode',
    whisperModel: 'Whisper Model',
    botToken: 'Bot Token',
    appToken: 'App Token',
    baseUrl: 'Base URL',
    apiType: 'API Type',
    apiKey: 'API Key',
    modelId: 'Model ID',
  };

  if (namedLabels[fieldName]) return namedLabels[fieldName];
  return fieldName
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function parseBooleanLike(value: unknown) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    return ['true', '1', 'yes', 'on'].includes(value.trim().toLowerCase());
  }
  return false;
}

export function parseOptionalNumber(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function isSensitiveField(fieldName: string) {
  return /token|secret|key|password/i.test(fieldName);
}

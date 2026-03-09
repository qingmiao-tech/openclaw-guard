import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runFullAudit } from './audit.js';
import { applyProfile, PROFILES } from './profiles.js';
import { generateHardenScript, getAllHardenSteps } from './harden.js';
import { detectPlatform, getCurrentUser, getHomeDir, getOpenClawDir } from './platform.js';
import { detectOpenClaw, installOrUpdateSync } from './openclaw.js';
import { getCompatibilityPage, getHtmlPage } from './web-ui.js';
import { getWorkbenchPage } from './workbench-ui.js';
import {
  loadConfig,
  saveConfig,
  getNested,
  readAllEnv,
  writeEnvValue,
  getOrCreateGatewayToken,
  getDashboardUrl,
} from './config.js';
import {
  getChannels,
  getChannelDefinitions,
  getChannel,
  saveChannel,
  clearChannel,
  getFeishuConfig,
  saveFeishuConfig,
  checkFeishuPlugin,
} from './channels.js';
import {
  getAIConfig,
  saveProvider,
  deleteProvider,
  setPrimaryModel,
  setFallbackModels,
  PROVIDERS as AI_PROVIDERS,
} from './models.js';
import { getServiceStatus, startService, stopService, restartService, getLogs } from './service-mgr.js';
import {
  captureSessionOverview,
  getDashboardOverview,
  getRecentActivity,
} from './dashboard.js';
import {
  getAgentCatalog,
  getManagedRoots,
  listManagedFiles,
  readManagedFile,
  writeManagedFile,
  createManagedEntry,
  listMemoryFiles,
  searchManagedFiles,
} from './workspace-files.js';
import { getCronOverview, enableCronJob, disableCronJob, runCronJob, removeCronJob, createCronJob, updateCronJob, type CronJobInput } from './cron-ui.js';
import {
  getGitSyncStatus,
  initGitSync,
  connectGitRemote,
  saveGitTokenAuth,
  checkGitRemotePrivate,
  previewGitIgnoreRules,
  applyGitIgnoreRules,
  commitGitSync,
  pushGitSync,
  syncGitSync,
  startOAuthLogin,
} from './git-sync.js';
import { listNotifications, markNotificationRead, markAllNotifications, clearNotifications, clearReadNotifications, getNotificationSummary } from './notifications.js';
import { getWebBackgroundStatus, stopWebBackgroundService, registerBackgroundProcess, startWebBackgroundService } from './web-background.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const WEB_DIR = path.resolve(__dirname, '..', 'web');

function resolveStaticAsset(...segments: string[]) {
  const candidates = [
    path.resolve(__dirname, '..', 'src', ...segments),
    path.resolve(__dirname, ...segments),
    path.resolve(process.cwd(), 'src', ...segments),
    path.resolve(process.cwd(), ...segments),
    path.resolve(WEB_DIR, ...segments.slice(1)),
  ];
  return candidates.find((candidate) => fs.existsSync(candidate)) ?? candidates[0];
}

const STATIC_UI_ASSETS: Record<string, { file: string; contentType: string }> = {
  '/ui/guard-ui.css': {
    file: path.join(WEB_DIR, 'guard-ui.css'),
    contentType: 'text/css; charset=utf-8',
  },
  '/ui/guard-ui.js': {
    file: path.join(WEB_DIR, 'guard-ui.js'),
    contentType: 'application/javascript; charset=utf-8',
  },
  '/ui/logo.png': {
    file: resolveStaticAsset('assets', 'logo.png'),
    contentType: 'image/png',
  },
};

function jsonResponse(res: http.ServerResponse, data: unknown, status = 200) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.end(JSON.stringify(data));
}

function htmlResponse(res: http.ServerResponse, html: string) {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}

function textResponse(res: http.ServerResponse, text: string, status = 200, headers: Record<string, string> = {}) {
  res.writeHead(status, {
    'Content-Type': 'text/plain; charset=utf-8',
    ...headers,
  });
  res.end(text);
}

function staticResponse(res: http.ServerResponse, filePath: string, contentType: string) {
  if (!fs.existsSync(filePath)) {
    jsonResponse(res, { error: 'Static asset not found' }, 404);
    return;
  }
  res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'no-cache' });
  res.end(fs.readFileSync(filePath));
}

async function readJsonBody(req: http.IncomingMessage): Promise<Record<string, unknown>> {
  const chunks: string[] = [];
  for await (const chunk of req) {
    chunks.push(String(chunk));
  }
  const body = chunks.join('').trim();
  return body ? JSON.parse(body) as Record<string, unknown> : {};
}

function getHeaderValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0]?.trim();
  return value?.trim();
}

function parseOptionalNumber(value: unknown): number | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function parseCronJobInput(body: Record<string, unknown>, jobId?: string): CronJobInput {
  return {
    jobId,
    name: typeof body.name === 'string' ? body.name : undefined,
    description: typeof body.description === 'string' ? body.description : undefined,
    agentId: typeof body.agentId === 'string' ? body.agentId : undefined,
    prompt: typeof body.prompt === 'string' ? body.prompt : undefined,
    scheduleMode: body.scheduleMode === 'every' || body.scheduleMode === 'at' ? body.scheduleMode : 'cron',
    scheduleValue: typeof body.scheduleValue === 'string' ? body.scheduleValue : '',
    enabled: typeof body.enabled === 'boolean' ? body.enabled : undefined,
    timezone: typeof body.timezone === 'string' ? body.timezone : undefined,
    model: typeof body.model === 'string' ? body.model : undefined,
    thinking: body.thinking === 'off' || body.thinking === 'minimal' || body.thinking === 'low' || body.thinking === 'medium' || body.thinking === 'high'
      ? body.thinking
      : undefined,
    session: body.session === 'main' || body.session === 'isolated' ? body.session : undefined,
    wake: body.wake === 'now' || body.wake === 'next-heartbeat' ? body.wake : undefined,
    timeoutMs: parseOptionalNumber(body.timeoutMs),
    timeoutSeconds: parseOptionalNumber(body.timeoutSeconds),
    stagger: typeof body.stagger === 'string' ? body.stagger : undefined,
    announce: typeof body.announce === 'boolean' ? body.announce : undefined,
    bestEffortDeliver: typeof body.bestEffortDeliver === 'boolean' ? body.bestEffortDeliver : undefined,
    deleteAfterRun: typeof body.deleteAfterRun === 'boolean' ? body.deleteAfterRun : undefined,
  };
}

export function startServer(port: number) {
  const maxRetries = 10;

  process.on('uncaughtException', (err) => {
    console.error('[Guard] Uncaught exception:', err.stack || err.message);
  });

  process.on('unhandledRejection', (reason) => {
    console.error('[Guard] Unhandled Promise rejection:', reason);
  });

  let currentPort = port;


  function createHttpServer() {
    return http.createServer(async (req, res) => {
      try {
        const url = new URL(req.url || '/', `http://localhost:${currentPort}`);
        const pathname = url.pathname;

        if (req.method === 'OPTIONS') {
          res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          });
          res.end();
          return;
        }

        if (pathname === '/favicon.ico') {
          res.writeHead(204);
          res.end();
          return;
        }

        if (pathname in STATIC_UI_ASSETS) {
          const asset = STATIC_UI_ASSETS[pathname];
          staticResponse(res, asset.file, asset.contentType);
          return;
        }

        if (pathname === '/' || pathname === '/index.html' || pathname === '/workbench') {
          htmlResponse(res, getWorkbenchPage());
          return;
        }
        if (pathname === '/compat') {
          htmlResponse(res, getCompatibilityPage());
          return;
        }
        if (pathname === '/legacy') {
          htmlResponse(res, getHtmlPage());
          return;
        }

        if (pathname === '/api/info') {
          jsonResponse(res, {
            platform: detectPlatform(),
            user: getCurrentUser(),
            home: getHomeDir(),
            openclawDir: getOpenClawDir(),
            pid: process.pid,
            nodeVersion: process.version,
            arch: process.arch,
            openclaw: detectOpenClaw(),
          });
          return;
        }

        if (pathname === '/api/openclaw/status') {
          jsonResponse(res, detectOpenClaw());
          return;
        }
        if (pathname === '/api/openclaw/install' && req.method === 'POST') {
          jsonResponse(res, installOrUpdateSync('install'));
          return;
        }
        if (pathname === '/api/openclaw/update' && req.method === 'POST') {
          jsonResponse(res, installOrUpdateSync('update'));
          return;
        }

        if (pathname === '/api/audit') {
          const results = runFullAudit();
          const pass = results.filter((item) => item.status === 'pass').length;
          const warn = results.filter((item) => item.status === 'warn').length;
          const fail = results.filter((item) => item.status === 'fail').length;
          jsonResponse(res, { results, summary: { pass, warn, fail } });
          return;
        }

        if (pathname === '/api/profiles' && req.method === 'GET') {
          const profiles = Object.entries(PROFILES).map(([key, profile]) => ({ key, ...profile }));
          jsonResponse(res, profiles);
          return;
        }
        if (pathname === '/api/profiles/apply' && req.method === 'POST') {
          const body = await readJsonBody(req);
          const profileName = typeof body.profile === 'string' ? body.profile : '';
          const configPath = typeof body.configPath === 'string' ? body.configPath : undefined;
          jsonResponse(res, applyProfile(profileName, configPath));
          return;
        }

        if (pathname === '/api/harden/steps') {
          const platform = url.searchParams.get('platform') || detectPlatform();
          const steps = getAllHardenSteps().map((item) => ({
            ...item,
            commands: item.commands[platform as 'windows' | 'macos' | 'linux'] || item.commands[detectPlatform()],
          }));
          jsonResponse(res, { platform, steps });
          return;
        }
        if (pathname === '/api/harden/script') {
          const platform = url.searchParams.get('platform') || detectPlatform();
          const script = generateHardenScript(platform as 'windows' | 'macos' | 'linux');
          textResponse(res, script, 200, {
            'Content-Disposition': `attachment; filename="openclaw-guard-harden.${platform === 'windows' ? 'bat' : 'sh'}"`,
          });
          return;
        }

        if (pathname === '/api/service/status') {
          jsonResponse(res, getServiceStatus());
          return;
        }
        if (pathname === '/api/service/start' && req.method === 'POST') {
          jsonResponse(res, startService());
          return;
        }
        if (pathname === '/api/service/stop' && req.method === 'POST') {
          jsonResponse(res, stopService());
          return;
        }
        if (pathname === '/api/service/restart' && req.method === 'POST') {
          jsonResponse(res, restartService());
          return;
        }
        if (pathname === '/api/service/logs') {
          const lines = Number(url.searchParams.get('lines') || '100');
          jsonResponse(res, { logs: getLogs(lines) });
          return;
        }
        if (pathname === '/api/web-background/status') {
          jsonResponse(res, getWebBackgroundStatus(currentPort));
          return;
        }
        if (pathname === '/api/web-background/start' && req.method === 'POST') {
          const result = await startWebBackgroundService({
            port: currentPort,
            currentPid: process.pid,
          });
          jsonResponse(res, result, result.success ? 200 : 400);
          return;
        }
        if (pathname === '/api/web-background/stop' && req.method === 'POST') {
          const result = stopWebBackgroundService({
            port: currentPort,
            currentPid: process.pid,
          });
          jsonResponse(res, result, result.success ? 200 : 400);
          if (result.success && result.selfExit) {
            setTimeout(() => process.exit(0), 150);
          }
          return;
        }

        if (pathname === '/api/channels' && req.method === 'GET') {
          jsonResponse(res, getChannels());
          return;
        }
        if (pathname === '/api/channels/meta' && req.method === 'GET') {
          jsonResponse(res, getChannelDefinitions());
          return;
        }
        if (pathname.startsWith('/api/channels/') && req.method === 'GET') {
          const channelId = pathname.split('/')[3];
          const channel = getChannel(channelId);
          jsonResponse(res, channel || { error: 'Not Found' }, channel ? 200 : 404);
          return;
        }
        if (pathname.startsWith('/api/channels/') && req.method === 'POST') {
          const channelId = pathname.split('/')[3];
          jsonResponse(res, saveChannel(channelId, await readJsonBody(req)));
          return;
        }
        if (pathname.startsWith('/api/channels/') && req.method === 'DELETE') {
          const channelId = pathname.split('/')[3];
          jsonResponse(res, clearChannel(channelId));
          return;
        }

        if (pathname === '/api/feishu/config' && req.method === 'GET') {
          jsonResponse(res, getFeishuConfig());
          return;
        }
        if (pathname === '/api/feishu/config' && req.method === 'POST') {
          jsonResponse(res, saveFeishuConfig(await readJsonBody(req)));
          return;
        }
        if (pathname === '/api/feishu/plugin') {
          jsonResponse(res, checkFeishuPlugin());
          return;
        }

        if (pathname === '/api/ai/config' && req.method === 'GET') {
          jsonResponse(res, getAIConfig());
          return;
        }
        if (pathname === '/api/ai/providers' && req.method === 'GET') {
          const config = loadConfig();
          const customProviders = getNested(config, ['models', 'providers']) || {};
          jsonResponse(res, {
            presets: AI_PROVIDERS,
            custom: Object.entries(customProviders as Record<string, unknown>).map(([name, value]) => ({ name, ...(value as Record<string, unknown>) })),
          });
          return;
        }
        if (pathname === '/api/ai/provider' && req.method === 'POST') {
          const body = await readJsonBody(req);
          jsonResponse(res, saveProvider({
            name: typeof body.name === 'string' ? body.name : '',
            baseUrl: typeof body.baseUrl === 'string' ? body.baseUrl : '',
            apiKey: typeof body.apiKey === 'string' ? body.apiKey : undefined,
            apiType: typeof body.apiType === 'string' ? body.apiType : undefined,
            models: Array.isArray(body.models) ? body.models as Array<{ id: string; name: string; api?: string; contextWindow?: number; maxTokens?: number }> : [],
          }));
          return;
        }
        if (pathname.startsWith('/api/ai/provider/') && req.method === 'DELETE') {
          const name = pathname.split('/')[4];
          jsonResponse(res, deleteProvider(name));
          return;
        }
        if (pathname === '/api/ai/primary' && req.method === 'POST') {
          const body = await readJsonBody(req);
          jsonResponse(res, setPrimaryModel(typeof body.modelId === 'string' ? body.modelId : ''));
          return;
        }
        if (pathname === '/api/ai/fallbacks' && req.method === 'POST') {
          const body = await readJsonBody(req);
          const modelIds = Array.isArray(body.modelIds)
            ? body.modelIds.map((item) => String(item))
            : Array.isArray(body.models)
              ? body.models.map((item) => String(item))
              : typeof body.modelIds === 'string'
                ? body.modelIds.split(',').map((item) => item.trim()).filter(Boolean)
                : [];
          jsonResponse(res, setFallbackModels(modelIds));
          return;
        }

        if (pathname === '/api/env' && req.method === 'GET') {
          jsonResponse(res, readAllEnv());
          return;
        }
        if (pathname === '/api/env' && req.method === 'POST') {
          const body = await readJsonBody(req);
          if (typeof body.key !== 'string' || typeof body.value !== 'string') {
            jsonResponse(res, { success: false, message: 'Invalid request payload' }, 400);
            return;
          }
          writeEnvValue(body.key, body.value);
          jsonResponse(res, { success: true, message: `${body.key} saved.` });
          return;
        }

        if (pathname === '/api/gateway/token') {
          jsonResponse(res, { token: getOrCreateGatewayToken() });
          return;
        }
        if (pathname === '/api/gateway/dashboard') {
          jsonResponse(res, { url: getDashboardUrl() });
          return;
        }

        if (pathname === '/api/config' && req.method === 'GET') {
          jsonResponse(res, loadConfig());
          return;
        }
        if (pathname === '/api/config' && req.method === 'POST') {
          const result = saveConfig(await readJsonBody(req));
          jsonResponse(res, result.success ? { success: true, message: 'Configuration saved.' } : result, result.success ? 200 : 500);
          return;
        }

        if (pathname === '/api/dashboard/overview' && req.method === 'GET') {
          jsonResponse(res, getDashboardOverview());
          return;
        }
        if (pathname === '/api/agents' && req.method === 'GET') {
          jsonResponse(res, { agents: getAgentCatalog() });
          return;
        }
        if (pathname === '/api/sessions' && req.method === 'GET') {
          jsonResponse(res, captureSessionOverview());
          return;
        }
        if (pathname === '/api/activity' && req.method === 'GET') {
          const limit = Number(url.searchParams.get('limit') || '50');
          jsonResponse(res, { events: getRecentActivity(limit) });
          return;
        }
        if (pathname === '/api/files' && req.method === 'GET') {
          const roots = getManagedRoots();
          const currentPath = url.searchParams.get('path') || roots[0]?.path || '';
          const matchedRoot = roots
            .filter((root) => currentPath === root.path || currentPath.startsWith(`${root.path}${path.sep}`))
            .sort((a, b) => b.path.length - a.path.length)[0];
          const parentPath = matchedRoot && currentPath !== matchedRoot.path
            ? path.dirname(currentPath)
            : null;
          jsonResponse(res, {
            roots,
            currentPath,
            parentPath,
            entries: listManagedFiles(currentPath),
          });
          return;
        }
        if (pathname === '/api/files/content' && req.method === 'GET') {
          const targetPath = url.searchParams.get('path') || '';
          jsonResponse(res, readManagedFile(targetPath));
          return;
        }
        if (pathname === '/api/files/content' && req.method === 'POST') {
          const body = await readJsonBody(req);
          if (typeof body.path !== 'string' || typeof body.content !== 'string') {
            jsonResponse(res, { success: false, message: 'Invalid request payload' }, 400);
            return;
          }
          jsonResponse(res, writeManagedFile(body.path, body.content));
          return;
        }
        if (pathname === '/api/files/create' && req.method === 'POST') {
          const body = await readJsonBody(req);
          if (typeof body.parentPath !== 'string' || typeof body.name !== 'string') {
            jsonResponse(res, { success: false, message: 'parentPath / name is required' }, 400);
            return;
          }
          jsonResponse(res, createManagedEntry(
            body.parentPath,
            body.name,
            body.kind === 'directory' ? 'directory' : 'file',
          ));
          return;
        }
        if (pathname === '/api/memory' && req.method === 'GET') {
          jsonResponse(res, { files: listMemoryFiles() });
          return;
        }
        if (pathname === '/api/search' && req.method === 'GET') {
          const query = url.searchParams.get('q') || '';
          const limit = Number(url.searchParams.get('limit') || '100');
          jsonResponse(res, { results: searchManagedFiles(query, limit) });
          return;
        }
        if (pathname === '/api/costs' && req.method === 'GET') {
          jsonResponse(res, captureSessionOverview().costSummary);
          return;
        }
        if (pathname === '/api/cron-ui' && req.method === 'GET') {
          jsonResponse(res, getCronOverview());
          return;
        }
        if (pathname === '/api/cron-ui/create' && req.method === 'POST') {
          const body = await readJsonBody(req);
          jsonResponse(res, createCronJob(parseCronJobInput(body)));
          return;
        }
        if (pathname === '/api/cron-ui/update' && req.method === 'POST') {
          const body = await readJsonBody(req);
          if (typeof body.jobId !== 'string' || !body.jobId.trim()) {
            jsonResponse(res, { success: false, message: 'jobId is required' }, 400);
            return;
          }
          jsonResponse(res, updateCronJob(parseCronJobInput(body, body.jobId)));
          return;
        }
        if (pathname === '/api/cron-ui/enable' && req.method === 'POST') {
          const body = await readJsonBody(req);
          jsonResponse(res, enableCronJob(typeof body.jobId === 'string' ? body.jobId : ''));
          return;
        }
        if (pathname === '/api/cron-ui/disable' && req.method === 'POST') {
          const body = await readJsonBody(req);
          jsonResponse(res, disableCronJob(typeof body.jobId === 'string' ? body.jobId : ''));
          return;
        }
        if (pathname === '/api/cron-ui/run' && req.method === 'POST') {
          const body = await readJsonBody(req);
          jsonResponse(res, runCronJob(typeof body.jobId === 'string' ? body.jobId : ''));
          return;
        }
        if (pathname === '/api/cron-ui/remove' && req.method === 'POST') {
          const body = await readJsonBody(req);
          jsonResponse(res, removeCronJob(typeof body.jobId === 'string' ? body.jobId : ''));
          return;
        }

        if (pathname === '/api/git-sync/status' && req.method === 'GET') {
          jsonResponse(res, getGitSyncStatus());
          return;
        }
        if (pathname === '/api/git-sync/init' && req.method === 'POST') {
          jsonResponse(res, initGitSync());
          return;
        }
        if (pathname === '/api/git-sync/connect' && req.method === 'POST') {
          const body = await readJsonBody(req);
          jsonResponse(res, connectGitRemote({
            provider: body.provider === 'github' || body.provider === 'gitee' ? body.provider : undefined,
            remoteUrl: typeof body.remoteUrl === 'string' ? body.remoteUrl : '',
            remoteName: typeof body.remoteName === 'string' ? body.remoteName : undefined,
          }));
          return;
        }
        if (pathname === '/api/git-sync/auth/token' && req.method === 'POST') {
          const body = await readJsonBody(req);
          jsonResponse(res, saveGitTokenAuth({
            provider: body.provider === 'github' || body.provider === 'gitee' ? body.provider : undefined,
            token: typeof body.token === 'string' ? body.token : '',
            username: typeof body.username === 'string' ? body.username : undefined,
          }));
          return;
        }
        if (pathname === '/api/git-sync/auth/oauth' && req.method === 'POST') {
          const body = await readJsonBody(req);
          if ((body.provider !== 'github' && body.provider !== 'gitee') || typeof body.clientId !== 'string' || typeof body.clientSecret !== 'string') {
            jsonResponse(res, { success: false, message: 'provider / clientId / clientSecret are required' }, 400);
            return;
          }
          jsonResponse(res, await startOAuthLogin({
            provider: body.provider,
            clientId: body.clientId,
            clientSecret: body.clientSecret,
            scope: typeof body.scope === 'string' ? body.scope : undefined,
            redirectPort: typeof body.redirectPort === 'number' ? body.redirectPort : undefined,
            openBrowser: body.openBrowser !== false,
          }));
          return;
        }
        if (pathname === '/api/git-sync/check-private' && req.method === 'POST') {
          jsonResponse(res, await checkGitRemotePrivate());
          return;
        }
        if (pathname === '/api/git-sync/gitignore-preview' && req.method === 'GET') {
          jsonResponse(res, previewGitIgnoreRules(undefined, url.searchParams.get('mode') === 'exact' ? 'exact' : 'smart'));
          return;
        }
        if (pathname === '/api/git-sync/gitignore-apply' && req.method === 'POST') {
          const body = await readJsonBody(req);
          jsonResponse(res, applyGitIgnoreRules(body.mode === 'exact' ? 'exact' : 'smart'));
          return;
        }
        if (pathname === '/api/git-sync/commit' && req.method === 'POST') {
          const body = await readJsonBody(req);
          jsonResponse(res, commitGitSync(typeof body.message === 'string' ? body.message : undefined));
          return;
        }
        if (pathname === '/api/git-sync/push' && req.method === 'POST') {
          jsonResponse(res, pushGitSync());
          return;
        }
        if (pathname === '/api/git-sync/sync' && req.method === 'POST') {
          const body = await readJsonBody(req);
          jsonResponse(res, syncGitSync(typeof body.message === 'string' ? body.message : undefined));
          return;
        }

        if (pathname === '/api/notifications' && req.method === 'GET') {
          const limit = Number(url.searchParams.get('limit') || '100');
          jsonResponse(res, getNotificationSummary(limit));
          return;
        }
        if (pathname === '/api/notifications/read' && req.method === 'POST') {
          const body = await readJsonBody(req);
          jsonResponse(res, { success: markNotificationRead(typeof body.id === 'string' ? body.id : '', body.read !== false), summary: getNotificationSummary(200) });
          return;
        }

        if (pathname === '/api/notifications/bulk' && req.method === 'POST') {
          const body = await readJsonBody(req);
          const action = typeof body.action === 'string' ? body.action : '';
          let changed = 0;
          let success = true;
          let message = 'No notification action was applied.';
          if (action === 'read-all') {
            changed = markAllNotifications(true);
            message = `Marked ${changed} notifications as read.`;
          } else if (action === 'unread-all') {
            changed = markAllNotifications(false);
            message = `Marked ${changed} notifications as unread.`;
          } else if (action === 'clear-read') {
            changed = clearReadNotifications();
            message = `Removed ${changed} read notifications.`;
          } else if (action === 'clear-all') {
            const total = getNotificationSummary(0).total;
            clearNotifications();
            changed = total;
            message = `Removed ${changed} notifications.`;
          } else {
            success = false;
            message = 'Unsupported notification action.';
          }
          jsonResponse(res, { success, changed, message, summary: getNotificationSummary(200) }, success ? 200 : 400);
          return;
        }
        jsonResponse(res, { error: 'Not Found' }, 404);
      } catch (error) {
        console.error('[Guard] Route handler error:', error);
        jsonResponse(res, { error: 'Internal server error', message: error instanceof Error ? error.message : String(error) }, 500);
      }
    });
  }

  function tryListen(attempt: number): http.Server {
    const server = createHttpServer();
    server.on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE' && attempt < maxRetries) {
        currentPort += 1;
        console.log('[Guard] Port is in use, trying next port...');
        tryListen(attempt + 1);
      } else if (err.code === 'EADDRINUSE') {
        console.error(`[Guard] Failed to start: ${maxRetries} consecutive ports are occupied.`);
        process.exit(1);
      } else {
        console.error('[Guard] Server error:', err.message);
      }
    });
    server.listen(currentPort, () => {
      if (process.env.OPENCLAW_GUARD_BACKGROUND === '1') {
        registerBackgroundProcess(currentPort);
      }
      console.log('\n[Guard] OpenClaw Guard web UI started.');
      console.log(`   URL: http://localhost:${currentPort}`);
      console.log(`   Compatibility: http://localhost:${currentPort}/compat`);
      console.log(`   Legacy: http://localhost:${currentPort}/legacy`);
      console.log('   Press Ctrl+C to stop.\n');
    });
    return server;
  }

  return tryListen(0);
}











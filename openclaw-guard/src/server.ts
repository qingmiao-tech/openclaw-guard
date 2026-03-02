/**
 * Web 绠＄悊鐣岄潰 - 杞婚噺 HTTP 鏈嶅姟鍣?
 * 澶嶇敤 CLI 妯″潡锛屾彁渚?JSON API + 鍓嶇椤甸潰
 */
import http from 'node:http';
import { runFullAudit } from './audit.js';
import { listProfiles, getProfile, applyProfile, PROFILES } from './profiles.js';
import { getAllHardenSteps, generateHardenScript } from './harden.js';
import { detectPlatform, getCurrentUser, getOpenClawDir, getHomeDir } from './platform.js';
import { detectOpenClaw, installOrUpdateSync } from './openclaw.js';
import { getHtmlPage } from './web-ui.js';
import { loadConfig, saveConfig, getNested, readAllEnv, readEnvValue, writeEnvValue, getOrCreateGatewayToken, getDashboardUrl } from './config.js';
import { getChannels, getChannel, saveChannel, clearChannel, getFeishuConfig, saveFeishuConfig, checkFeishuPlugin } from './channels.js';
import { getAIConfig, saveProvider, deleteProvider, setPrimaryModel, setFallbackModels, PROVIDERS as AI_PROVIDERS } from './models.js';
import { getServiceStatus, startService, stopService, restartService, getLogs } from './service-mgr.js';
import {
  getMissionStatus,
  installMissionControl,
  syncMissionControl,
  bootstrapMissionControl,
  startMissionControl,
  stopMissionControl,
  restartMissionControl,
  getMissionLogs,
  getMissionHealth,
} from './mission-control.js';

function jsonResponse(res: http.ServerResponse, data: unknown, status = 200) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Mission-Token, Authorization',
  });
  res.end(JSON.stringify(data));
}

function htmlResponse(res: http.ServerResponse, html: string) {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}

function readBody(req: http.IncomingMessage): Promise<string> {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => resolve(body));
  });
}

function isLoopbackAddress(remoteAddress?: string | null): boolean {
  if (!remoteAddress) return false;
  const normalized = remoteAddress.split('%')[0].replace(/^::ffff:/i, '');
  return normalized === '127.0.0.1' || normalized === '::1';
}

function getHeaderValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0]?.trim();
  return value?.trim();
}

function getMissionToken(req: http.IncomingMessage, url: URL): string | undefined {
  const headerToken = getHeaderValue(req.headers['x-mission-token']);
  if (headerToken) return headerToken;

  const auth = getHeaderValue(req.headers.authorization);
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    return auth.slice(7).trim();
  }

  const queryToken = url.searchParams.get('mission_token') || url.searchParams.get('token');
  return queryToken?.trim() || undefined;
}

function requireMissionAccess(req: http.IncomingMessage, res: http.ServerResponse, url: URL): boolean {
  const remote = req.socket.remoteAddress;
  if (isLoopbackAddress(remote)) return true;

  const expectedToken = process.env.OPENCLAW_GUARD_MISSION_TOKEN?.trim();
  const providedToken = getMissionToken(req, url);

  if (!expectedToken) {
    jsonResponse(res, {
      success: false,
      message: 'Mission API denied: remote requests require OPENCLAW_GUARD_MISSION_TOKEN.',
      remoteAddress: remote || 'unknown',
    }, 403);
    return false;
  }

  if (!providedToken || providedToken !== expectedToken) {
    jsonResponse(res, {
      success: false,
      message: 'Mission API denied: invalid or missing token.',
      remoteAddress: remote || 'unknown',
    }, 401);
    return false;
  }

  return true;
}

export function startServer(port: number) {
  const maxRetries = 10;

  // 杩涚▼绾ч敊璇鐞?- 璁板綍閿欒浣嗕笉缁堟杩涚▼
  process.on('uncaughtException', (err) => {
    console.error('[Guard] 未捕获异常:', err.stack || err.message);
  });

  process.on('unhandledRejection', (reason) => {
    console.error('[Guard] 未处理的 Promise rejection:', reason);
  });

  function createHttpServer() {
    return http.createServer(async (req, res) => {
      try {
        const url = new URL(req.url || '/', `http://localhost:${currentPort}`);
        const pathname = url.pathname;

        // CORS preflight
        if (req.method === 'OPTIONS') {
          res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, X-Mission-Token, Authorization',
          });
          res.end();
          return;
        }

        // 鍓嶇椤甸潰
        if (pathname === '/' || pathname === '/index.html') {
          htmlResponse(res, getHtmlPage());
          return;
        }

        // ========== 绯荤粺淇℃伅 ==========
        if (pathname === '/api/info') {
          const ocStatus = detectOpenClaw();
          jsonResponse(res, {
            platform: detectPlatform(),
            user: getCurrentUser(),
            home: getHomeDir(),
            openclawDir: getOpenClawDir(),
            nodeVersion: process.version,
            arch: process.arch,
            openclaw: ocStatus,
          });
          return;
        }

        // ========== OpenClaw 鐘舵€?==========
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

        // ========== 瀹夊叏瀹¤ ==========
        if (pathname === '/api/audit') {
          const results = runFullAudit();
          const pass = results.filter(r => r.status === 'pass').length;
          const warn = results.filter(r => r.status === 'warn').length;
          const fail = results.filter(r => r.status === 'fail').length;
          jsonResponse(res, { results, summary: { pass, warn, fail } });
          return;
        }

        // ========== Profile ==========
        if (pathname === '/api/profiles' && req.method === 'GET') {
          const profiles = Object.entries(PROFILES).map(([key, p]) => ({ key, ...p }));
          jsonResponse(res, profiles);
          return;
        }
        if (pathname === '/api/profiles/apply' && req.method === 'POST') {
          const body = await readBody(req);
          try {
            const { profile: profileName, configPath } = JSON.parse(body);
            jsonResponse(res, applyProfile(profileName, configPath));
          } catch { jsonResponse(res, { success: false, message: '璇锋眰鏍煎紡閿欒' }, 400); }
          return;
        }

        // ========== 鍔犲浐 ==========
        if (pathname === '/api/harden/steps') {
          const platform = url.searchParams.get('platform') || detectPlatform();
          const steps = getAllHardenSteps();
          const mapped = steps.map(s => ({
            ...s,
            commands: s.commands[platform as keyof typeof s.commands] || s.commands[detectPlatform()],
          }));
          jsonResponse(res, { platform, steps: mapped });
          return;
        }
        if (pathname === '/api/harden/script') {
          const platform = url.searchParams.get('platform') || detectPlatform();
          const script = generateHardenScript(platform as 'windows' | 'macos' | 'linux');
          res.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8',
            'Content-Disposition': `attachment; filename="openclaw-guard-harden.${platform === 'windows' ? 'bat' : 'sh'}"`,
          });
          res.end(script);
          return;
        }

        // ========== 鏈嶅姟绠＄悊 ==========
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
          const lines = parseInt(url.searchParams.get('lines') || '100', 10);
          jsonResponse(res, { logs: getLogs(lines) });
          return;
        }

        // Mission APIs: local loopback allowed, remote must provide token.
        if (pathname.startsWith('/api/mission/') && !requireMissionAccess(req, res, url)) {
          return;
        }

        // ========== Mission Control (tenacitOS) ==========
        if (pathname === '/api/mission/status' && req.method === 'GET') {
          jsonResponse(res, getMissionStatus());
          return;
        }
        if (pathname === '/api/mission/install' && req.method === 'POST') {
          jsonResponse(res, installMissionControl());
          return;
        }
        if (pathname === '/api/mission/sync' && req.method === 'POST') {
          jsonResponse(res, syncMissionControl());
          return;
        }
        if (pathname === '/api/mission/bootstrap' && req.method === 'POST') {
          jsonResponse(res, bootstrapMissionControl());
          return;
        }
        if (pathname === '/api/mission/start' && req.method === 'POST') {
          const body = await readBody(req);
          try {
            const parsed = body ? JSON.parse(body) : {};
            const port = parsed?.port ? parseInt(String(parsed.port), 10) : undefined;
            const prod = !!parsed?.prod;
            jsonResponse(res, startMissionControl({ port, prod }));
          } catch {
            jsonResponse(res, { success: false, message: '璇锋眰鏍煎紡閿欒' }, 400);
          }
          return;
        }
        if (pathname === '/api/mission/stop' && req.method === 'POST') {
          jsonResponse(res, stopMissionControl());
          return;
        }
        if (pathname === '/api/mission/restart' && req.method === 'POST') {
          const body = await readBody(req);
          try {
            const parsed = body ? JSON.parse(body) : {};
            const port = parsed?.port ? parseInt(String(parsed.port), 10) : undefined;
            const prod = !!parsed?.prod;
            jsonResponse(res, restartMissionControl({ port, prod }));
          } catch {
            jsonResponse(res, { success: false, message: '璇锋眰鏍煎紡閿欒' }, 400);
          }
          return;
        }
        if (pathname === '/api/mission/logs' && req.method === 'GET') {
          const lines = parseInt(url.searchParams.get('lines') || '200', 10);
          jsonResponse(res, { logs: getMissionLogs(lines) });
          return;
        }
        if (pathname === '/api/mission/health' && req.method === 'GET') {
          jsonResponse(res, await getMissionHealth());
          return;
        }

        // ========== 娓犻亾閰嶇疆 ==========
        if (pathname === '/api/channels' && req.method === 'GET') {
          jsonResponse(res, getChannels());
          return;
        }
        if (pathname.startsWith('/api/channels/') && req.method === 'GET') {
          const channelId = pathname.split('/')[3];
          const ch = getChannel(channelId);
          if (ch) jsonResponse(res, ch);
          else jsonResponse(res, { error: 'Not Found' }, 404);
          return;
        }
        if (pathname.startsWith('/api/channels/') && req.method === 'POST') {
          const channelId = pathname.split('/')[3];
          const body = await readBody(req);
          try {
            const channelConfig = JSON.parse(body);
            jsonResponse(res, saveChannel(channelId, channelConfig));
          } catch { jsonResponse(res, { success: false, message: '璇锋眰鏍煎紡閿欒' }, 400); }
          return;
        }
        if (pathname.startsWith('/api/channels/') && req.method === 'DELETE') {
          const channelId = pathname.split('/')[3];
          jsonResponse(res, clearChannel(channelId));
          return;
        }

        // ========== 椋炰功涓撶敤 ==========
        if (pathname === '/api/feishu/config' && req.method === 'GET') {
          jsonResponse(res, getFeishuConfig());
          return;
        }
        if (pathname === '/api/feishu/config' && req.method === 'POST') {
          const body = await readBody(req);
          try {
            jsonResponse(res, saveFeishuConfig(JSON.parse(body)));
          } catch { jsonResponse(res, { success: false, message: '璇锋眰鏍煎紡閿欒' }, 400); }
          return;
        }
        if (pathname === '/api/feishu/plugin') {
          jsonResponse(res, checkFeishuPlugin());
          return;
        }

        // ========== AI 妯″瀷閰嶇疆 ==========
        if (pathname === '/api/ai/config' && req.method === 'GET') {
          jsonResponse(res, getAIConfig());
          return;
        }
        if (pathname === '/api/ai/providers' && req.method === 'GET') {
          const config = loadConfig();
          const customProviders = getNested(config, ['models', 'providers']) || {};
          jsonResponse(res, {
            presets: AI_PROVIDERS,
            custom: Object.entries(customProviders).map(([name, cfg]: [string, any]) => ({ name, ...cfg })),
          });
          return;
        }
        if (pathname === '/api/ai/provider' && req.method === 'POST') {
          const body = await readBody(req);
          try {
            jsonResponse(res, saveProvider(JSON.parse(body)));
          } catch { jsonResponse(res, { success: false, message: '璇锋眰鏍煎紡閿欒' }, 400); }
          return;
        }
        if (pathname.startsWith('/api/ai/provider/') && req.method === 'DELETE') {
          const name = pathname.split('/')[4];
          jsonResponse(res, deleteProvider(name));
          return;
        }
        if (pathname === '/api/ai/primary' && req.method === 'POST') {
          const body = await readBody(req);
          try {
            const { modelId } = JSON.parse(body);
            jsonResponse(res, setPrimaryModel(modelId));
          } catch { jsonResponse(res, { success: false, message: '璇锋眰鏍煎紡閿欒' }, 400); }
          return;
        }
        if (pathname === '/api/ai/fallbacks' && req.method === 'POST') {
          const body = await readBody(req);
          try {
            const parsed = JSON.parse(body || '{}');
            const modelIds = Array.isArray(parsed?.modelIds)
              ? parsed.modelIds
              : Array.isArray(parsed?.models)
                ? parsed.models
                : typeof parsed?.modelIds === 'string'
                  ? parsed.modelIds.split(',')
                  : typeof parsed?.models === 'string'
                    ? parsed.models.split(',')
                    : [];
            jsonResponse(res, setFallbackModels(modelIds));
          } catch {
            jsonResponse(res, { success: false, message: '璇锋眰鏍煎紡閿欒' }, 400);
          }
          return;
        }

        // ========== 鐜鍙橀噺 ==========
        if (pathname === '/api/env' && req.method === 'GET') {
          jsonResponse(res, readAllEnv());
          return;
        }
        if (pathname === '/api/env' && req.method === 'POST') {
          const body = await readBody(req);
          try {
            const { key, value } = JSON.parse(body);
            writeEnvValue(key, value);
            jsonResponse(res, { success: true, message: `${key} saved.` });
          } catch { jsonResponse(res, { success: false, message: '璇锋眰鏍煎紡閿欒' }, 400); }
          return;
        }

        // ========== Gateway Token ==========
        if (pathname === '/api/gateway/token') {
          jsonResponse(res, { token: getOrCreateGatewayToken() });
          return;
        }
        if (pathname === '/api/gateway/dashboard') {
          jsonResponse(res, { url: getDashboardUrl() });
          return;
        }

        // ========== 閰嶇疆鏂囦欢鐩存帴璇诲啓 ==========
        if (pathname === '/api/config' && req.method === 'GET') {
          jsonResponse(res, loadConfig());
          return;
        }
        if (pathname === '/api/config' && req.method === 'POST') {
          const body = await readBody(req);
          try {
            saveConfig(JSON.parse(body));
            jsonResponse(res, { success: true, message: 'Configuration saved.' });
          } catch { jsonResponse(res, { success: false, message: '璇锋眰鏍煎紡閿欒' }, 400); }
          return;
        }

        // 404
        jsonResponse(res, { error: 'Not Found' }, 404);
      } catch (err) {
        console.error('[Guard] 璺敱澶勭悊寮傚父:', err);
        jsonResponse(res, { error: 'Internal server error', message: String(err) }, 500);
      }
    });
  }

  let currentPort = port;

  function tryListen(attempt: number): http.Server {
    const server = createHttpServer();
    server.on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE' && attempt < maxRetries) {
        currentPort++;
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
      console.log('\n[Guard] OpenClaw Guard web UI started.');
      console.log(`   URL: http://localhost:${currentPort}`);
      console.log('   Press Ctrl+C to stop.\n');
    });
    return server;
  }

  return tryListen(0);
}




/**
 * Web 管理界面 - 轻量 HTTP 服务器
 * 复用 CLI 模块，提供 JSON API + 前端页面
 */
import http from 'node:http';
import { runFullAudit } from './audit.js';
import { listProfiles, getProfile, applyProfile, PROFILES } from './profiles.js';
import { getAllHardenSteps, generateHardenScript } from './harden.js';
import { detectPlatform, getCurrentUser, getOpenClawDir, getHomeDir } from './platform.js';
import { detectOpenClaw, installOrUpdateSync } from './openclaw.js';
import { getHtmlPage } from './web-ui.js';
import { loadConfig, saveConfig, readAllEnv, readEnvValue, writeEnvValue, getOrCreateGatewayToken, getDashboardUrl } from './config.js';
import { getChannels, getChannel, saveChannel, clearChannel, getFeishuConfig, saveFeishuConfig, checkFeishuPlugin } from './channels.js';
import { getAIConfig, saveProvider, deleteProvider, setPrimaryModel, PROVIDERS as AI_PROVIDERS } from './models.js';
import { getServiceStatus, startService, stopService, restartService, getLogs } from './service-mgr.js';

function jsonResponse(res: http.ServerResponse, data: unknown, status = 200) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
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

export function startServer(port: number) {
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url || '/', `http://localhost:${port}`);
    const pathname = url.pathname;

    // CORS preflight
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      });
      res.end();
      return;
    }

    // 前端页面
    if (pathname === '/' || pathname === '/index.html') {
      htmlResponse(res, getHtmlPage());
      return;
    }

    // ========== 系统信息 ==========
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

    // ========== OpenClaw 状态 ==========
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

    // ========== 安全审计 ==========
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
      } catch { jsonResponse(res, { success: false, message: '请求格式错误' }, 400); }
      return;
    }

    // ========== 加固 ==========
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

    // ========== 服务管理 ==========
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

    // ========== 渠道配置 ==========
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
      } catch { jsonResponse(res, { success: false, message: '请求格式错误' }, 400); }
      return;
    }
    if (pathname.startsWith('/api/channels/') && req.method === 'DELETE') {
      const channelId = pathname.split('/')[3];
      jsonResponse(res, clearChannel(channelId));
      return;
    }

    // ========== 飞书专用 ==========
    if (pathname === '/api/feishu/config' && req.method === 'GET') {
      jsonResponse(res, getFeishuConfig());
      return;
    }
    if (pathname === '/api/feishu/config' && req.method === 'POST') {
      const body = await readBody(req);
      try {
        jsonResponse(res, saveFeishuConfig(JSON.parse(body)));
      } catch { jsonResponse(res, { success: false, message: '请求格式错误' }, 400); }
      return;
    }
    if (pathname === '/api/feishu/plugin') {
      jsonResponse(res, checkFeishuPlugin());
      return;
    }

    // ========== AI 模型配置 ==========
    if (pathname === '/api/ai/config' && req.method === 'GET') {
      jsonResponse(res, getAIConfig());
      return;
    }
    if (pathname === '/api/ai/providers' && req.method === 'GET') {
      jsonResponse(res, AI_PROVIDERS);
      return;
    }
    if (pathname === '/api/ai/provider' && req.method === 'POST') {
      const body = await readBody(req);
      try {
        jsonResponse(res, saveProvider(JSON.parse(body)));
      } catch { jsonResponse(res, { success: false, message: '请求格式错误' }, 400); }
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
      } catch { jsonResponse(res, { success: false, message: '请求格式错误' }, 400); }
      return;
    }

    // ========== 环境变量 ==========
    if (pathname === '/api/env' && req.method === 'GET') {
      jsonResponse(res, readAllEnv());
      return;
    }
    if (pathname === '/api/env' && req.method === 'POST') {
      const body = await readBody(req);
      try {
        const { key, value } = JSON.parse(body);
        writeEnvValue(key, value);
        jsonResponse(res, { success: true, message: `${key} 已保存` });
      } catch { jsonResponse(res, { success: false, message: '请求格式错误' }, 400); }
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

    // ========== 配置文件直接读写 ==========
    if (pathname === '/api/config' && req.method === 'GET') {
      jsonResponse(res, loadConfig());
      return;
    }
    if (pathname === '/api/config' && req.method === 'POST') {
      const body = await readBody(req);
      try {
        saveConfig(JSON.parse(body));
        jsonResponse(res, { success: true, message: '配置已保存' });
      } catch { jsonResponse(res, { success: false, message: '请求格式错误' }, 400); }
      return;
    }

    // 404
    jsonResponse(res, { error: 'Not Found' }, 404);
  });

  server.listen(port, () => {
    console.log(`\n🛡️  OpenClaw Guard Web 管理界面已启动`);
    console.log(`   地址: http://localhost:${port}`);
    console.log(`   按 Ctrl+C 停止\n`);
  });

  return server;
}

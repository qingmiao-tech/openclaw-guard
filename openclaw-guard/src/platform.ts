/**
 * 跨平台检测与适配层
 */
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

export type Platform = 'windows' | 'macos' | 'linux';

export function detectPlatform(): Platform {
  switch (os.platform()) {
    case 'win32': return 'windows';
    case 'darwin': return 'macos';
    default: return 'linux';
  }
}

export function getHomeDir(): string {
  return os.homedir();
}

/** 获取当前系统用户名 */
export function getCurrentUser(): string {
  return os.userInfo().username;
}

/** 获取各平台下需要保护的敏感目录列表 */
export function getSensitivePaths(platform: Platform): string[] {
  const home = getHomeDir();
  const common = [
    path.join(home, '.ssh'),
    path.join(home, '.gnupg'),
    path.join(home, '.git-credentials'),
    path.join(home, '.npmrc'),
    path.join(home, '.pypirc'),
  ];

  const platformSpecific: Record<Platform, string[]> = {
    windows: [
      path.join(home, 'AppData', 'Local', 'Google', 'Chrome', 'User Data'),
      path.join(home, 'AppData', 'Local', 'Microsoft', 'Edge', 'User Data'),
      path.join(home, 'AppData', 'Roaming', 'npm', 'etc', 'npmrc'),
      path.join(home, '.docker'),
      path.join(home, '.kube'),
      path.join(home, '.aws'),
    ],
    macos: [
      path.join(home, 'Library', 'Application Support', 'Google', 'Chrome'),
      path.join(home, 'Library', 'Keychains'),
      path.join(home, '.docker'),
      path.join(home, '.kube'),
      path.join(home, '.aws'),
      path.join(home, 'Library', 'Application Support', 'Firefox'),
    ],
    linux: [
      path.join(home, '.config', 'google-chrome'),
      path.join(home, '.mozilla', 'firefox'),
      path.join(home, '.docker'),
      path.join(home, '.kube'),
      path.join(home, '.aws'),
      path.join(home, '.config'),
    ],
  };

  return [...common, ...platformSpecific[platform]];
}

/** 获取 OpenClaw 状态目录（兼容旧版目录名） */
export function getOpenClawDir(): string {
  // 1. 环境变量覆盖
  const stateOverride = process.env.OPENCLAW_STATE_DIR?.trim() || process.env.CLAWDBOT_STATE_DIR?.trim();
  if (stateOverride) {
    return path.resolve(stateOverride.startsWith('~') ? stateOverride.replace('~', getHomeDir()) : stateOverride);
  }

  const home = getHomeDir();
  const newDir = path.join(home, '.openclaw');
  const legacyDirs = [
    path.join(home, '.clawdbot'),
    path.join(home, '.moldbot'),
    path.join(home, '.moltbot'),
  ];

  // 2. 优先使用新目录（如果存在）
  if (fs.existsSync(newDir)) return newDir;

  // 3. 检查旧版目录
  for (const dir of legacyDirs) {
    if (fs.existsSync(dir)) return dir;
  }

  // 4. 默认返回新目录
  return newDir;
}

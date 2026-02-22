/**
 * 跨平台检测与适配层
 */
import os from 'node:os';
import path from 'node:path';

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

/** 获取 OpenClaw 默认工作目录 */
export function getOpenClawDir(): string {
  const home = getHomeDir();
  const platform = detectPlatform();
  if (platform === 'windows') {
    return path.join(home, 'AppData', 'Local', 'openclaw');
  }
  return path.join(home, '.openclaw');
}

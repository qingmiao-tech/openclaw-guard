import fs from 'node:fs';

type GuardPackageJson = {
  name?: string;
  version?: string;
};

const FALLBACK_GUARD_PACKAGE_NAME = '@qingmiao-tech/openclaw-guard';
const FALLBACK_GUARD_VERSION = '0.9.0';

function readGuardPackageJson(): GuardPackageJson {
  try {
    const packageJsonPath = new URL('../package.json', import.meta.url);
    return JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')) as GuardPackageJson;
  } catch {
    return {};
  }
}

const packageJson = readGuardPackageJson();

export const GUARD_PACKAGE_NAME = typeof packageJson.name === 'string' && packageJson.name.trim()
  ? packageJson.name.trim()
  : FALLBACK_GUARD_PACKAGE_NAME;

export const GUARD_VERSION = typeof packageJson.version === 'string' && packageJson.version.trim()
  ? packageJson.version.trim()
  : FALLBACK_GUARD_VERSION;

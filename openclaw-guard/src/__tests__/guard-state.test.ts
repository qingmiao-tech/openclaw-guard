import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ensureGuardLayout, readJsonl, resolveUserPath, writeJsonFile, appendJsonl, readJsonFile } from '../guard-state.js';

describe('guard-state', () => {
  let tempRoot: string;

  beforeEach(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'guard-state-'));
    vi.stubEnv('OPENCLAW_STATE_DIR', tempRoot);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it('resolveUserPath expands home alias', () => {
    const resolved = resolveUserPath('~/.openclaw/demo');
    expect(resolved).toContain(path.join(os.homedir(), '.openclaw', 'demo'));
  });

  it('ensureGuardLayout creates state directories under .openclaw/guard', () => {
    const layout = ensureGuardLayout();
    expect(fs.existsSync(layout.guardDir)).toBe(true);
    expect(fs.existsSync(layout.stateDir)).toBe(true);
    expect(fs.existsSync(layout.secretsDir)).toBe(true);
    expect(fs.existsSync(layout.sessionsDir)).toBe(true);
    expect(fs.existsSync(layout.activityDir)).toBe(true);
    expect(fs.existsSync(layout.costsDir)).toBe(true);
  });

  it('writes and reads json + jsonl payloads', () => {
    const layout = ensureGuardLayout();
    const jsonFile = path.join(layout.stateDir, 'sample.json');
    const jsonlFile = path.join(layout.activityDir, 'sample.jsonl');

    writeJsonFile(jsonFile, { ok: true, count: 2 });
    appendJsonl(jsonlFile, { id: 1 });
    appendJsonl(jsonlFile, { id: 2 });

    expect(readJsonFile(jsonFile, { ok: false, count: 0 })).toEqual({ ok: true, count: 2 });
    expect(readJsonl<{ id: number }>(jsonlFile)).toEqual([{ id: 1 }, { id: 2 }]);
  });
});

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('auth password reveal', () => {
  let tempRoot: string;

  beforeEach(() => {
    vi.resetModules();
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'guard-auth-'));
    vi.stubEnv('OPENCLAW_STATE_DIR', tempRoot);
    vi.stubEnv('GUARD_NO_AUTH', '0');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it('stores the generated password for local reveal commands', async () => {
    const auth = await import('../auth.js');

    const initialized = auth.initAuth();
    expect(initialized.isNew).toBe(true);
    expect(initialized.password).toMatch(/^[A-HJ-NP-Za-km-z2-9]{12}$/);

    const record = auth.getInitialPasswordRecord();
    expect(record?.password).toBe(initialized.password);

    const status = auth.getAuthStatus();
    expect(status.enabled).toBe(true);
    expect(status.configured).toBe(true);
    expect(status.initialPasswordAvailable).toBe(true);
    expect(status.revealCommand).toBe('openclaw-guard auth show-password');
  });

  it('updates the reveal record after the password is changed', async () => {
    const auth = await import('../auth.js');

    const initialized = auth.initAuth();
    const result = auth.changePassword(initialized.password || '', 'my-new-password');

    expect(result.success).toBe(true);
    expect(auth.getInitialPasswordRecord()).toEqual({
      password: 'my-new-password',
      createdAt: expect.any(String),
      authCreatedAt: expect.any(String),
      kind: 'changed',
    });
    expect(auth.validatePassword('my-new-password')).toBe(true);
    expect(auth.getAuthStatus().initialPasswordAvailable).toBe(true);
    expect(auth.getAuthStatus().revealPasswordKind).toBe('changed');
  });
});

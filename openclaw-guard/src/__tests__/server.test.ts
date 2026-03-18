import http from 'node:http';
import { afterEach, describe, expect, it, vi } from 'vitest';

type UncaughtHandler = (err: Error) => void;
type RejectionHandler = (reason: unknown) => void;

async function ensureServerBootstrapped() {
  const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  const { startServer } = await import('../server.js');
  const server = startServer(0);
  server?.close();
  logSpy.mockRestore();
}

function findGuardHandler<TArgs extends unknown[]>(
  eventName: 'uncaughtException' | 'unhandledRejection',
  expectedPrefix: string,
  invokeArgs: TArgs,
) {
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  const candidates = process.listeners(eventName) as Array<(...args: TArgs) => void>;

  for (const candidate of candidates) {
    try {
      errorSpy.mockClear();
      candidate(...invokeArgs);
      if (errorSpy.mock.calls.some((call) => call[0] === expectedPrefix)) {
        errorSpy.mockRestore();
        return candidate;
      }
    } catch {
      // ignore and try next
    }
  }

  errorSpy.mockRestore();
  return null;
}

async function startEphemeralServer() {
  const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  const { startServer } = await import('../server.js');
  const server = startServer(0);
  await new Promise<void>((resolve) => server.on('listening', () => resolve()));
  logSpy.mockRestore();
  return server;
}

function getPort(server: http.Server) {
  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('Server is not listening');
  }
  return address.port;
}

async function closeServer(server: http.Server) {
  await new Promise<void>((resolve) => server.close(() => resolve()));
}

describe('startServer - process-level handlers', () => {
  it('registers an uncaughtException handler that logs stack', async () => {
    await ensureServerBootstrapped();

    const probeError = new Error('probe');
    const handler = findGuardHandler<[Error]>(
      'uncaughtException',
      '[Guard] Uncaught exception:',
      [probeError],
    ) as UncaughtHandler | null;

    expect(handler).not.toBeNull();

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    handler!(probeError);
    expect(consoleErrorSpy).toHaveBeenCalledWith('[Guard] Uncaught exception:', probeError.stack);
    consoleErrorSpy.mockRestore();
  });

  it('registers an uncaughtException handler that falls back to message', async () => {
    await ensureServerBootstrapped();

    const probeError = new Error('no stack error');
    probeError.stack = undefined;
    const handler = findGuardHandler<[Error]>(
      'uncaughtException',
      '[Guard] Uncaught exception:',
      [probeError],
    ) as UncaughtHandler | null;

    expect(handler).not.toBeNull();

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    handler!(probeError);
    expect(consoleErrorSpy).toHaveBeenCalledWith('[Guard] Uncaught exception:', 'no stack error');
    consoleErrorSpy.mockRestore();
  });

  it('registers an unhandledRejection handler that logs reason', async () => {
    await ensureServerBootstrapped();

    const reason = 'promise rejection reason';
    const handler = findGuardHandler<[unknown]>(
      'unhandledRejection',
      '[Guard] Unhandled Promise rejection:',
      [reason],
    ) as RejectionHandler | null;

    expect(handler).not.toBeNull();

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    handler!(reason);
    expect(consoleErrorSpy).toHaveBeenCalledWith('[Guard] Unhandled Promise rejection:', reason);
    consoleErrorSpy.mockRestore();
  });
});

describe('startServer - UI selector routing', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('serves legacy workbench by default on /', async () => {
    const server = await startEphemeralServer();
    const port = getPort(server);

    const response = await fetch(`http://localhost:${port}/`);
    const html = await response.text();

    expect(html).toContain('/ui/guard-ui.js');
    await closeServer(server);
  });

  it('serves next workbench on / when overridden by query', async () => {
    const server = await startEphemeralServer();
    const port = getPort(server);

    const response = await fetch(`http://localhost:${port}/?ui=next`);
    const html = await response.text();

    expect(html).toContain('/ui/guard-ui.next.js');
    await closeServer(server);
  });

  it('serves next workbench on / when GUARD_UI=next', async () => {
    vi.stubEnv('GUARD_UI', 'next');
    const server = await startEphemeralServer();
    const port = getPort(server);

    const response = await fetch(`http://localhost:${port}/`);
    const html = await response.text();

    expect(html).toContain('/ui/guard-ui.next.js');
    await closeServer(server);
  });

  it('keeps /legacy on legacy even when GUARD_UI=next', async () => {
    vi.stubEnv('GUARD_UI', 'next');
    const server = await startEphemeralServer();
    const port = getPort(server);

    const response = await fetch(`http://localhost:${port}/legacy`);
    const html = await response.text();

    expect(html).toContain('/ui/guard-ui.js');
    await closeServer(server);
  });

  it('keeps /next on next even when GUARD_UI=legacy', async () => {
    vi.stubEnv('GUARD_UI', 'legacy');
    const server = await startEphemeralServer();
    const port = getPort(server);

    const response = await fetch(`http://localhost:${port}/next`);
    const html = await response.text();

    expect(html).toContain('/ui/guard-ui.next.js');
    await closeServer(server);
  });
});


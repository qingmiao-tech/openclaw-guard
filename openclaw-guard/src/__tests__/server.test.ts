import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('startServer - 进程级错误处理', () => {
  let processOnSpy: any;

  beforeEach(() => {
    processOnSpy = vi.spyOn(process, 'on');
  });

  afterEach(() => {
    processOnSpy.mockRestore();
  });

  it('注册 uncaughtException 处理器', async () => {
    // Dynamically import to trigger startServer registration
    const { startServer } = await import('../server.js');

    // Create a server but don't actually listen — we just need the handlers registered
    const server = startServer(0);
    server?.close();

    const uncaughtCalls = processOnSpy.mock.calls.filter(
      ([event]: any[]) => event === 'uncaughtException'
    );
    expect(uncaughtCalls.length).toBeGreaterThanOrEqual(1);
    expect(typeof uncaughtCalls[0][1]).toBe('function');
  });

  it('注册 unhandledRejection 处理器', async () => {
    const { startServer } = await import('../server.js');

    const server = startServer(0);
    server?.close();

    const rejectionCalls = processOnSpy.mock.calls.filter(
      ([event]: any[]) => event === 'unhandledRejection'
    );
    expect(rejectionCalls.length).toBeGreaterThanOrEqual(1);
    expect(typeof rejectionCalls[0][1]).toBe('function');
  });

  it('uncaughtException 处理器记录错误堆栈到控制台', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { startServer } = await import('../server.js');

    const server = startServer(0);
    server?.close();

    // Find the registered handler
    const uncaughtCall = processOnSpy.mock.calls.find(
      ([event]: any[]) => event === 'uncaughtException'
    );
    const handler = uncaughtCall![1] as (err: Error) => void;

    // Invoke the handler with a test error
    const testError = new Error('test uncaught error');
    handler(testError);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      '[Guard] Uncaught exception:',
      testError.stack
    );

    consoleErrorSpy.mockRestore();
  });

  it('unhandledRejection 处理器记录 rejection 详情到控制台', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { startServer } = await import('../server.js');

    const server = startServer(0);
    server?.close();

    // Find the registered handler
    const rejectionCall = processOnSpy.mock.calls.find(
      ([event]: any[]) => event === 'unhandledRejection'
    );
    const handler = rejectionCall![1] as (reason: unknown) => void;

    // Invoke the handler with a test reason
    handler('promise rejection reason');

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      '[Guard] Unhandled Promise rejection:',
      'promise rejection reason'
    );

    consoleErrorSpy.mockRestore();
  });

  it('uncaughtException 处理器在无 stack 时使用 message', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { startServer } = await import('../server.js');

    const server = startServer(0);
    server?.close();

    const uncaughtCall = processOnSpy.mock.calls.find(
      ([event]: any[]) => event === 'uncaughtException'
    );
    const handler = uncaughtCall![1] as (err: Error) => void;

    // Create an error without stack
    const testError = new Error('no stack error');
    testError.stack = undefined;
    handler(testError);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      '[Guard] Uncaught exception:',
      'no stack error'
    );

    consoleErrorSpy.mockRestore();
  });
});

# Pull Request: Fix Connection Error Failover

## GitHub PR Information

**From**: `haotian2546:fix/connection-error-failover`
**To**: `openclaw:main`
**Title**: `fix(agents): recognize connection errors as retryable timeout failures`

---

## PR Description

### Problem

When a model endpoint becomes unreachable due to network issues, the failover system fails to switch to the next candidate model. This occurs in real-world scenarios such as:

- **Local proxy server down**: Forgot to start the local proxy service
- **Relay server offline**: Intermediate relay/gateway becomes unavailable
- **Network connectivity issues**: DNS failures, connection refused, etc.

Errors like `"Connection error."`, `"fetch failed"`, or `"network error"` are not classified as retryable, causing the session to hang on a broken endpoint instead of falling back to healthy alternatives.

### Root Cause

Connection/network errors are not recognized by the current failover classifier in two key locations:

1. **`src/agents/pi-embedded-helpers/errors.ts`** - `ERROR_PATTERNS.timeout` missing:
   - Text patterns: `"connection error"`, `"fetch failed"`, `"network error"`
   - Error codes in message text: `ECONNREFUSED`, `ENOTFOUND`, `EAI_AGAIN`

2. **`src/agents/failover-error.ts`** - `TIMEOUT_HINT_RE` missing same patterns

While `failover-error.ts` already handles these as structured error codes (`err.code`), it misses them when they appear as plain text in error messages (`err.message`).

### Solution

Extend timeout error patterns to include connection/network failures:

#### Changes in `errors.ts` (ERROR_PATTERNS.timeout)
```typescript
timeout: [
  // ... existing patterns
  "connection error",
  "network error",
  "network request failed",
  "fetch failed",
  "socket hang up",
  /\beconn(?:refused|reset|aborted)\b/i,
  /\benotfound\b/i,
  /\beai_again\b/i,
],
```

#### Changes in `failover-error.ts` (TIMEOUT_HINT_RE)
```typescript
const TIMEOUT_HINT_RE =
  /timeout|timed out|deadline exceeded|context deadline exceeded|connection error|network error|network request failed|fetch failed|socket hang up|econnrefused|econnreset|econnaborted|enotfound|eai_again|stop reason:\s*abort|reason:\s*abort|unhandled stop reason:\s*abort/i;
```

### Testing

Added comprehensive test cases covering:
- `"Connection error."`
- `"fetch failed"`
- `"network error: ECONNREFUSED"`
- `"dial tcp: lookup api.example.com: no such host (ENOTFOUND)"`
- `"temporary dns failure EAI_AGAIN"`

All tests pass and verify that these errors are now correctly classified as `timeout` (retryable).

### Impact

- **Compatibility**: High - only expands retryable error detection, no breaking changes
- **Behavior**: Connection failures now trigger automatic fallback to next model
- **Risk**: Low - changes are additive, well-tested, and follow existing patterns

### Real-World Scenario

This fix addresses a critical user experience issue:

1. User has multi-model fallback configured (e.g., Primary → Backup → Fallback)
2. Primary model's relay server goes offline
3. **Before**: Session hangs with "Connection error", no fallback occurs
4. **After**: System automatically tries Backup model, then Fallback if needed

This ensures resilient operation even when network infrastructure is unstable.

---

## How to Create the PR

1. Visit: https://github.com/openclaw/openclaw/compare/main...haotian2546:openclaw:fix/connection-error-failover
2. Click "Create pull request"
3. Copy the title and description above
4. Submit the PR

---

## Files Changed

- `src/agents/failover-error.test.ts` - Added test cases for connection errors
- `src/agents/failover-error.ts` - Extended TIMEOUT_HINT_RE pattern
- `src/agents/pi-embedded-helpers.isbillingerrormessage.test.ts` - Added test cases
- `src/agents/pi-embedded-helpers/errors.ts` - Extended ERROR_PATTERNS.timeout

---

## Commit

```
fix(agents): recognize connection errors as retryable timeout failures

## Problem

When a model endpoint becomes unreachable (e.g., local proxy down,
relay server offline), the failover system fails to switch to the
next candidate model. Errors like "Connection error." are not
classified as retryable, causing the session to hang on a broken
endpoint instead of falling back to healthy alternatives.

## Root Cause

Connection/network errors are not recognized by the current failover
classifier:
- Text patterns like "Connection error.", "fetch failed", "network error"
- Error codes like ECONNREFUSED, ENOTFOUND, EAI_AGAIN (in message text)

While `failover-error.ts` handles these as error codes (err.code),
it misses them when they appear as plain text in error messages.

## Solution

Extend timeout error patterns to include connection/network failures:

**In `errors.ts` (ERROR_PATTERNS.timeout):**
- Text: "connection error", "network error", "fetch failed", etc.
- Regex: /\beconn(?:refused|reset|aborted)\b/i, /\benotfound\b/i, /\beai_again\b/i

**In `failover-error.ts` (TIMEOUT_HINT_RE):**
- Same patterns for non-assistant error paths

## Testing

Added test cases covering:
- "Connection error."
- "fetch failed"
- "network error: ECONNREFUSED"
- "ENOTFOUND" / "EAI_AGAIN" in message text

## Impact

- **Compatibility:** High - only expands retryable error detection
- **Behavior:** Connection failures now trigger automatic fallback
- **Risk:** Low - changes are additive and well-tested
```

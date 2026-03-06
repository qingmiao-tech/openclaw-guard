#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const AGENT_MAP = [
  { agentId: "task-hub", accountId: "task-hub" },
  { agentId: "market-research", accountId: "market-research" },
  { agentId: "data-analysis", accountId: "data-analysis" },
  { agentId: "ad-ops", accountId: "ad-ops" },
  { agentId: "logistics-customs", accountId: "logistics-customs" },
  { agentId: "finance-manager", accountId: "finance-manager" },
  { agentId: "copy-editor", accountId: "copy-editor" },
];

function readArgs(argv) {
  const out = {
    config: path.join(process.env.HOME || "~", ".openclaw", "openclaw.json"),
    channel: "feishu-enhanced",
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--config") {
      out.config = argv[i + 1];
      i += 1;
    } else if (arg === "--channel") {
      out.channel = argv[i + 1];
      i += 1;
    }
  }
  return out;
}

function envPrefix(accountId) {
  return `FEISHU_${accountId.replace(/[^A-Za-z0-9]/g, "_").toUpperCase()}`;
}

function ensureObject(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value;
  }
  return {};
}

function parseJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function buildEnvTemplate() {
  const lines = [
    "#!/usr/bin/env bash",
    "# Fill real values, then source this file or copy to ~/.zshrc",
    "",
  ];
  for (const row of AGENT_MAP) {
    const prefix = envPrefix(row.accountId);
    lines.push(`export ${prefix}_APP_ID="cli_xxx"`);
    lines.push(`export ${prefix}_APP_SECRET="xxx"`);
    lines.push("");
  }
  return `${lines.join("\n")}\n`;
}

function main() {
  const args = readArgs(process.argv.slice(2));
  const cfg = parseJson(args.config);

  cfg.channels = ensureObject(cfg.channels);
  cfg.bindings = Array.isArray(cfg.bindings) ? cfg.bindings : [];

  const channelCfg = ensureObject(cfg.channels[args.channel]);
  const existingAccounts = ensureObject(channelCfg.accounts);

  const accounts = { ...existingAccounts };
  for (const row of AGENT_MAP) {
    const prefix = envPrefix(row.accountId);
    const seeded = {
      enabled: true,
      name: `${row.agentId}-bot`,
      appId: `\${${prefix}_APP_ID}`,
      appSecret: `\${${prefix}_APP_SECRET}`,
      domain: "feishu",
      connectionMode: "websocket",
    };
    const existing = ensureObject(existingAccounts[row.accountId]);
    accounts[row.accountId] = { ...seeded, ...existing };
  }

  cfg.channels[args.channel] = {
    ...channelCfg,
    enabled: channelCfg.enabled ?? true,
    domain: channelCfg.domain ?? "feishu",
    connectionMode: channelCfg.connectionMode ?? "websocket",
    dmPolicy: channelCfg.dmPolicy ?? "pairing",
    groupPolicy: channelCfg.groupPolicy ?? "allowlist",
    requireMention: channelCfg.requireMention ?? true,
    accounts,
  };

  const targetAccounts = new Set(AGENT_MAP.map((x) => x.accountId));
  const filteredBindings = cfg.bindings.filter((entry) => {
    const match = ensureObject(entry?.match);
    return !(
      match.channel === args.channel &&
      typeof match.accountId === "string" &&
      targetAccounts.has(match.accountId)
    );
  });

  const generatedBindings = AGENT_MAP.map((row) => ({
    agentId: row.agentId,
    comment: `${args.channel}:${row.accountId} -> ${row.agentId}`,
    match: {
      channel: args.channel,
      accountId: row.accountId,
    },
  }));

  cfg.bindings = [...generatedBindings, ...filteredBindings];
  writeJson(args.config, cfg);

  const templatePath = path.join(path.dirname(args.config), "openclaw-feishu-agent-env.template.sh");
  fs.writeFileSync(templatePath, buildEnvTemplate(), "utf8");

  const definedAgents = new Set(
    Array.isArray(cfg?.agents?.list) ? cfg.agents.list.map((a) => a?.id).filter(Boolean) : [],
  );
  const missing = AGENT_MAP.filter((x) => !definedAgents.has(x.agentId)).map((x) => x.agentId);

  console.log(`[ok] updated ${args.config}`);
  console.log(`[ok] channel = ${args.channel}`);
  console.log(`[ok] wrote env template: ${templatePath}`);
  console.log("[required] env vars:");
  for (const row of AGENT_MAP) {
    const prefix = envPrefix(row.accountId);
    console.log(`  - ${prefix}_APP_ID`);
    console.log(`  - ${prefix}_APP_SECRET`);
  }
  if (missing.length > 0) {
    console.log(`[warn] agent ids not found in agents.list: ${missing.join(", ")}`);
  }
}

main();

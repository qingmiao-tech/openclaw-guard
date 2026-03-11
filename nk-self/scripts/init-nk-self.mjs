#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const PERSONAL_AGENT_IDS = [
  'nk-nanxin',
  'nk-nangong',
  'nk-nanmo',
  'nk-nanchou',
  'nk-nanqi',
  'nk-nanhe',
  'nk-nanchuang',
];

function readArgs(argv) {
  const args = {
    template: '',
    output: '',
    config: '',
    model: '',
    writeConfig: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--template') {
      args.template = argv[index + 1] || '';
      index += 1;
    } else if (arg === '--output') {
      args.output = argv[index + 1] || '';
      index += 1;
    } else if (arg === '--config') {
      args.config = argv[index + 1] || '';
      index += 1;
    } else if (arg === '--model') {
      args.model = argv[index + 1] || '';
      index += 1;
    } else if (arg === '--write-config') {
      args.writeConfig = true;
    }
  }

  if (!args.template) {
    throw new Error('Missing --template path.');
  }
  if (!args.output) {
    throw new Error('Missing --output path.');
  }
  return args;
}

function ensureObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function uniqueStrings(values) {
  return [...new Set(values.filter((item) => typeof item === 'string' && item.trim()))];
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function readJson(filePath, fallback = undefined) {
  if (!filePath || !fs.existsSync(filePath)) {
    return fallback;
  }
  const raw = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
  return JSON.parse(raw);
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function resolveModelPrimary(explicitModel, currentConfig, templateConfig) {
  return (
    explicitModel ||
    currentConfig?.agents?.defaults?.model?.primary ||
    templateConfig?.agents?.defaults?.model?.primary ||
    'REPLACE_WITH_PRIMARY_MODEL'
  );
}

function buildStandalone(templateConfig, modelPrimary) {
  const output = deepClone(templateConfig);
  output.agents = ensureObject(output.agents);
  output.agents.defaults = ensureObject(output.agents.defaults);
  output.agents.defaults.model = {
    ...ensureObject(output.agents.defaults.model),
    primary: modelPrimary,
  };
  output.messages = {
    ackReactionScope: 'group-mentions',
    ...ensureObject(output.messages),
  };
  output.bindings = ensureArray(output.bindings);
  return output;
}

function buildMerged(currentConfig, personalConfig) {
  const current = ensureObject(currentConfig);
  const result = deepClone(current);

  result.agents = ensureObject(result.agents);
  result.agents.defaults = {
    ...ensureObject(current.agents?.defaults),
    ...ensureObject(personalConfig.agents?.defaults),
    model: {
      ...ensureObject(current.agents?.defaults?.model),
      ...ensureObject(personalConfig.agents?.defaults?.model),
    },
    subagents: {
      ...ensureObject(current.agents?.defaults?.subagents),
      ...ensureObject(personalConfig.agents?.defaults?.subagents),
    },
  };

  const existingAgents = ensureArray(current.agents?.list).filter(
    (agent) => !PERSONAL_AGENT_IDS.includes(agent?.id),
  );
  result.agents.list = [...existingAgents, ...ensureArray(personalConfig.agents?.list)];

  const currentTools = ensureObject(current.tools);
  const personalTools = ensureObject(personalConfig.tools);
  result.tools = {
    ...currentTools,
    ...personalTools,
    agentToAgent: {
      ...ensureObject(currentTools.agentToAgent),
      ...ensureObject(personalTools.agentToAgent),
      enabled: true,
      allow: uniqueStrings([
        ...ensureArray(currentTools.agentToAgent?.allow),
        ...ensureArray(personalTools.agentToAgent?.allow),
        ...PERSONAL_AGENT_IDS,
      ]),
    },
    sessions: {
      ...ensureObject(currentTools.sessions),
      ...ensureObject(personalTools.sessions),
    },
  };

  result.messages = {
    ...ensureObject(current.messages),
    ...ensureObject(personalConfig.messages),
  };
  result.commands = {
    ...ensureObject(current.commands),
    ...ensureObject(personalConfig.commands),
  };
  result.session = {
    ...ensureObject(current.session),
    ...ensureObject(personalConfig.session),
  };
  result.hooks = {
    ...ensureObject(current.hooks),
    ...ensureObject(personalConfig.hooks),
    internal: {
      ...ensureObject(current.hooks?.internal),
      ...ensureObject(personalConfig.hooks?.internal),
      entries: {
        ...ensureObject(current.hooks?.internal?.entries),
        ...ensureObject(personalConfig.hooks?.internal?.entries),
      },
    },
  };
  result.bindings = ensureArray(current.bindings);
  return result;
}

function main() {
  const args = readArgs(process.argv.slice(2));
  const templateConfig = readJson(args.template);
  const currentConfig = readJson(args.config, {});
  const modelPrimary = resolveModelPrimary(args.model, currentConfig, templateConfig);
  const standalone = buildStandalone(templateConfig, modelPrimary);

  writeJson(args.output, standalone);
  console.log(`[ok] wrote rendered personal config: ${args.output}`);

  if (args.writeConfig) {
    if (!args.config) {
      throw new Error('Missing --config path while using --write-config.');
    }
    const merged = buildMerged(currentConfig, standalone);
    writeJson(args.config, merged);
    console.log(`[ok] merged personal agents into: ${args.config}`);
  }

  if (modelPrimary === 'REPLACE_WITH_PRIMARY_MODEL') {
    console.log('[warn] primary model is still REPLACE_WITH_PRIMARY_MODEL; pass --model or edit the output before use.');
  } else {
    console.log(`[ok] primary model = ${modelPrimary}`);
  }
}

main();

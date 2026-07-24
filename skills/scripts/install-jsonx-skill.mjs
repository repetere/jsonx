import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SURFACES = new Set(["codex", "claude", "opencode"]);
const SKILLS = new Set(["jsonx", "jsonx-generative-ui", "all"]);
const SCOPES = new Set(["project", "personal"]);

const DEFAULT_TARGETS = {
  codex: {
    project: [".agents", "skills"],
    personal: [os.homedir(), ".agents", "skills"],
  },
  claude: {
    project: [".claude", "skills"],
    personal: [os.homedir(), ".claude", "skills"],
  },
  opencode: {
    project: [".opencode", "skills"],
    personal: [os.homedir(), ".config", "opencode", "skills"],
  },
};

function usage() {
  return `Usage:
  node skills/scripts/install-jsonx-skill.mjs --surface <codex|claude|opencode> --skill <jsonx|jsonx-generative-ui|all> [--scope <project|personal>] [--target <dir>] [--force] [--dry-run]

Examples:
  node skills/scripts/install-jsonx-skill.mjs --surface codex --skill jsonx --scope personal
  node skills/scripts/install-jsonx-skill.mjs --surface claude --skill jsonx-generative-ui --scope project
  node skills/scripts/install-jsonx-skill.mjs --surface opencode --skill all --target /tmp/opencode-skills --dry-run

Options:
  --surface   Agent surface to install for.
  --skill     Skill family to install. Use "all" to install both JSONX skills.
  --scope     Defaults to "personal". Ignored when --target is provided.
  --target    Destination skills directory. The skill folder is copied under this directory.
  --force     Replace an existing destination skill folder.
  --dry-run   Print planned copies without writing files.
  --help      Show this help text.`;
}

function parseArgs(argv) {
  const args = {
    scope: "personal",
    force: false,
    dryRun: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    switch (value) {
      case "--surface":
      case "--skill":
      case "--scope":
      case "--target": {
        const next = argv[index + 1];
        if (!next || next.startsWith("--")) {
          throw new Error(`${value} requires a value`);
        }
        args[value.slice(2)] = next;
        index += 1;
        break;
      }
      case "--force":
        args.force = true;
        break;
      case "--dry-run":
        args.dryRun = true;
        break;
      case "--help":
        args.help = true;
        break;
      default:
        throw new Error(`Unknown option: ${value}`);
    }
  }

  return args;
}

function validateArgs(args) {
  if (args.help) return;
  if (!SURFACES.has(args.surface)) {
    throw new Error("--surface must be one of codex, claude, or opencode");
  }
  if (!SKILLS.has(args.skill)) {
    throw new Error("--skill must be jsonx, jsonx-generative-ui, or all");
  }
  if (!SCOPES.has(args.scope)) {
    throw new Error("--scope must be project or personal");
  }
}

function destinationRoot(args) {
  if (args.target) {
    return path.resolve(args.target);
  }
  return path.resolve(process.cwd(), ...DEFAULT_TARGETS[args.surface][args.scope]);
}

function selectedSkills(skill) {
  return skill === "all" ? ["jsonx", "jsonx-generative-ui"] : [skill];
}

function copySkill({ source, destination, force, dryRun }) {
  if (!fs.existsSync(source)) {
    throw new Error(`Missing source skill: ${source}`);
  }

  if (fs.existsSync(destination)) {
    if (!force) {
      throw new Error(`Destination already exists: ${destination}. Re-run with --force to replace it.`);
    }
    if (!dryRun) {
      fs.rmSync(destination, { recursive: true, force: true });
    }
  }

  if (dryRun) {
    console.log(`would copy ${source} -> ${destination}`);
    return;
  }

  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.cpSync(source, destination, { recursive: true });
  console.log(`installed ${destination}`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(usage());
    return;
  }

  validateArgs(args);

  const scriptPath = fileURLToPath(import.meta.url);
  const repoRoot = path.dirname(path.dirname(path.dirname(scriptPath)));
  const root = destinationRoot(args);

  for (const skill of selectedSkills(args.skill)) {
    copySkill({
      source: path.join(repoRoot, "skills", args.surface, skill),
      destination: path.join(root, skill),
      force: args.force,
      dryRun: args.dryRun,
    });
  }
}

try {
  main();
} catch (error) {
  console.error(error.message);
  console.error("");
  console.error(usage());
  process.exitCode = 1;
}

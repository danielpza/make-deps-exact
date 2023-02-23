#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import { parseArgs } from "node:util";

import detectIndent from "detect-indent";

const HELP = `\
make-deps-exact [...opts]
  --skip-git    skip git+ssh protocol
  -d,--dry      do not write to package.json
  -q,--quiet    do not output changes to console
  -h,--help     show help message
`;

const { values } = parseArgs({
  args: process.argv.slice(2),
  options: {
    "skip-git": {
      type: "boolean",
    },
    dry: {
      type: "boolean",
      short: "d",
    },
    quiet: {
      type: "boolean",
      short: "q",
    },
    help: {
      type: "boolean",
      short: "h",
    },
  },
});

const { ["skip-git"]: skipGit, dry, help, quiet } = values;

if (help) {
  console.log(HELP);
  process.exit(0);
}

const pkgFile = await readFile("package.json", "utf8");
const pkgLockFile = await readFile("package-lock.json", "utf8");

const pkg = JSON.parse(pkgFile);
const pkgLock = JSON.parse(pkgLockFile);

const indent = detectIndent(pkgFile).indent ?? 2;

const modes = ["dependencies", "devDependencies", "optionalDependencies"];

for (const mode of modes) {
  if (!pkg[mode]) continue;
  for (const key in pkg[mode]) {
    /** @type {string} */
    const version = pkg[mode][key];
    /** @type {string} */
    const actual = pkgLock.dependencies[key].version;
    if (skipGit && actual.startsWith("git+ssh://")) continue;
    if (version !== actual) {
      if (!quiet) console.log(`changing ${key} from ${version} to ${actual}`);
      pkg[mode][key] = actual;
    }
  }
}

if (!dry) await writeFile("package.json", JSON.stringify(pkg, null, indent));

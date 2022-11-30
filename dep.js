#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";

const pkg = JSON.parse(await readFile("package.json", "utf8"));
const pkgLock = JSON.parse(await readFile("package-lock.json", "utf8"));

const modes = ["dependencies", "devDependencies", "optionalDependencies"];

for (const mode of modes) {
  if (!pkg[mode]) continue;
  for (const key in pkg[mode]) {
    const version = pkg[mode][key];
    const actual = pkgLock.dependencies[key].version;
    if (version !== actual) {
      // if (!version.match(actual)) {
      console.log(`changing ${key} from ${version} to ${actual}`);
      pkg[mode][key] = actual;
    }
  }
}

await writeFile("package.json", JSON.stringify(pkg, null, 2));

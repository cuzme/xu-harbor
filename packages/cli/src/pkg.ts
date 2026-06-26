import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const currentDir = dirname(fileURLToPath(import.meta.url));
const pkgPath = resolve(currentDir, '../package.json');

interface PackageInfo {
  name: string;
  version: string;
}

const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8')) as PackageInfo;

export const PACKAGE_NAME = pkg.name;
export const PACKAGE_VERSION = pkg.version;

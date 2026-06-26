import semver from 'semver';
import boxen from 'boxen';
import picocolors from 'picocolors';

interface NpmPackageInfo {
  'dist-tags'?: {
    latest?: string;
  };
}

const joinUrl = (registry: string, packageName: string) => {
  const base = registry.endsWith('/') ? registry : `${registry}/`;
  return `${base}${packageName}`;
};

const getNpmPackageLatestVersion = async (
  registry: string,
  packageName: string,
): Promise<string | undefined> => {
  const res = await fetch(joinUrl(registry, packageName));
  if (!res.ok) return undefined;
  const data = (await res.json()) as NpmPackageInfo;
  return data['dist-tags']?.latest;
};

const buildUpgradeNotice = (packageName: string, currentVersion: string, latestVersion: string) => {
  return boxen(
    `${picocolors.yellow('有更新！')}${picocolors.red(currentVersion)} → ${picocolors.green(
      latestVersion,
    )}\n${
      picocolors.dim('运行') +
      picocolors.magenta(` npm i -g ${packageName}@latest `) +
      picocolors.dim('升级到最新版脚手架')
    }`,
    { padding: 1, margin: 1, borderColor: 'cyan', borderStyle: 'round' },
  );
};

/**
 * 检查脚手架是否有新版本。
 * 网络异常 / registry 不可用时静默跳过（不中断主流程）。
 */
export const checkNpmPackageVersion = async (
  registry: string,
  packageName: string,
  currentVersion: string,
): Promise<string | undefined> => {
  try {
    const latestVersion = await getNpmPackageLatestVersion(registry, packageName);
    if (!latestVersion || !semver.valid(latestVersion)) return undefined;
    if (!semver.gt(latestVersion, currentVersion)) return undefined;
    return buildUpgradeNotice(packageName, currentVersion, latestVersion);
  } catch {
    return undefined;
  }
};

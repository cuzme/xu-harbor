import { clone } from '../utils/clone';
import { checkNpmPackageVersion } from '../utils/check';
import { PACKAGE_NAME, PACKAGE_VERSION } from '../pkg';
import { type Template } from '../config';

export const create = async (template: Template, projectName: string, registry: string) => {
  const [, upgradeNotice] = await Promise.all([
    clone(template.gitUrl, projectName, ['-b', template.branch]),
    checkNpmPackageVersion(registry, PACKAGE_NAME, PACKAGE_VERSION),
  ]);
  if (upgradeNotice) console.log(upgradeNotice);
};

import { existsSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
import picocolors from 'picocolors';
import ora from 'ora';
import trash from 'trash';
import { isOverwriteDir } from '../prompt';

export interface CreateDirOptions {
  /** 目标目录已存在时是否强制覆盖 */
  force?: boolean;
}

const spinner = ora();

const trashFile = async (targetDir: string, projectName: string): Promise<boolean> => {
  try {
    spinner.start('删除中...');
    await trash([targetDir]);
    spinner.succeed(`${picocolors.green('成功删除')} ${picocolors.gray(projectName)}`);
  } catch {
    spinner.fail(`${picocolors.red('覆盖失败，请手动删除重名目录')}`);
    process.exit(1);
  }
  return false;
};

/** 判断目标目录是否存在；返回 true 表示应中止后续创建流程 */
export const isExistDir = async (
  projectName: string,
  options: CreateDirOptions,
): Promise<boolean> => {
  const targetDir = join(process.cwd(), projectName);
  if (!existsSync(targetDir)) return false;

  if (options.force) return trashFile(targetDir, projectName);

  const isOverwrite = await isOverwriteDir();
  if (!isOverwrite) {
    console.log(picocolors.green('取消成功'));
    return true;
  }
  return trashFile(targetDir, projectName);
};

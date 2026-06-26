import { rmSync } from 'node:fs';
import { platform } from 'node:os';
import simpleGit, { type SimpleGit, type SimpleGitOptions } from 'simple-git';
import picocolors from 'picocolors';
import createLogger from 'progress-estimator';
import gradientString from 'gradient-string';
import boxen, { type Options as BoxenOptions } from 'boxen';

const WIN_PLATFORM = platform() === 'win32';

const gitOptions: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(),
  binary: 'git',
  maxConcurrentProcesses: 6,
};

const logger = createLogger(
  WIN_PLATFORM
    ? {}
    : {
        spinner: {
          interval: 140,
          frames: ['🚶 ', '🏃 '],
        },
      },
);

const printWelcome = (projectName: string) => {
  const welcomeMessage = gradientString('cyan', 'magenta').multiline(
    'Hello! 欢迎使用 @yobiccc/cli',
  );
  const boxenOptions: BoxenOptions = {
    padding: 1,
    margin: 1,
    borderColor: 'cyan',
    borderStyle: 'round',
  };
  console.log(boxen(welcomeMessage, boxenOptions));
  console.log(` 已成功创建项目 ${picocolors.cyan(projectName)}`);
  console.log(` 运行下面命令将它跑起来\n`);
  console.log(` cd ${picocolors.cyan(projectName)}`);
  console.log(' pnpm install');
  console.log(' pnpm dev\n');
};

export const clone = async (repo: string, projectName: string, options: string[]) => {
  const git: SimpleGit = simpleGit(gitOptions);
  try {
    console.log(`项目下载地址 ${picocolors.cyan(repo)}`);
    const gitCloneFunction = git.clone(repo, projectName, options);
    await logger(gitCloneFunction, '下载耗时：', { estimate: 7000 });
    // 删除 .git 目录，避免继承模板仓库的 git 历史
    rmSync(`./${projectName}/.git`, { recursive: true, force: true });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
  printWelcome(projectName);
};

import cac from 'cac';
import figlet from 'figlet';
import picocolors from 'picocolors';
import { getConfig } from './config';
import { inputProjectName, chooseTemplate } from './prompt';
import { isExistDir } from './create-dir';
import { create } from './template';
import { log } from './utils/log';
import { PACKAGE_VERSION } from './pkg';

interface CreateOptions {
  force?: boolean;
  registry?: string;
}

const cli = cac('yobi').version(PACKAGE_VERSION);

cli
  .command('create', '创建一个新项目')
  .option('-f, --force', '如果目标目录已存在，则强制覆盖')
  .option('--registry <url>', '检查脚手架更新所用的 npm registry')
  .action(async (options: CreateOptions) => {
    const config = await getConfig({ registry: options.registry });
    const projectName = await inputProjectName();
    const isExist = await isExistDir(projectName, { force: options.force });
    if (isExist) return;
    const targetTemplate = await chooseTemplate(config.templates);
    await create(config.templates[targetTemplate], projectName, config.registry);
  });

cli.command('list', '查看所有模板').action(async () => {
  const config = await getConfig();
  Object.entries(config.templates).forEach(([key, value]) => {
    console.log(`${key}: ${value.description}`);
  });
});

cli.help(() => {
  console.log(
    `\r\n${figlet.textSync('yobi', {
      font: '3D-ASCII',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true,
    })}`,
  );
  console.log(`运行 ${picocolors.cyan('yobi <command> --help')} 查看有关命令的详细用法. \r\n`);
});

cli.on('command:*', () => {
  log.error(`无效的命令: ${cli.args.join(' ')}`);
  cli.outputHelp();
  process.exit(1);
});

cli.parse();

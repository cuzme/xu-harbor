import inquirer from 'inquirer';
import { type TemplateMap } from '../config';

export const inputProjectName = async (): Promise<string> => {
  const { projectName } = await inquirer.prompt<{ projectName: string }>([
    {
      type: 'input',
      name: 'projectName',
      message: '请输入项目名称',
      default: 'test-project',
    },
  ]);
  return projectName;
};

export const isOverwriteDir = async (): Promise<boolean> => {
  const { isOverwrite } = await inquirer.prompt<{ isOverwrite: boolean }>([
    {
      name: 'isOverwrite',
      type: 'list',
      message: '目标文件已存在, 请选择一个操作',
      choices: [
        { name: '覆盖(会将之前的同名项目移到本地回收站中)', value: true },
        { name: '取消', value: false },
      ],
    },
  ]);
  return isOverwrite;
};

export const chooseTemplate = async (templates: TemplateMap): Promise<string> => {
  const keys = Object.keys(templates);
  const { template } = await inquirer.prompt<{ template: string }>([
    {
      name: 'template',
      type: 'list',
      message: '请选择一个模板下载',
      choices: keys.map((key) => ({
        name: templates[key].name,
        value: key,
      })),
      default: keys[0],
    },
  ]);
  return template;
};

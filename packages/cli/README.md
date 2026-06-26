# @yobiccc/cli

快速构建前端相关项目的命令行脚手架。

## 安装

```bash
pnpm add -g @yobiccc/cli
```

## 使用

```bash
# 创建一个新项目（交互式输入名称、选择模板）
yobi create

# 已存在同名目录时强制覆盖（旧目录移入回收站）
yobi create --force

# 查看所有可用模板
yobi list

# 查看帮助
yobi --help
```

## 配置

registry 与模板列表均可配置，无需修改源码。

### registry

用于检查脚手架自身是否有新版本，优先级（从高到低）：

1. 命令行 `--registry <url>`
2. 环境变量 `YOBI_CLI_REGISTRY`
3. 配置文件 `registry` 字段
4. 默认值 `https://registry.npmjs.org/`

### 自定义模板

在执行命令的目录下新增 `yobi.cli.config.json` 或 `yobi.cli.config.mjs`，即可扩展或覆盖内置示例模板：

```json
{
  "registry": "https://registry.npmjs.org/",
  "templates": {
    "my-admin": {
      "name": "我的后台模板",
      "description": "内部后台管理项目模板",
      "gitUrl": "git@example.com:group/my-admin.git",
      "branch": "main"
    }
  }
}
```

```js
// yobi.cli.config.mjs
export default {
  templates: {
    'my-admin': {
      name: '我的后台模板',
      description: '内部后台管理项目模板',
      gitUrl: 'git@example.com:group/my-admin.git',
      branch: 'main',
    },
  },
};
```

> 配置文件中的 `templates` 会与内置示例合并；同名 key 以配置文件为准。

## 本地开发

```bash
# 监听构建
pnpm --filter @yobiccc/cli dev

# 构建
pnpm --filter @yobiccc/cli build
```

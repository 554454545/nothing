# 项目规模演进记录

## 当前阶段：轻量全栈 MVP

采用单个 Next.js 应用：

```text
app/       页面和接口
src/       组件、业务逻辑和类型
 db/       D1 迁移
```

不使用 monorepo，不拆分独立 API 服务，不提前引入共享包系统。

## 后续阶段：大型应用结构

当项目出现多个应用或共享包时，再采用大型 monorepo 形式：

```text
project/
├── apps/
│   ├── web/
│   ├── api/
│   └── admin/
├── packages/
│   ├── ui/
│   ├── database/
│   ├── config/
│   └── types/
├── tooling/
├── package.json
└── turbo.json
```

大型结构的特点：

- `apps/` 存放可独立运行或部署的应用。
- `packages/` 存放跨应用共享的 UI、类型、数据库和配置。
- 每个应用保持自己的入口和运行脚本。
- 共享包必须有明确的依赖边界。
- 使用 workspace 或 Turborepo 管理构建和依赖。

## 启用条件

只有出现以下情况时才升级：

- 需要两个以上独立部署的应用。
- 同一组 UI 或类型被多个应用重复使用。
- 单体项目的构建、测试或权限边界已经影响开发。
- 团队协作需要明确的包所有权和依赖边界。

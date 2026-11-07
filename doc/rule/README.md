# Coding Project Rules

本目录保存 `coding/` 项目的长期结构、技术栈和部署规则。

## 规则入口

- [项目结构规则](./nextjs/structure.md)
- 前端设计规范已随页面代码放在 `nextjs/app/(web)/design.md`。
- [Cloudflare 与 D1 规则](./cloudflare/overview.md)
- [项目规模演进记录](./architecture/scale.md)
- [参考项目](./references/projects.md)

## 规则格式

每份规则文档使用以下结构：

1. `目标`：说明规则解决的问题。
2. `当前采用`：说明现在必须遵守的做法。
3. `目录约定`：列出文件和目录职责。
4. `禁止事项`：列出容易造成混乱或破坏兼容性的做法。
5. `升级条件`：说明什么时候可以引入更复杂的结构。
6. `参考来源`：记录参考项目和文档。

当前规则以小型 Next.js 全栈项目为目标，不提前引入大型项目的复杂度。

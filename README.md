# HeyGem.ai 前端应用

## 项目介绍

HeyGem是一个基于Vue 3的前端Web应用，它是一个视频合成工具，能够精确克隆用户的外观和声音，将用户的形象数字化。用户可以通过文本和语音驱动虚拟化身创建视频。

## 技术栈

- **框架**: Vue 3 + TypeScript
- **状态管理**: Pinia
- **路由**: Vue Router
- **UI组件库**: TDesign Vue Next
- **HTTP请求**: Axios
- **国际化**: Vue I18n
- **构建工具**: Vite
- **包管理器**: PNPM

## 开发设置

### 安装PNPM（如果尚未安装）

```bash
npm install -g pnpm
```

### 克隆仓库并安装依赖

```bash
git clone https://github.com/GuijiAI/HeyGem.ai.git
cd HeyGem.ai
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 其他可用脚本

```bash
# 清理dist目录
pnpm clean

# 运行代码检查
pnpm lint

# 格式化代码
pnpm format

# 清洁安装（删除node_modules和锁文件，然后重新安装）
pnpm install:clean
```

## 项目结构

```
src/
├── api/                # API请求相关代码
├── assets/             # 静态资源
├── client/             # 客户端API
├── components/         # 通用组件
├── config/             # 应用配置
├── i18n/               # 国际化文件
├── router/             # 路由配置
├── service/            # 服务层
├── stores/             # Pinia状态管理
├── utils/              # 工具函数
├── views/              # 页面视图
│   ├── account/        # 账户页面
│   ├── home/           # 首页
│   ├── video-edit/     # 视频编辑页面
│   └── voice-management/ # 语音管理页面
├── App.vue             # 根组件
└── main.ts             # 入口文件
```

## 主要功能

- **精准外观和语音克隆**: 使用高级AI算法捕获人脸特征和声音特征
- **文本和语音驱动虚拟化身**: 通过自然语言处理技术理解文本内容，转换为自然流畅的语音来驱动虚拟化身
- **高效视频合成**: 高度同步数字人视频图像与声音，实现自然流畅的口型同步
- **多语言支持**: 支持英语、日语、韩语、中文、法语、德语、阿拉伯语和西班牙语八种语言

## 前端架构

HeyGem前端应用采用Vue 3 + TypeScript开发，遵循组件化和模块化的设计理念。应用使用Pinia进行状态管理，使用Vue Router处理路由，并使用TDesign Vue Next作为UI组件库。

客户端API通过axios与后端服务进行通信，支持多语言国际化，并提供了丰富的用户界面组件。

## 文档

项目包含详细的文档，位于`doc/`目录下：

1. `前端API文档.md`: 详细说明了前端项目中的API接口、参数和使用示例
2. `前端开发指南.md`: 提供了完整的前端开发流程、规范和最佳实践
3. `常见问题.md`: 列出了常见问题及解决方案

## 许可证

本项目采用MIT许可证 - 详见LICENSE文件。

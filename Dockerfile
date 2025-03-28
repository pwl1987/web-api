# 使用官方 Node.js 20 镜像
FROM node:20-alpine

# 设置工作目录
WORKDIR /app

# 先复制包管理文件
COPY package.json pnpm-lock.yaml ./

# 安装 pnpm 并安装依赖
RUN npm config set registry https://registry.npmmirror.com && \
    npm install -g pnpm && \
    pnpm config set registry https://registry.npmmirror.com && \
    pnpm install --frozen-lockfile

# 复制所有源代码
COPY . .

# 暴露 Vite 默认端口
EXPOSE 5173

# 启动命令
CMD ["pnpm", "run", "dev"]
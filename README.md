# 🚀 优势发现互动小应用 - 部署指南

这是一个面向职场人的轻量原型，通过12道问题帮助用户识别6类工作优势倾向。

## 📁 项目结构

```
原型代码0407/
├── src/
│   ├── App.jsx              ← 主应用组件
│   ├── main.jsx             ← 入口文件
│   ├── index.css            ← 全局样式
│   ├── lib/
│   │   └── utils.js         ← 工具函数
│   └── components/
│       └── ui/
│           ├── card.jsx     ← 卡片组件
│           ├── button.jsx   ← 按钮组件
│           ├── progress.jsx ← 进度条组件
│           ├── badge.jsx    ← 标签组件
│           └── textarea.jsx ← 文本域组件
├── index.html               ← HTML入口
├── package.json             ← 项目配置
├── vite.config.js           ← Vite配置
├── tailwind.config.js       ← Tailwind配置
├── postcss.config.js        ← PostCSS配置
└── README.md                ← 本文档
```

## 🎯 本地运行

### 步骤1：安装依赖

```bash
# 进入项目目录
cd "Bella知识库\原型代码0407"

# 安装所有依赖
npm install
```

### 步骤2：启动开发服务器

```bash
npm run dev
```

运行后，打开浏览器访问 http://localhost:5173 即可看到应用。

## ☁️ 部署到Vercel（推荐方式）

### 步骤1：上传到GitHub

1. 登录 GitHub (https://github.com)
2. 点击右上角 "+" → "New repository"
3. 仓库名称填写：`strength-discovery-app`
4. 选择 "Private"（私有）
5. 点击 "Create repository"

**上传代码到GitHub：**

```bash
# 在项目目录中执行
cd "Bella知识库\原型代码0407"

# 初始化Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: 优势发现应用原型"

# 添加远程仓库（替换YOUR_USERNAME为你的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/strength-discovery-app.git

# 推送代码
git branch -M main
git push -u origin main
```

### 步骤2：部署到Vercel

1. 访问 https://vercel.com
2. 使用GitHub账号登录（免费）
3. 点击 "Add New..." → "Project"
4. 选择 "Import Git Repository"
5. 找到并选择 `strength-discovery-app` 仓库
6. Vercel会自动检测到这是Vite项目
7. 点击 "Deploy"

### 步骤3：获得分享链接

部署完成后，Vercel会提供一个类似这样的链接：
```
https://strength-discovery-app.vercel.app
```

把这个链接发给朋友，他们就能直接体验了！**无需注册账号！**

## ✨ 应用功能

- 📊 12道优势测评题
- 🎨 6个维度优势分析
- 📱 响应式设计，支持手机和电脑
- 🌈 美观的动画效果
- 📝 个性化结果反馈

## 🛠️ 技术栈

- React 18
- Vite 5
- Tailwind CSS 3
- Framer Motion
- Lucide Icons
- Radix UI组件

## 💡 后续升级方向

- AI个性化解读
- 更多题库
- 团队版功能
- 用户历史记录
- 报告下载

---

**祝你分享顺利！🎉**

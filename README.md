# 指尖赛车 · Neon Circuit

无依赖的 HTML / CSS / Canvas 2D 静态竞速原型。打开 dist/index.html 即可游玩，也可把 dist 部署到 GitHub Pages、Cloudflare Pages 或其他静态托管平台。

## 操作

- 手机或鼠标：在赛道区域按下并拖动，偏移方向控制车头，偏移距离控制加速度；松手减速。
- 电脑：WASD 或方向键控制方向和加速，空格辅助漂移，Escape 暂停。
- 按顺序经过绿色路标，完成一圈；偏离赛道会减速。
- 三条赛道分别提供计时星级目标；每提升一颗历史最佳星奖励 20 金币，可在车库购买车漆。
- 星星、最好成绩、金币与车漆保存在当前浏览器 localStorage 中。

音效默认关闭，可在右上角开启。触感反馈取决于设备与浏览器是否支持 Vibration API。

## GitHub Pages

将本目录推送到 GitHub，仓库设置中启用 Pages / GitHub Actions。附带工作流会把 dist 作为静态页面部署。部署 URL 由 GitHub 生成。

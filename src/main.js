const Koa = require('koa');

// 导入公用配置
const { APP_PORT } = require('./config/config.default')

const app = new Koa();

app.use((ctx, next) => {
  ctx.body = 'hello world ';
});

// 启动服务
app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`);
});

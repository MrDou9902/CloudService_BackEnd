const Koa = require('koa');
const { koaBody } = require('koa-body')
const userRouter = require('../router/user.route'); // 导入User模块路由

const app = new Koa();

app.use(koaBody());

// 注册路由
app.use(userRouter.routes());

module.exports = app;

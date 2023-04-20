const Koa = require('koa');
const { koaBody } = require('koa-body')
const userRouter = require('../router/user.route'); // 导入User模块路由
const errHandler = require('./errHandler');

const app = new Koa();

app.use(koaBody());

// 注册路由
app.use(userRouter.routes());

// 统一的错误处理
app.on('error', errHandler)

module.exports = app;

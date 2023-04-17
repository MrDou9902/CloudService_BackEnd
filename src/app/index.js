const Koa = require('koa');
const app = new Koa();

// 导入User模块路由
const userRouter = require('../router/user.route')

// 注册路由
app.use(userRouter.routes());

module.exports = app
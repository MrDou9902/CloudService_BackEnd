const path = require('path')

const Koa = require('koa');
const { koaBody } = require('koa-body')
const KoaStatic = require('koa-static')

// const userRouter = require('../router/user.route'); // 导入User模块路由
// const goodsRouter = require('../router/goods.route'); // 导入User模块路由
const errHandler = require('./errHandler');
const router = require('../router')

const app = new Koa();

app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '../upload'),
    keepExtensions: true
  }
}));

// 静态资源路径配置
app.use(KoaStatic(path.join(__dirname, '../upload')))

// 注册路由
app.use(router.routes()).use(router.allowedMethods())

// 统一的错误处理
app.on('error', errHandler)

module.exports = app;

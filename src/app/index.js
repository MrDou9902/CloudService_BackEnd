const path = require('path')

const Koa = require('koa');
const cors = require('koa2-cors');
const { koaBody } = require('koa-body')
const KoaStatic = require('koa-static')
const koaParameter = require('koa-parameter');

// const userRouter = require('../router/user.route'); // 导入User模块路由
// const goodsRouter = require('../router/goods.route'); // 导入User模块路由
const errHandler = require('./errHandler');
const router = require('../router');

const app = new Koa();

app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '../upload'),
    keepExtensions: true
  }
}));

// 配置跨域
app.use(cors())

// 静态资源路径配置
app.use(KoaStatic(path.join(__dirname, '../upload')))

// 参数校验中间件
app.use(koaParameter(app))

// 注册路由
app.use(router.routes()).use(router.allowedMethods())

// 统一的错误处理
app.on('error', errHandler)

module.exports = app;

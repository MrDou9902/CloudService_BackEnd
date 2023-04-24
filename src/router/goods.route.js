const Router = require('koa-router');

const {
  validator
} = require('../middleware/goods.middleware');

const {
  tokenValidate,
  hadAdminPermission,
} = require('../middleware/auth.middleware');

// prefix公共前缀
const router = new Router({ prefix: '/goods' });

const { upload, create, update, search } = require('../controller/goods.controller');

// 图片上传
router.post('/upload', tokenValidate, hadAdminPermission, upload);

// 商品信息上传
router.post('/goodsDetail', tokenValidate, hadAdminPermission, validator, create);

// 修改商品信息
router.post('/updateGoods', tokenValidate, hadAdminPermission, validator, update);

// 查询商品列表
router.get('/getGoodsList', search);

module.exports = router;

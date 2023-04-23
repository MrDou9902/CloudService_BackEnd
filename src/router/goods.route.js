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

const { upload, create } = require('../controller/goods.controller');

// 图片上传
router.post('/upload', tokenValidate, hadAdminPermission, validator, upload);

// 商品信息上传
router.post('/goodsDetail', tokenValidate, hadAdminPermission, validator, create);


module.exports = router;

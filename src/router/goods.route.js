const Router = require('koa-router');

const {
  // userValidator,
  // verifyUser,
  // cryptPassword,
  // verifyLogin,
} = require('../middleware/user.middleware');

const {
  tokenValidate,
  hadAdminPermission,
} = require('../middleware/auth.middleware');

// prefix公共前缀
const router = new Router({ prefix: '/goods' });

const { upload } = require('../controller/goods.controller');

// 图片上传
router.post('/upload', tokenValidate, hadAdminPermission, upload);

module.exports = router;

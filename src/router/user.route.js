const Router = require('koa-router');

const {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyLogin,
} = require('../middleware/user.middleware');

const { tokenValidate } = require('../middleware/auth.middleware');

// prefix公共前缀
const router = new Router({ prefix: '/users' });

const {
  register,
  login,
  updatePassword,
} = require('../controller/user.controller');

// 注册
router.post('/register', userValidator, verifyUser, cryptPassword, register);

// 登录
router.post('/login', userValidator, verifyLogin, login);

// 修改密码
router.post('/updatePassword', cryptPassword, updatePassword);

module.exports = router;

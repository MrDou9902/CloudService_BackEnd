const Router = require('koa-router');

const {
  userValidator,
  verifyUser,
  cryptPassword,
} = require('../middleware/user.middleware');

// prefix公共前缀
const router = new Router({ prefix: '/users' });

const { register, login } = require('../controller/user.controller');

// 注册接口
router.post('/register', userValidator, verifyUser, cryptPassword, register);

// 登录接口
router.post('/login', login);

module.exports = router;

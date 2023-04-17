const Router = require('koa-router');

// prefix公共前缀
const router = new Router({ prefix: '/users' });

const { register, login } = require('../controller/user.controller');

// 注册接口
router.post('/register', register);

// 登录接口
router.post('/login', login)

module.exports = router;

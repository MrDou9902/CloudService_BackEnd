const jwt = require('jsonwebtoken')

const { createUser, getUserInfo } = require('../service/user.service');
const { userRegisterError, userLoginError } = require('../constant/err.type');
const { JWT_SECRET } = require('../config/config.default');
class UserController {
  // 用户注册
  async register(ctx, next) {
    const { user_name, password } = ctx.request.body;
    try {
      const res = await createUser(user_name, password);
      ctx.body = {
        code: 0,
        message: '用户注册成功',
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      };
    } catch (err) {
      ctx.app.emit('error', userRegisterError, ctx, err);
      return;
    }
  }
  // 用户登录
  async login(ctx, next) {
    const { user_name } = ctx.request.body;
    // 在token的payload中记录id，user_name,is_admin
    try {
      // 从返回结果对象中剔除password 
      const {password, ...res} = await getUserInfo({user_name})
      ctx.body = {
        code: 0,
        message: '用户登陆成功',
        result:{
          token: jwt.sign(res, JWT_SECRET, {expiresIn:'1d'})
        }
      }
    } catch(err){
      ctx.app.emit('error', userLoginError, ctx, err);
      return;
    }
  }
}

module.exports = new UserController();

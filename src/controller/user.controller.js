const { createUser } = require('../service/user.service');
class UserController {
  // 用户注册
  async register(ctx, next) {
    const { user_name, password } = ctx.request.body;
    const res = await createUser(user_name, password);
    ctx.body = {
      code : 0,
      message:'用户注册成功',
      result: {
        id: res.id,
        user_name: res.user_name
      }
    }
  }
  // 用户登录
  async login(ctx, next) {
    ctx.body = ctx.request.body;
  }
}

module.exports = new UserController();

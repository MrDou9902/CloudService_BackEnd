const { createUser } = require('../service/user.service');
class UserController {
  // 用户注册
  async register(ctx, next) {
    const { user_name, password } = ctx.request.body;
    const res = await createUser(user_name, password);
    ctx.body = ctx.request.body;
  }
  // 用户登录
  async login(ctx, next) {
    ctx.body = ctx.request.body;
  }
}

module.exports = new UserController();

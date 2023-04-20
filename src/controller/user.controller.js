const { createUser } = require('../service/user.service');
const { userRegisterError } = require('../constant/err.type');
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
      console.error('创建用户错误', err);
      ctx.app.emit('error', userRegisterError, ctx);
      return;
    }
  }
  // 用户登录
  async login(ctx, next) {
    const { user_name } = ctx.request.body;
    ctx.body = {
      code: 0,
      message: `欢迎回来，亲爱的${user_name}`,
      result: ''
    };
  }
}

module.exports = new UserController();

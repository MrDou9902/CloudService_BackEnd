const jwt = require('jsonwebtoken');

const {
  createUser,
  getUserInfo,
  updateUserById,
} = require('../service/user.service');
const {
  userRegisterError,
  userLoginError,
  updatePasswordError,
} = require('../constant/err.type');
const { JWT_SECRET } = require('../config/config.default');
class UserController {
  // 用户注册
  async register(ctx, next) {
    const { user_name, password } = ctx.request.body;
    try {
      const res = await createUser(user_name, password);
      ctx.body = {
        code: 0,
        msg: '用户注册成功',
        data: {
          result: {
            id: res.id,
            user_name: res.user_name,
          },
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
      const { password, ...res } = await getUserInfo({ user_name });
      ctx.body = {
        code: 0,
        message: '用户登陆成功',
        data: {
          result: {
            token: jwt.sign(res, JWT_SECRET, { expiresIn: '10d' }),
          },
        },
      };
    } catch (err) {
      ctx.app.emit('error', userLoginError, ctx, err);
      return;
    }
  }
  // 修改密码
  async updatePassword(ctx, next) {
    try {
      const { password } = ctx.request.body;
      const { id } = ctx.state.user;
      const res = await updateUserById({ id, password });
      if (res) {
        ctx.body = {
          code: 0,
          message: '密码修改成功',
          data:{
            result:''
          }
        };
      } else {
        ctx.app.emit('error', updatePasswordError, ctx, err);
      }
    } catch (err) {
      ctx.app.emit('error', updatePasswordError, ctx, err);
      return;
    }
  }
}

module.exports = new UserController();

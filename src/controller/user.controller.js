const jwt = require('jsonwebtoken');

const {
  createUser,
  updateUserById,
  getUserInfo,
} = require('../service/user.service');
const {
  userRegisterError,
  userLoginError,
  userNotExist,
  updatePasswordError,
} = require('../constant/err.type');
const { JWT_SECRET } = require('../config/config.default');
class UserController {
  // 用户注册
  async register(ctx, next) {
    const { userName, password } = ctx.request.body;
    try {
      const res = await createUser(userName, password);
      ctx.body = {
        code: 0,
        message: '用户注册成功',
        result: {
          id: res.id,
          userName: res.userName,
        },
      };
    } catch (err) {
      ctx.app.emit('error', userRegisterError, ctx, err);
      return;
    }
  }
  // 用户登录
  async login(ctx, next) {
    const { userName } = ctx.request.body;
    // 在token的payload中记录id，userName,is_admin
    try {
      // 从返回结果对象中剔除password
      const { password, ...res } = await getUserInfo({ userName });
      ctx.body = {
        code: 0,
        message: '用户登陆成功',
        result: {
          token: jwt.sign(res, 'doudou', { expiresIn: '10d' }),
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
      const { userName, password } = ctx.request.body;
      const info = await getUserInfo({ userName });
      if (info) {
        const res = await updateUserById({ id: info.id, password });
        if (res) {
          ctx.body = {
            code: 0,
            message: '密码修改成功',
            result: '',
          };
        } else {
          ctx.app.emit('error', updatePasswordError, ctx, ctx.request.body);
        }
      } else {
        ctx.app.emit('error', userNotExist, ctx, ctx.request.body);
      }
    } catch (err) {
      ctx.app.emit('error', updatePasswordError, ctx, err);
      return;
    }
  }
}

module.exports = new UserController();

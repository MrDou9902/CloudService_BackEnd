const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config/config.default');
const {
  tokenExpiredError,
  jsonWebTokenError,
  adminPermissionError
} = require('../constant/err.type');

// token校验
const tokenValidate = async (ctx, next) => {
  const { authorization = '' } = ctx.request.header;
  const token = authorization.replace('Bearer ', '');

  try {
    // 提取token中payload信息
    const user = jwt.verify(token, JWT_SECRET);
    ctx.state.user = user;
  } catch (err) {
    switch (err.name) {
      case 'TokenExpiredError':
        ctx.app.emit('error', tokenExpiredError, ctx, err);
        break;
      case 'JsonWebTokenError':
        ctx.app.emit('error', jsonWebTokenError, ctx, err);
      default:
        break;
    }
  }
  
  await next();
};

// 管理员权限校验
const hadAdminPermission = async (ctx, next) => {
  const { is_admin } = ctx.state.user

  if(!is_admin) {
    ctx.app.emit('error', adminPermissionError, ctx, ctx.state.user);
  }
  
  await next()
}

module.exports = {
  tokenValidate,
  hadAdminPermission
};

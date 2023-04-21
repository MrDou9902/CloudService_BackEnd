const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config/config.default');
const {
  tokenExpiredError,
  jsonWebTokenError,
} = require('../constant/err.type');

const tokenValidate = async (ctx, next) => {
  const { authorization } = ctx.request.header;
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

module.exports = {
  tokenValidate,
};

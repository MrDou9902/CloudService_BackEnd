module.exports = (err, ctx, logError) => {
  let status = 500;
  switch (err.code) {
    case '10001':
      status = 400;
      break;
    case '10002':
      status = 409;
      break;
    default:
      status = 500;
  }
  // 打印错误日志
  console.error(err.message, logError);
  ctx.status = status;
  ctx.body = err;
};

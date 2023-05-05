const app = require('./app');

// 导入公用配置
const { APP_PORT } = require('./config/config.default');

// 启动服务
app.listen(8000, () => {
  console.log(`server is running on http://localhost:8000`);
});

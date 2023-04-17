// 导入公共配置文件包
const dotenv = require('dotenv')

// 执行config方法，读取根目录下.env文件到进程中
dotenv.config()

// 抛出公用配置
module.exports = process.env
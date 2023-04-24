const { DataTypes } = require('sequelize');
const seq = require('../db/seq');

const User = seq.define('user', {
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '用户名，唯一',
    field: 'user_name',
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: '密码',
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '是否是管理员用户,0:否(默认);1:是',
    field: 'is_admin',
  },
});

/*
  首次建表解注下面代码，node运行本文件
*/
// User.sync({ force: true });

module.exports = User;

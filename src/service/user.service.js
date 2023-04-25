const User = require('../model/user.model');
class UserService {
  // User表创建用户
  async createUser(userName, password) {
    const res = await User.create({
      userName,
      password,
    });
    return res;
  }

  // User表查询用户
  async getUserInfo({ id, userName, password, is_admin }) {
    const whereOpt = {};
    id && Object.assign(whereOpt, { id });
    userName && Object.assign(whereOpt, { userName });
    password && Object.assign(whereOpt, { password });
    is_admin && Object.assign(whereOpt, { is_admin });

    const res = await User.findOne({
      attributes: ['id', 'userName', 'password', 'is_admin'],
      where: whereOpt,
    });
    return res ? res.dataValues : null;
  }

  // User表根据id字段更新
  async updateUserById({ id, userName, password, is_admin }) {
    const whereOpt = { id };
    const newObj = {};

    userName && Object.assign(newObj, { userName });
    password && Object.assign(newObj, { password });
    is_admin && Object.assign(newObj, { is_admin });

    const res = await User.update(newObj, {
      where: whereOpt,
    });
    return res[0] > 0 ? true : false;
  }
}

module.exports = new UserService();

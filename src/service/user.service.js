const User = require('../model/user.model');
class UserService {
  // User表创建用户
  async createUser(userName, password, nickName) {
    const res = await User.create({
      userName,
      password,
      nickName,
    });
    return res;
  }

  // User表查询用户
  async getUserInfo({ id, userName, password, isAdmin, nickName }) {
    const whereOpt = {};
    id && Object.assign(whereOpt, { id });
    userName && Object.assign(whereOpt, { userName });
    password && Object.assign(whereOpt, { password });
    isAdmin && Object.assign(whereOpt, { isAdmin });
    nickName && Object.assign(whereOpt, { nickName });

    const res = await User.findOne({
      attributes: ['id', 'userName', 'password', 'isAdmin', 'nickName'],
      where: whereOpt,
    });
    return res ? res.dataValues : null;
  }

  // User表根据id字段更新
  async updateUserById({ id, userName, password, isAdmin }) {
    const whereOpt = { id };
    const newObj = {};

    userName && Object.assign(newObj, { userName });
    password && Object.assign(newObj, { password });
    isAdmin && Object.assign(newObj, { isAdmin });

    const res = await User.update(newObj, {
      where: whereOpt,
    });
    return res[0] > 0 ? true : false;
  }
}

module.exports = new UserService();

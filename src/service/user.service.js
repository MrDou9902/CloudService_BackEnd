const User = require('../model/user.model');
class UserService {
  // User表创建用户
  async createUser(user_name, password) {
    const res = await User.create({
      user_name,
      password,
    });
    return res;
  }

  // User表查询用户
  async getUserInfo({ id, user_name, password, is_admin }) {
    const whereOpt = {};
    id && Object.assign(whereOpt, { id });
    user_name && Object.assign(whereOpt, { user_name });
    password && Object.assign(whereOpt, { password });
    is_admin && Object.assign(whereOpt, { is_admin });

    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'is_admin'],
      where: whereOpt,
    });
    return res ? res.dataValues : null;
  }

  // User表根据id字段更新
  async updateUserById({ id, user_name, password, is_admin }) {
    const whereOpt = { id };
    const newObj = {};

    user_name && Object.assign(newObj, { user_name });
    password && Object.assign(newObj, { password });
    is_admin && Object.assign(newObj, { is_admin });

    const res = await User.update(newObj, {
      where: whereOpt,
    });
    return res[0] > 0 ? true : false;
  }
}

module.exports = new UserService();

const User = require('../model/user.model');
class UserService {
  async createUser(user_name, password) {
    console.log(user_name, password);
    // 插入数据
    const res = await User.create({
      user_name,
      password,
    });
    return res;
  }
}

module.exports = new UserService();

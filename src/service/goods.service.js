const Goods = require('../model/goods.model');

class GoodsService {
  // 商品表插入数据
  async createGoods(goods) {
    const res = await Goods.create(goods);
    return res.dataValues;
  }

  // 商品表更新数据
  async updateGoods(goods) {
    const { id, ...newItem } = goods;
    const res = await Goods.update(newItem, {
      where: { id },
    });
    return res[0] > 0 ? true : false;
  }

  // 根据参数查询商品表数据
  async searchGoods({ page, size }) {
    const res = await Goods.findAndCountAll({
      offset: page * size,
      limit: Number(size),
    });
    return res ? res : [];
  }
}

module.exports = new GoodsService();

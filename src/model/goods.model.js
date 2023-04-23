const { DataTypes } = require('sequelize');
const req = require('../db/seq');

const Goods = req.define('goods', {
  goods_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品名称',
  },
  goods_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '商品价格',
  },
  goods_num: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '商品数量',
  },
  goods_img: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品图片',
  },
});

// Goods.sync({ force: true });

module.exports = Goods
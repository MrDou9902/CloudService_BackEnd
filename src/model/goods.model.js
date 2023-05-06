const { DataTypes } = require('sequelize');
const req = require('../db/seq');

const Goods = req.define('goods', {
  goodsName: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品名称',
    field: 'goods_name',
  },
  goodsPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '商品价格',
    field: 'goods_price',
  },
  goodsNum: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '商品数量',
    field: 'goods_num',
  },
  goodsImg: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品图片',
    field: 'goods_img',
  },
});

/*
  首次建表解注下面代码，node运行本文件
*/
// Goods.sync({ force: true });

module.exports = Goods;

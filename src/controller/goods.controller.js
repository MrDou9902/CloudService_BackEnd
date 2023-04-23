const path = require('path');

const { createGoods, updateGoods } = require('../service/goods.service');

const {
  uploadError,
  uploadTypeError,
  publishGoodsError,
  updateGoodsError,
} = require('../constant/err.type');

class GoodsController {
  async upload(ctx) {
    const { file } = ctx.request.files;
    const validFiletypes = ['image/jpeg', 'image/webp'];
    if (file) {
      if (!validFiletypes.includes(file.mimetype)) {
        return ctx.app.emit('error', uploadTypeError, ctx, file);
      }
      ctx.body = {
        code: 0,
        msg: '商品图片上传成功',
        data: {
          result: {
            goods_img: path.basename(file.filepath),
          },
        },
      };
    } else {
      return ctx.app.emit('error', uploadError, ctx, ctx.request);
    }
  }

  async create(ctx) {
    // 直接调用service的createGoods方法
    try {
      const { createdAt, updatedAt, ...res } = await createGoods(
        ctx.request.body
      );
      ctx.body = {
        code: 0,
        msg: '商品信息上传成功！',
        data: {
          result: res,
        },
      };
    } catch (err) {
      ctx.app.emit('error', publishGoodsError, ctx, err);
    }
  }

  async update(ctx) {
    // 直接调用service的createGoods方法
    try {
      const res = await updateGoods(ctx.request.body);
      if (res) {
        ctx.body = {
          code: 0,
          msg: '商品信息修改成功！',
          data: {
            result: '',
          },
        };
      } else {
        return ctx.app.emit('error', updateGoodsError, ctx, ctx.request.body);
      }
    } catch (err) {
      ctx.app.emit('error', updateGoodsError, ctx, err);
    }
  }
}

module.exports = new GoodsController();

const path = require('path');

const { uploadError, uploadTypeError } = require('../constant/err.type');

class GoodsController {
  async upload(ctx, next) {
    const { file } = ctx.request.files;
    const validFiletypes = ['image/jpeg', 'image/png']
    if (file) {
      if(!validFiletypes.includes(file.mimetype)){
        return ctx.app.emit('error', uploadTypeError, ctx, file)
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
}

module.exports = new GoodsController();

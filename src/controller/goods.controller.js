class GoodsController {
  async upload(ctx, next) {
    ctx.body = '上传成功'
  }
}

module.exports = new GoodsController()
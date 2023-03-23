// 路由模块动态载入中间件
module.exports = options => {
  return async (req, res, next) => {
    // 导入数据库模型
    // 利用inflection模块，将resource转换为模型名
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../models/${modelName}`)
    await next()
  }
}
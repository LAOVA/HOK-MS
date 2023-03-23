// 登录校验中间件
module.exports = options => {
  const AdminUser = require('../models/AdminUser');
  const assert = require('http-assert')
  // 导入token资源
  const jwt = require('jsonwebtoken')
  const { key } = require('../key')

  return async (req, res, next) => {
    // 设置token验证
    const token = String(req.headers.authorization || '').split(' ').pop()
    if (token == 'undefined') {
      // 验证缓存中有无token
      assert(!token, 401, '请先登录')
      return
    }
    // 解析token
    const { id } = jwt.verify(token, key)
    // 挂载到req上
    req.user = await AdminUser.findById(id)
    assert(req.user, 401, '请重新登录')
    // if (!user) {
    //   return res.status(422).send({
    //     message: '用户不存在'
    //   })
    // }
    await next()
  }
}
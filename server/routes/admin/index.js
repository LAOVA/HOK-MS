const AdminUser = require('../../models/AdminUser');
const assert = require('http-assert')

module.exports = app => {
  const express = require('express');
  // 创建路由
  const router = express.Router({
    // 保留父路由器的req.params值。如果父项和子项的参数名有冲突，则子项的值优先。
    mergeParams: true
  });

  // 导入token资源
  const jwt = require('jsonwebtoken')
  const { key } = require('../../key')

  // 配置接口
  // 新建分类
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 修改分类
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 删除分类
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })
  // 获取分类
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      // 通过设置populate来关联父级关系，通过parent的值作为id来查询
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })
  // 查询分类
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  // 挂载rest路由
  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    // 设置验证中间件
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
  }, (req, res, next) => {
    // 导入数据库模型
    // 利用inflection模块，将resource转换为模型名
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

  // 挂载upload路由
  // 引入multer模块，主要应用于图片或文件的上传
  // 上传到指定目录下
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  // 挂载login路由
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 查找用户
    const user = await AdminUser.findOne({ username })
    assert(user, 422, '用户不存在')
    // if (!user) {
    //   return res.status(422).send({
    //     message: '用户不存在'
    //   })
    // }
    // 校验密码
    // 利用bcrypthon模块，对密码进行检验
    let isValid
    if (password) {
      isValid = require('bcryptjs').compareSync(password, user.password)
    } else {
      assert(isValid, 422, '密码不能为空')
    }
    assert(isValid, 422, '账号或密码错误')
    // if (!isValid) {
    //   return res.status(422).send({
    //     message: '账号或密码错误'
    //   })
    // }
    // 返回token
    const token = jwt.sign({ id: user._id, }, key)
    res.send({ token })
  })

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}
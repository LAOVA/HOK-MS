module.exports = app => {
  const express = require('express');
  const AdminUser = require('../../models/AdminUser');
  const assert = require('http-assert')
  // 导入token资源
  const jwt = require('jsonwebtoken')
  const { key } = require('../../key')
  // 创建路由
  const router = express.Router({
    // 保留父路由器的req.params值。如果父项和子项的参数名有冲突，则子项的值优先。
    mergeParams: true
  });



  // 设置登录校验中间件
  const authUser = require('../../middleware/authUser')()

  // 设置路由模块动态载入中间件
  const authResource = require('../../middleware/authResource')()


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
    const items = await req.Model.find().setOptions(queryOptions).limit(100)
    res.send(items)
  })
  // 查询分类
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  // 挂载rest路由
  app.use('/admin/api/rest/:resource', authUser, authResource, router)

  // 挂载upload路由
  // 引入multer模块，主要应用于图片或文件的上传
  // 上传到指定目录下
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/upload', authUser, upload.single('file'), async (req, res) => {
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
    // 利用bcrypthon模块，对密码进行检验
    let isValid
    if (password) {
      isValid = require('bcryptjs').compareSync(password, user.password)
    } else {
      assert(isValid, 422, '密码不能为空')
    }
    assert(isValid, 422, '账号或密码错误')
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
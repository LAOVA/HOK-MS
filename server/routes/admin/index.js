module.exports = app => {
  const express = require('express');
  // 创建路由
  const router = express.Router({
    // 保留父路由器的req.params值。如果父项和子项的参数名有冲突，则子项的值优先。
    mergeParams: true
  });

  // 配置接口
  // 新建分类
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
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

  // 挂载路由
  app.use('/admin/api/rest/:resource', (req, res, next) => {
    // 导入数据库模型
    // 利用inflection模块，将resource转换为模型名
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

  // 引入multer模块，主要应用于图片或文件的上传
  // 上传到指定目录下
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
}
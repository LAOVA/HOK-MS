module.exports = app => {
  const mongoose = require("mongoose")
  mongoose.connect('mongodb://127.0.0.1:27017/HOK-MS', {
    useNewUrlParser: true
  })

  // 引入models所有模型
  require('require-all')(__dirname + '/../models')
}
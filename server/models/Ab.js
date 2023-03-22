// 装备数据表
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  items: [{
    image: { type: String },
    url: { type: String }
  }]
})

module.exports = mongoose.model('Ab', schema)
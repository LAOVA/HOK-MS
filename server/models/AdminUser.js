// 装备数据表
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    // 设置密码不显示
    select: false,
    set(val) {
      // 进行散列加密
      return require('bcryptjs').hashSync(val, 10)
    }
  },
})

module.exports = mongoose.model('AdminUser', schema)
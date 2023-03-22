const express = require('express');
const app = express()

// 配置中间件
app.use(require('cors')()) //解决跨域
app.use(express.json()) //解析json格式

// 传递app对象
require('./routes/admin')(app)
require('./plugins/db')(app)

app.listen(3000, () => {
  console.log('http://localhost:3000 is running')
});
const express = require('express');
const app = express()

// 配置中间件
app.use(require('cors')()) //解决跨域
app.use(express.json()) //解析json格式
// 指定“./uploads”文件可以同过/upload来进行访问
app.use('/uploads', express.static(__dirname + '/uploads'))


// 传递app对象
require('./routes/admin')(app)
require('./plugins/db')(app)
require('./routes/web')(app)

app.listen(3000, () => {
  console.log('http://localhost:3000 is running')
});
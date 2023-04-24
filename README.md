# HOK-MS 王者荣耀官网镜像



## 目录结构

```markdown
# HOK-MS

├─ admin  //后台管理界面
│  ├─ .env.development
│  ├─ .eslintrc.js
│  ├─ babel.config.js
│  ├─ jsconfig.json
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.ico
│  │  └─ index.html
│  ├─ README.md
│  ├─ src
│  │  ├─ App.vue
│  │  ├─ assets
│  │  │  ├─ images
│  │  │  └─ logo.png
│  │  ├─ components
│  │  ├─ http.js
│  │  ├─ main.js
│  │  ├─ plugins
│  │  │  └─ element.js
│  │  ├─ router
│  │  │  └─ index.js
│  │  ├─ style.css
│  │  └─ views
│  │   ├─ AdEdit.vue
│  │   ├─ AdList.vue
│  │   ├─ AdminUserEdit.vue
│  │   ├─ AdminUserList.vue
│  │   ├─ ArticleEdit.vue
│  │   ├─ ArticleList.vue
│  │   ├─ CategoryEdit.vue
│  │   ├─ CategoryList.vue
│  │   ├─ HeroEdit.vue
│  │   ├─ HeroList.vue
│  │   ├─ ItemEdit.vue
│  │   ├─ ItemList.vue
│  │   ├─ Login.vue
│  │   └─ Main.vue
│  └─ vue.config.js

├─ server  //接口服务
│  ├─ admin
│  ├─ index.js
│  ├─ key.js
│  ├─ middleware
│  │  ├─ authResource.js
│  │  └─ authUser.js
│  ├─ models
│  │  ├─ Ab.js
│  │  ├─ AdminUser.js
│  │  ├─ Article.js
│  │  ├─ Category.js
│  │  ├─ Hero.js
│  │  └─ Item.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ plugins
│  │  └─ db.js
│  ├─ routes
│  │  ├─ admin
│  │  │  └─ index.js
│  │  └─ web
│  │   └─ index.js
│  ├─ uploads
│  └─ web

├─  web  //移动web界面
│  ├─ .env.development
│  ├─ .eslintrc.js
│  ├─ babel.config.js
│  ├─ dist
│  ├─ jsconfig.json
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.ico
│  │  └─ index.html
│  ├─ README.md
│  ├─ src
│  │  ├─ App.vue
│  │  ├─ assets
│  │  │  ├─ iconfont
│  │  │  ├─ images
│  │  │  ├─ index.png
│  │  │  └─ logo.png
│  │  ├─ components
│  │  │  ├─ Card.vue
│  │  │  └─ ListCard.vue
│  │  ├─ main.js
│  │  ├─ router
│  │  │  └─ index.js
│  │  ├─ style.scss
│  │  └─ views
│  │   ├─ Article.vue
│  │   ├─ Hero.vue
│  │   ├─ Home.vue
│  │   └─ Main.vue
│  └─ vue.config.js
```



## 以下是前后端核心操作

## 后台管理

### 创建基础的前端数据接口

#### admin\http.js

**创建axios实例，用于建立本地服务器**

```js
import axios from "axios";

const http = axios.create({
  // baseURL: 'http://localhost:300/admin/api'
  baseURL: process.env.VUE_APP_API_URL || '/admin/api'
})

export default http;
```

#### admin\main.js

在全局的Vue实例中中挂载http

```js
// 导入http
import http from './http'
Vue.prototype.$http = http
```

#### admin\src\views\CategoryEdit.vue

```js
export default 
  data() {
    return {
      model: {},
    }
  },
  methods: {
    async save() {
      // 新建分类
      const res await this.$http.post('/rest/categories', this.model)
      }
      // 跳转到展示页面
      this.$router.push('/categories/list')
      // 跳出网页弹窗提示
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
}
```



### 创建app服务

#### server\index.js

```js
const express = require('express');
const app = express()

// 配置中间件
app.use(require('cors')()) //解决跨域
app.use(express.json()) //解析json格式

app.listen(3000, () => {
  console.log('http://localhost:3000 is running')
});
```



### 创建基础的后端数据接口

#### server\routes\admin\index.js

```js
module.exports = app => {
  //导入express，创建后台路由对象
  const express = require('express');
  const router = express.Router()
  
  //导入数据库表模型
  const Category = require('../../models/Category');
  
  // 配置路由规则
  // 新建分类
  router.post('/categories', async (req, res) => {
     //使用create来在数据表中创建一个新的数据文档
    const model = await req.Category.create(req.body)
    res.send(model)
  })
    
  //将路由规则挂载到接口上(使用app.use...而不使用app.post...是为了能够复用“/admin/api”接口前缀地址)
  app.use('/admin/api',router)
}
```

#### server\index.js

```js
const express = require('express');
const app = express()

// 通过require来引入被抛出的函数，并传递app对象
require('./routes/admin')(app)
```

#### plugins\db.js

```js
module.exports = app => {
  // 引入mongoose数据库工具对象
  const mongoose = require("mongoose")
  //连接mongoDB
  mongoose.connect('mongodb://127.0.0.1:27017/HOK-MS', {
    useNewUrlParser: true
  })

  // 引入models所有模型
  require('require-all')(__dirname + '/../models')
}
```

#### models\Category.js

```js
// 引入mongooseg工具
const mongoose = require('mongoose')
//建立数据表，并添加字段
const schema = new mongoose.Schema({
  name: {
    type: String
  }
})
//导出成Category数据库模型
module.exports = mongoose.model('Category', schema)
```



### 通用CRUD接口配置

> 1. 将app.use('/admin/api' router)，改为：app.use('/admin/api/rest/:resource', router)，接收resource动态模型（建议将通用接口加上一个rest前缀）；
> 2. router的接口中去掉原本的静态模型参数；
> 3. npm i inflection，inflection模块用于处理单复数、大小写转化，用它来转换接口上面的“resource”参数，将其转化为数据库模块名，如将categories转化为Category；
> 4. 将转换规则封装成中间件module，通过require('../../middleware/authResource')()来导入并获取module返回的中间件函数，最后加入到app.use()中。

#### server\routes\admin\index.js

```js
module.exports = app => {
  // 创建路由
  const router = express.Router({
    // 将父路由器url参数的req.params值（即：app.use('/admin/api/rest/:resource', router)中的":resource"，合并到router里面路由的参数req.params中。
    mergeParams: true
  });
    
  // 设置路由模块动态载入中间件
  const authResource = require('../../middleware/authResource')()
  
  // 配置接口
  // 新建分类
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
    
  // 获取分类
  router.get('/', async (req, res) => {
    const queryOptions = {}
    // 判断当前url请求的模型的模型名字是否为Category，是则进行关联查询，否则表示是其他模型，不需要进行关联查询（只有Category需要关联查询）
    if (req.Model.modelName === 'Category') {
      // 通过设置populate来关联父级关系，通过parent的值作为id来查询
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(100)
    res.send(items)
  })
    
  // 挂载rest路由
  app.use('/admin/api/rest/:resource', authResource, router)
}
```

#### server\middleware\authResource.js

```js
// 路由模块动态载入中间件，options充当默认参数，不用传值
module.exports = options => {
    // 返回中间件函数
  return async (req, res, next) => {
    // 导入数据库模型
    // 利用inflection模块，将resource转换为模型名（小写转大写、复数转单数）
    const modelName = require('inflection').classify(req.params.resource)
    // 将转换得到的模型挂载到req上
    req.Model = require(`../models/${modelName}`)
    await next()
  }
}
```



### 设置图片上传与回显

> 1. 在el-upload标签中，添加图片上传地址action属性，以及添加上传成功的回调方法属性on-success；
> 2. 在后台服务器设置文件上传路由；
> 3. 引入multer模块，主要应用于图片或文件的上传；
> 4. 设置上传中间件，配置上传目标地址“绝对地址 + /../../upload”；
> 5. 在后台index.js中配置托管静态文件；
> 6. 在前端页面中获取图片url地址，对已有属性进行赋值；
> 7. 列表显示图片：设置在el-table-column表格中自定义显示内容（默认是显示字符串）。

#### admin\src\views\ItemEdit.vue

```html
<el-upload class="avatar-uploader" :action="$http.defaluts.baseURL + '/upload'" :show-file-list="false" :on-success="afterUpload" :headers="getAuthHeaders()">
     <img v-if="model.icon" :src="model.icon" class="avatar">
     <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
```

```js
export default {
  props: ['id'],
  data() {
    return {
      model: {
        name: '',
        icon: ''
      }
    }
  },
  methods: {
    afterUpload(res) {
      this.$set(this.model,'icon',res.url)
      // this.model.icon = res.url
    },
  }
}
```

#### server\routes\admin\index.js

```js
module.exports = app => {
  const express = require('express');
  const AdminUser = require('../../models/AdminUser');
  const assert = require('http-assert')
  // 导入token资源
  const jwt = require('jsonwebtoken')
  const { key } = require('../../key')
  // 创建路由
  const router = express.Router({
    // 将父路由器url参数的req.params值（即：app.use('/admin/api/rest/:resource', router)中的":resource"，合并到router里面路由的参数req.params中。
    mergeParams: true
  });

  // 设置登录校验中间件
  const authUser = require('../../middleware/authUser')()

  // 设置路由模块动态载入中间件
  const authResource = require('../../middleware/authResource')()

  // 挂载upload路由
  // 引入multer模块，主要应用于图片或文件的上传
  // 上传到指定目录下
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  // upload.single('file')表示在upload文件中间件接收单个文件
  app.post('/admin/api/upload', authUser, upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
}
```

#### server\index.js

```js
// 指定“./uploads”的文件可以通过/upload来进行访问
app.use('/uploads', express.static(__dirname + '/uploads'))
```

#### admin\src\views\ItemList.vue

```html
<template slot-scope="scope">
    <img :src="scope.row.icon" alt="" style="height:3rem">
</template>
```



###  利用JWT机制进行用户认证与校验

> 1. 利用bcryptjs进行密码加密；
>
> 2. 设置server.key.js来抛出密钥；
>
> 3. 用户登录时，在路由上面进行数据库查询，校验用户名密码；
>
> 4. 使用bcryptjs来检验密码是否正确，正确则返回token（token是使用jwt和key密钥进行加密计算）；
>
> 5. 在后台页面admin.http.js中设置请求拦截，给所有api请求加上token请求头（作用：前端权限检查可直接通过检查本地token；但后端若要进行权限检查，就要靠检查请求api的请求头中的token）。
>
> 6. 封装authUser.js用户校验中间件，用于后端校验api请求头部是否含有正确的token；
>
> 7. 将中间件规则挂载到app.use()上面；
>
> 8. 使用http.assert包来判别请求条件是否得到满足，并抛出状态码和返回信息：
>
>     assert(布尔条件, 状态码, '信息')；
>
> 9. 在后台页面admin.http.js设置响应拦截，获取assert返回的res信息并进行相应拦截处理。
>
> 10. 上面仅是设置接口的访问限制，以下是设置客户端页面路由限制：在admin.router.index.js中设置页面标识，并配置路由全局前置守卫。
>
> 11. 针对el-upload进行权限设置，现在后台api路由接口也加上authUser验证中间件，再对前端页面el-upload标签进行headers属性设置（可通过在admin.main.js中设置全局混入，来配置）

#### server\moudels\AdminUser.js

```js
// 用户数据表
const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    // 设置密码不可查
    select: false,
    set(val) {
      // 利用bcryptjs，进行hash散列加密
      return require('bcryptjs').hashSync(val, 10)
    }
  },
})

```

#### server\key\js

```js
exports.key = '******'
```

#### server\routes\admin\index.js

```js
module.exports = app => {
  const express = require('express');
  const AdminUser = require('../../models/AdminUser');
  const assert = require('http-assert')
  
  const router = express.Router();
  
  // 导入token资源
  const jwt = require('jsonwebtoken')
  const { key } = require('../../key')
  
  
  // 设置登录校验中间件
  const authUser = require('../../middleware/authUser')()
  // 设置路由模块动态载入中间件
  const authResource = require('../../middleware/authResource')()
  
  // 挂载login路由
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 查找用户并取出密码（防止user默认不取出密码）
    const user = await AdminUser.findOne({ username }).select('+password')
    assert(user, 422, '用户不存在')
    // 利用bcrypt模块，对密码进行检验
    let isValid
    if (password) {
      // 使用bcryptjs来对明文和密文进行配对，返回的是个布尔值
      isValid = require('bcryptjs').compareSync(password, user.password)
    } else {
      assert(isValid, 422, '密码不能为空')
    }
    assert(isValid, 422, '账号或密码错误')
    // 登录成功，返回token（含id加密信息）
    const token = jwt.sign({ id: user._id, }, key)
    res.send({ token })
  })

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
    
  // 挂载rest路由
  app.use('/admin/api/rest/:resource', authUser, authResource, router)
}
```

#### admin\src\http.js

```js
import axios from "axios";
import Vue from "vue";
import router from "./router";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/admin/api'
})

// 设置请求拦截器，添加请求头Authorization
http.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer ' + localStorage.token
  return config
}, error => {
  return Promise.reject(error)
})

// 设置响应拦截器，检验校验码并输出
http.interceptors.response.use(res => {
  return res
}, err => {
  // "$message"是ElementUI的方法，将其挂载到Vue原型
  Vue.prototype.$message({
    type: 'error',
    message: err.response.data.message// 输出错误信息
  })

  // 如果状态码为401，则跳转到登录界面
  if (err.response.status == 401) {
    router.push('/login')
  }

  return Promise.reject(err)
})

export default http;
```

#### admin\src\views\Login.vue

```js
 methods: {
    async login() {
      const res = await this.$http.post('/login', this.modle)
      // 缓存token
      localStorage.token = res.data.token
      // 跳转页面
      this.$router.push('/')
      this.$message({
        type: 'success',
        message: '登录成功'
      })
    }
  }
```

#### admin\router\index.js

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import ItemList from '../views/ItemList.vue'
import ItemEdit from '../views/ItemEdit.vue'
import HeroList from '../views/HeroList.vue'
import HeroEdit from '../views/HeroEdit.vue'
import ArticleList from '../views/ArticleList.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import AdList from '../views/AdList.vue'
import AdEdit from '../views/AdEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'
import AdminUserEdit from '../views/AdminUserEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { notAuth: true }  //设置免检标识
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoryEdit, },
      { path: '/categories/list', component: CategoryList, },
      {
        path: '/categories/edit/:id', component: CategoryEdit,props:true
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 设置全局前置守卫
router.beforeEach((to, from, next) => {
    // “to”表示目标页面路由，如果目标路由没有免检标识而且缓存中没token，则跳转到登录界面
  if (!to.meta.notAuth && !localStorage.token) {
    // 重定向到登录页面
    return next('/login')
  }
  next()
})

export default router
```

#### admin\main.js

```js
// 设置混入（全局可用的代码块）
Vue.mixin({
  // 1.computed是响应式的，methods并非响应式。
  // 2.调用方式不一样，computed定义的成员像属性一样访问，methods定义的成员必须以函数形式调用。
  // 3.computed是带缓存的，只有其引用的响应式属性发生改变时才会重新计算，而methods里的函数在每次调用时都要执行（调用时实时更新）。
  computed: {
    getuploadUrl() {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token}`
      }
    }
  }
})
```

#### admin\src\views\ItemEdit.vue

```html
<el-upload class="avatar-uploader" :action="getuploadUrl" :show-file-list="false" :on-success="afterUpload" :headers="getAuthHeaders()">
     <img v-if="model.icon" :src="model.icon" class="avatar">
     <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
```





## 前台展示

### 创建基础展示页面

#### admin\src\views

（新建页面vue文件）

#### admin\src\router\index.js

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'

// 挂载页面路由
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoryEdit, },
      { path: '/categories/list', component: CategoryList, },
      {
        path: '/categories/edit/:id', component: CategoryEdit, props: true
      }
    ]
  }
]

// 创建页面路由实例
const router = new VueRouter({
  routes
})

// 导出页面路由
export default router
```



### 实现css原子化

#### 安装sass预处理器

```powershell
npm i -D sass sass-loader
```

#### 样式重置

```scss
* {
  box-sizing: border-box;  // 设置怪异盒子模型
  outline: none;  // 消除Tab切换高亮
}

html {
  font-size: 13px;  // 统一全局文字基础大小
}

body {
  margin: 0;  // 取消外边距
  font-family: Arial,
    Helvetica,
    sans-serif;
  line-height: 1.2em;
  background: #f1f1f1
}

a {
  color: #999
}

p {
  line-height: 1.5rem
}
```

#### 变量定义

```scss
// 颜色
$colors: (
  'primary': #db9e3f,
  'info':#4b67af,
  "white":#fff,
  "white-1":#fcfcfc,
  "white-2":#eceef0,
  "light" : #f9f9f9,
  "light-1" : #d4d9de,
  "grey" :#999,
  "grey-1" :#666,
  "dark-1":#343440,
  "dark" :#222,
  "black" :#000,
  'blue':#4394e4,
  'danger':rgb(221, 0, 27)
);

@each $colorKey,$color in $colors {
  .text-#{$colorKey} {
    color: $color
  }

  .bg-#{$colorKey} {
    background-color: $color
  }
}


// nav
.nav {
  display: flex;
    
  .nav-item {
    border-bottom: 3.0004px solid transparent;
    padding-bottom: .2rem;
    color: map-get($map: $colors, $key: 'primary');

    &.active {
      border-bottom: 3.0004px solid map-get($map: $colors, $key: 'primary');
    }
  }
    
  &.nav-inverse {
    .nav-item {
      color: map-get($map: $colors, $key: 'white');

      &.active {
        border-bottom: 3.0004px solid map-get($map: $colors, $key: 'white');
      }
    }
  }
}
```



### 利用插槽进行组件嵌套封装

> 1. 创建Cart组件和ListCart组件；
> 2. 在main.js中注册两个组件，并设置组件名；
> 3. 在Cart组件设置插槽，来接收来自ListCart组件的内容；
> 4. 在ListCart组件设置插槽，来接收来自主页面的内容；
> 5. 页面引入ListCart组件，并传递参数以及插槽内容；
> 6. 在ListCart组件中引入Cart组件，并传递插槽内容；
> 7. 最终实现主页面插入ListCart，ListCart插入Cart，获得一个完整的卡片组件。

src\components\Cart.vue

```vue
<template>
  <div class="card bg-white p-3 mt-3">
    <div class="card-header d-flex" :class="{ 'border-bottom': !plain, 'pb-3': !plain }">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xl flex-1 px-2" :class="{ 'fs-900': plain }">{{ title }}</div>
      <i class="iconfont icon-menu" v-if="!plain"></i>
    </div>
    <div class="card-body pt-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  // 接收父组件传来的参数
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    plain: { type: Boolean },
  }
}
</script>

<style lang="scss">
@import '../style.scss';

.card {
  border-bottom: 1px solid $border-color;
}
</style>
```

src\components\ListCart.vue

```vue
<template>
  <my-card :icon="icon" :title="title">
    <div class="nav jc-between">
      <div class="nav-item" :class="{ active: active === index }" v-for="(category, index) in categories" :key="index"
        @click="$refs.list.swiper.slideTo(index)">
        <div class="nav-link">{{ category.name }}</div>
      </div>
    </div>
    <div class="pt-3">
      <swiper ref="list" @slide-change="() => active = $refs.list.swiper.realIndex" :options="{ autoHeight: true }">
        <swiper-slide v-for="(category, i) in categories" :key="i">
          <slot name="content" :items="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </my-card>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    categories: { type: Array, required: true },
  },
  data() {
    return {
      active: 0
    }
  },
  methods: {
    Alert(res) {
      console.log(res);
    }
  }
}
</script>

<style></style>
```

src\main.js

```js
// 导入组件
import Card from './components/Card.vue'
Vue.component('my-card', Card)
import ListCard from './components/ListCard.vue'
Vue.component('my-listcard', ListCard)
```

src\views\Home.vue

```vue
    <!-- 新闻资讯 -->
    <my-listcard icon="cc-menu-circle" title="新闻资讯" :categories="news">
      <template #content="obj">
        <div class="py-2 fs-lg " v-for="(item, i) in obj.items.list" :key="i">
          <router-link tag="div" :to="`/articles/${item._id}`" class="d-flex">
            <span class="text-primary mr-2 label fs-xxs px-1">{{ obj.items.name }}</span>
            <span class="flex-1 text-dark-1 pr-1 text-ellipse" style="line-height:1.2308rem">{{ item.title }}</span>
            <span class="text-grey-1 fs-sm">{{ item.createdAt | date }}</span>
          </router-link>
        </div>

      </template>
    </my-listcard>

    <!-- 英雄列表 -->
    <my-listcard icon="cc-menu-circle" title="英雄列表" :categories="heroes">
      <template #content="obj">
        <div class="d-flex flex-wrap" style="margin:0 -0.4rem">
          <div class="px-2 fs-lg text-center py-2" style="width:20%" v-for="(item, i) in obj.items.list" :key="i">
            <router-link tag="div" :to="`/heroes/${item._id}`">
              <img :src="item.avatar" class="w-100">
              <div>{{ item.name }}</div>
            </router-link>
          </div>
        </div>
      </template>
    </my-listcard>
```



### 页面优化

#### 小图片base64编码

```js
<input type="file" id="fileInput">
<script>
  const fileInput = document.getElementById('fileInput')
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64 = reader.result
      console.log(base64)
    }
  })
</script>
```



#### 大图片懒加载

```js
<!-- 将图片的真实地址存储在data-src属性中 -->
<img data-src="../assets/images/img.jpg" alt="image">

<script>
  // 获取所有需要懒加载的图片元素
  const images = document.querySelectorAll('img[data-src]');

  // 创建IntersectionObserver实例
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      // 如果图片进入视口，则将data-src赋给src
      if (entry.isIntersecting) {
        const image = entry.target;
        image.src = image.dataset.src;
        observer.unobserve(image); // 停止监听该图片
      }
    });
  });

  // 开始监听所有需要懒加载的图片元素
  images.forEach(image => observer.observe(image));
</script>

```


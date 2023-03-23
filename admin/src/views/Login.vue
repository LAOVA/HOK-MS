<template>
  <div class="login-container">
    <el-card header="请先登录" class="card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="modle.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="modle.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modle: {}
    }
  },
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
}
</script>

<style lang="less" >
.login-container {
  .card {
    width: 30rem;
    margin: 10rem auto;
  }
}
</style>
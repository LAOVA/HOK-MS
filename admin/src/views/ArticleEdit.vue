<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 导入富文本编辑器
import { VueEditor } from "vue2-editor";
export default {
  props: ['id'],
  components: {
    VueEditor
  },
  data() {
    return {
      model: {},
      categories: []
    }
  },
  created() {
    this.fetchCategories()
    this.id && this.fetch()
  },
  methods: {
    async save() {
      let res
      if (this.id) {
        // 修改
        res = await this.$http.put(`/rest/articles/${this.id}`, this.model)
      } else {
        // 新建
        await this.$http.post('/rest/articles', this.model)
      }
      this.$router.push('/articles/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch() {
      let res = await this.$http.get(`/rest/articles/${this.id}`)
      this.model = res.data
    },
    async fetchCategories() {
      let res = await this.$http.get(`/rest/categories`)
      this.categories = res.data
    },
    // 上传图片到文章，解决富文本编辑器自带的base64格式而导致文件过大的问题
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("file", file);
      // 拿到图片的本地url地址
      const res = await this.$http.post('upload', formData)
      // 插入富文本编辑器
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    }
  }
}

</script>

<style></style>
<template>
  <div class="page-article" v-if="model">
    <div class="d-flex p-2  border-bottom">
      <strong class="flex-1 text-blue fs-lg">&lt; {{ model.title }}</strong>
      <div class="text-grey fs-sm"> {{ model.createdAt | date }}
      </div>
    </div>
    <div v-html="model.body" class="px-3 fs-xl body"></div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    id: {
      require: true
    }
  },
  data() {
    return {
      model: null
    }
  },
  filters: {
    date(val) {
      return dayjs(val).format('MM/DD')
    }
  },
  created() {
    this.fetchArticle()
  },
  methods: {
    async fetchArticle() {
      const res = await this.$http.get(`/articles/${this.id}`)
      this.model = res.data
    }
  }
}
</script>

<style lang="scss">
.page-article {
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>
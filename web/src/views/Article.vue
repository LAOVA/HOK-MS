<template>
  <div class="page-article" v-if="model">
    <div class="d-flex p-2  border-bottom">
      <router-link tag="div" to="/" class="flex-1">
        <strong class="text-blue fs-lg">&lt; {{ model.title }}</strong>
      </router-link>
      <div class="text-grey fs-sm"> {{ model.createdAt | date }}
      </div>
    </div>
    <div v-html="model.body" class="px-3 fs-xl body"></div>
    <div class="share"></div>
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

  .share {
    width: 3rem;
    height: 3rem;
    position: fixed;
    right: 0.2rem;
    top: 9.09rem;
    background: url(../assets/images/share-icon.png) no-repeat;
    background-size: contain;
    z-index: 99;
  }
}
</style>
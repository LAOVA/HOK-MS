<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black py-2 px-3 text-white d-flex ai-center">
      <img src="../assets/logo.png" height="30">
      <div class="px-2 flex-1">
        <span>王者荣耀</span>
        <span class="ml-3">攻略站</span>
      </div>
      <router-link tag="div" to="/">更多英雄 &gt;</router-link>
    </div>
    <div class="topBg" :style="{ 'background-image': `url(${model.banner}` }">
      <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
        <div class="fs-sm">{{ model.title }}</div>
        <h2 class="my-2 ">{{ model.name }}</h2>
        <div class="fs-sm">{{ model.categories.map(item => item.name).join('/') }}</div>
        <div class="d-flex jc-between">
          <div class="scores pt-1" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{ model.scores.difficult }}</span>
            <span>技能</span>
            <span class="badge bg-info">{{ model.scores.skill }}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{ model.scores.attack }}</span>
            <span>生存</span>
            <span class="badge bg-dark-1">{{ model.scores.survive }}</span>
          </div>
          <router-link tag="div" to="/" class="text-grey fs-sm">皮肤 &gt;</router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
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
  created() {
    this.fetchHero()
  },
  methods: {
    async fetchHero() {
      const res = await this.$http.get(`/heroes/${this.id}`)
      this.model = res.data
    }
  }
}
</script>

<style lang="scss">
.topbar {
  /* 粘性布局，吸顶效果 */
  position: sticky;
  top: 0;
  z-index: 999;
}

.page-hero {
  .topBg {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;

    .info {
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));

      .scores {
        .badge {
          margin: 0 0.5rem;
          display: inline-block;
          width: 1rem;
          height: 1rem;
          line-height: 0.9rem;
          text-align: center;
          border-radius: 50%;
          font-size: 0.6rem;
          border: 1px solid rgba($color: #fff, $alpha: 0.3)
        }
      }
    }
  }

}
</style>
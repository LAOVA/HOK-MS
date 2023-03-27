<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black py-2 px-3 text-white d-flex ai-center">
      <router-link tag="div" to="/">
        <img src="../assets/logo.png" height="30">
      </router-link>
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
    <div>
      <div class="bg-white px-3">
        <div class="nav d-flex jc-around py-2 pd-3 border-bottom">
          <div class="nav-item active">
            <div class="nav-link">英雄初识</div>
          </div>
          <div class="nav-item ">
            <div class="nav-link">进阶攻略</div>
          </div>
        </div>
      </div>
      <swiper>
        <swiper-slide>
          <div>
            <!-- 技能 -->
            <div class="p-3 bg-white border-bottom">
              <!-- 按钮 -->
              <div class="d-flex">
                <router-link tag="button" to="/" class="btn btn-lg flex-1">
                  <i class="iconfont icon-cc-menu-circle"></i>
                  英雄介绍视频
                </router-link>
                <router-link tag="button" to="/" class="btn btn-lg flex-1 ml-2">
                  <i class="iconfont icon-cc-menu-circle"></i>
                  一图识英雄
                </router-link>
              </div>

              <!-- 技能 -->
              <div class="skills bg-white mt-4">
                <div class="d-flex jc-around">
                  <img class="icon" @click="skillIndex = i" :class="{ active: skillIndex === i }" :src="item.icon"
                    v-for="(item, i) in model.skills" :key="i" width="64" height="64" />
                </div>
                <div v-if="skill">
                  <div class="d-flex py-4">
                    <h3 class="m-0">{{ skill.name }}</h3>
                    <span class="text-grey-1 ml-4">(冷却值:{{ skill.delay }} 消耗:{{
                      skill.cost }})</span>
                  </div>
                  <p class="mt-0">{{ skill.description }}</p>
                  <div class="text-grey border-top fs-sm" v-if="skill.tip">
                    <p class="mb-0">小提示：{{ skill.tip }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 出装 -->
            <my-card plain icon="cc-menu-circle" title="出装推荐" class="hero-items">
              <div class="fs-lg">顺风出装</div>
              <div class="d-flex jc-around text-center  border-bottom">
                <div class="mt-3" v-for="item in model.items1" :key="item.name">
                  <img class="icon" :src="item.icon">
                  <div class="py-1 fs-xs">{{ item.name }}</div>
                </div>
              </div>
              <div class="fs-lg mt-3">逆风出装</div>
              <div class="d-flex jc-around text-center  border-bottom">
                <div class="mt-3" v-for="item in model.items2" :key="item.name">
                  <img class="icon" :src="item.icon">
                  <div class="py-1 fs-xxs">{{ item.name }}</div>
                </div>
              </div>
            </my-card>
            <!-- 使用 -->
            <my-card plain icon="cc-menu-circle" title="使用技巧">
              <p class="m-0">{{ model.usageTips }}</p>
            </my-card>
            <!-- 对抗 -->
            <my-card plain icon="cc-menu-circle" title="对抗技巧">
              <p class="m-0">{{ model.battleTips }}</p>
            </my-card>
            <!-- 团战 -->
            <my-card plain icon="cc-menu-circle" title="团战技巧">
              <p class="m-0">{{ model.teamTips }}</p>
            </my-card>
            <!-- 关系 -->
            <my-card plain icon="cc-menu-circle" title="英雄关系">
              <div class="fs-xl">最佳搭档</div>
              <div v-for="item in model.partners" :key="item.name" class="d-flex pt-3">
                <img :src="item.hero.avatar" alt="" height="50">
                <p class="flex-1 m-0 ml-3">
                  {{ item.description }}</P>
              </div>
              <div class="border-bottom mt-3"> </div>

            </my-card>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="share"></div>
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
      model: null,
      skillIndex: 0
    }
  },
  created() {
    this.fetchHero()
  },
  computed: {
    skill() {
      // 返回一个对象
      return this.model.skills[this.skillIndex]
    }
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
@import '../style.scss';



.page-hero {
  .topbar {
    /* 粘性布局，吸顶效果 */
    position: sticky;
    top: 0;
    z-index: 999;
  }

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

  .skills {
    img {
      box-sizing: content-box;

      &.active {
        border: 3px solid map-get($map: $colors, $key: 'primary');
        border-radius: 50%;
      }
    }
  }

  .hero-items {
    img.icon {
      width: 45px;
      height: 45px;
      border-radius: 50%;
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
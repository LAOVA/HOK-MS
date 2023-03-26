<template>
  <div>
    <!-- 轮播图 -->
    <swiper :options="swiperOption">
      <swiper-slide><img src="../assets/images/1e7bb2576ac13117ca095d97910adcf4.jpeg" class="w-100"></swiper-slide>
      <swiper-slide><img src="../assets/images/97bde2d2af87054fb99377f624e7fc7f.jpeg" class="w-100"></swiper-slide>
      <swiper-slide><img src="../assets/images/af4cfc7d8fa6a261811ad85353753173.jpeg" class="w-100"></swiper-slide>
      <div class="swiper-pagination pagination-home text-right" slot="pagination"></div>
    </swiper>


    <!-- 图标导航 -->
    <div class="nav-icons bg-white mt-3 pt-3 text-center">
      <div class=" d-flex flex-wrap ">
        <div class="nav-item mb-2 py-2 px-3 text-dark-1" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="mt-1">爆料啊</div>
        </div>
      </div>
      <div class="bg-light py-2">
        <i class="sprite sprite-arrow mr-1 d-flex ai-center jc-center"></i>
        <span>收起</span>
      </div>
    </div>

    <!-- 新闻资讯 -->
    <my-listcard icon="cc-menu-circle" title="新闻资讯" :categories="news">
      <template #content="obj">
        <div class="py-2 fs-lg " v-for="(item, i) in obj.items.list" :key="i">
          <router-link tag="div" :to="`/articles/${item._id}`" class="d-flex">
            <span class="text-primary">[{{ obj.items.name }}]</span>
            <span class="px-2 text-primary">|</span>
            <span class="flex-1 text-dark-1 pr-1 text-ellipse">{{ item.title }}</span>
            <span class="text-grey-1 fs-sm">{{ item.createdAt | date }}</span>
          </router-link>
        </div>

      </template>
    </my-listcard>

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
    <my-card icon="cc - menu - circle" title="title"></my-card>
    <my-card icon="cc - menu - circle" title="title"></my-card>

  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home", //区分其他pagination
          clickable: true,
        },
        autoplay: 3000,
        loop: true,
      },
      news: [],
      heroes: []
    }
  },
  filters: {
    date(val) {
      return dayjs(val).format('MM/DD')
    }
  },
  created() {
    this.fetchNews()
    this.fetchHeroes()
  },
  methods: {
    async fetchNews() {
      const res = await this.$http.get('news/list')
      this.news = res.data
    },
    async fetchHeroes() {
      const res = await this.$http.get('heroes/list')
      this.heroes = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style.scss';

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;

  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;

    &:nth-child(4n) {
      border-right: none;
    }
  }

}

.sprite {
  background: url(../assets/index.png) no-repeat 0 0;
  background-size: 28.8462rem;
  display: inline-block;

  &.sprite-news {
    width: 1.7692rem;
    height: 1.5385rem;
    background-position: 63.546% 15.517%;
  }

  &.sprite-arrow {
    width: .7692rem;
    height: .7692rem;
    background-position: 38.577% 52.076%;
  }
}
</style>

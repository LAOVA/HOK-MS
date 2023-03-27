<template>
  <div>
    <!-- 轮播图 -->
    <swiper :options="swiperOption">
      <swiper-slide v-for="i in abs" :key="i._id">
        <a :href="i.url">
          <img :src="i.image" class="w-100">
        </a>
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right" slot="pagination"></div>
    </swiper>


    <!-- 图标导航 -->
    <div class="nav-icons bg-white mt-3 pt-3 text-center">
      <div class=" d-flex flex-wrap ">
        <div class="nav-item mb-4 px-3 text-dark-1" v-for="n in nav" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="mt-1 fs-xs">{{ n }}</div>
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
            <span class="text-primary mr-2 label fs-xxs px-1">{{ obj.items.name }}</span>
            <span class="flex-1 text-dark-1 pr-1 text-ellipse" style="line-height:1.2308rem">{{ item.title }}</span>
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
      abs: [],
      news: [],
      heroes: [],
      nav: [
        '爆料站',
        '故事站',
        '周边商城',
        '体验服',
        '新人专区',
        '荣耀·传承',
        '王者营地',
        '公众号',
      ]
    }
  },
  filters: {
    date(val) {
      return dayjs(val).format('MM/DD')
    }
  },
  created() {
    this.fetchAbs()
    this.fetchNews()
    this.fetchHeroes()
  },
  methods: {
    async fetchAbs() {
      const res = await this.$http.get('abs/list')
      this.abs = res.data.map(item => { if (item.name == '轮播图') return item })[0].items
    },
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
  width: 2.3846rem;
  height: 1.9231rem;


  &.sprite-arrow {
    width: .7692rem;
    height: .7692rem;
    background-position: 38.577% 52.076%;
  }
}

.label {
  border: 1px solid map-get($map: $colors, $key: 'primary');
  border-radius: 10%;
}

.nav-item:nth-child(1) {
  .sprite-news {
    background-position: 63.546% 15.517%;
  }
}

.nav-item:nth-child(2) {
  .sprite-news {
    background-position: 90.483% 15.614%;
  }
}

.nav-item:nth-child(3) {
  .sprite-news {
    background-position: 36.746% 0.924%;
  }
}

.nav-item:nth-child(4) {
  .sprite-news {
    background-position: 9.408% 15.517%;
  }
}

.nav-item:nth-child(5) {
  .sprite-news {
    background-position: 90.733% 1.266%;
  }
}

.nav-item:nth-child(6) {
  .sprite-news {
    background-position: 36.467% 15.287%;
  }
}

.nav-item:nth-child(7) {
  .sprite-news {
    background-position: 63.3% 0.927%;
  }
}

.nav-item:nth-child(8) {
  .sprite-news {
    background-position: -1% 96.207%;
  }
}
</style>

<template>
  <my-card :icon="icon" :title="title">
    <div class="nav jc-between">
      <div class="nav-item" :class="{ active: false }">
        <div class="nav-link" v-for="(category, index) in categories" :key="index">热门</div>
      </div>
    </div>
    <div class="pt-3">
      <swiper>
        <swiper-slide v-for="n in 5" :key="n">
          <div class="py-2" v-for="n in 5" :key="n">
            <span>[新闻]</span>
            <span> | </span>
            <span>3月23日全服不停机更新公告</span>
            <span>03/22</span>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </my-card>
</template>

<script>
import Card from './Card.vue'
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    categories: { type: Array, required: true }
  },
  components: {
    'my-card': Card
  }
}
</script>

<style></style>
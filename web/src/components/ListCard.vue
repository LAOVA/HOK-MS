<template>
  <my-card :icon="icon" :title="title">
    <div class="nav jc-between">
      <div class="nav-item" :class="{ active: active === index }" v-for="(category, index) in categories" :key="index"
        @click="active = index">
        <div class="nav-link">{{ category.name }}</div>
      </div>
    </div>
    <div class="pt-3">
      <swiper>
        <slot></slot>
      </swiper>
    </div>
  </my-card>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    categories: { type: Array, required: true }
  },
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style></style>
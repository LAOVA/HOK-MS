<template>
  <div class="card bg-white p-3 mt-3">
    <div class="card-header d-flex" :class="{ 'border-bottom': !plain, 'pb-3': !plain }">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xl flex-1 px-2" :class="{ 'fs-900': plain }">{{ title }}</div>
      <i class="iconfont icon-menu" v-if="!plain"></i>
    </div>
    <div class="card-body pt-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    plain: { type: Boolean },
  }
}
</script>

<style lang="scss">
@import '../style.scss';

.card {
  border-bottom: 1px solid $border-color;
}
</style>
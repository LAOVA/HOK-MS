<template>
  <div class="card bg-white p-3 mt-3">
    <div class="card-header pb-3 d-flex">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xl flex-1 px-2">{{ title }}</div>
      <i class="iconfont icon-menu "></i>
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
  }
}
</script>

<style lang="scss">
@import '../style.scss';

.card {
  .card-header {
    border-bottom: 1px solid $border-color;
  }

  border-bottom: 1px solid $border-color;
}
</style>
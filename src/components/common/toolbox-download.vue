<template>
  <div class="toolbox fixed-right pointer">
    <span class="float-right"><i class="icomoon-ic-download"></i>导出页面</span>
  </div>
</template>
<style lang="scss" scoped>
  @import '@/assets/scss/_variables.scss';
  .toolbox {
    font-size: 2rem;
    color: $normalGray;
    &.fixed-right {
      position: fixed;
      right: 0;
      z-index: 10;
      span {
        margin: 3rem 5rem 0 0;
      }
      i {
        margin-right: 0.5rem;
      }
    }
  }
</style>
<template>
  <div
      :style="{
        width: `${size}rem`,
        height: `${size}rem`,
        zIndex
      }"
      :class="{
        absolute,
        fixed}"
      class="spinner-border text-primary"></div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 2
    },
    absolute: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped lang="scss">
.spinner-border {
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  // 여기서 & 는 클래스에 spinner-border에 추가로 absolute가 같이 있는 케이스의 스타일을 지정.
  &.absolute {
    position: absolute;
  }
  &.fixed {
    position: fixed;
  }
}
</style>
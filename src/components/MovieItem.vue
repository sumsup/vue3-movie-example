<template>
  <div>{{ movie.Title }}</div>
</template>

<script>
export default {
    props: {
      movie: {
        type: Object,
        // default: function () { return {}} 를 화살표 함수로 간소화해서 표현.
        // default에서 객체나 배열은 함수로 반환하도록 해야 한다.
        default: () => ({})
      }
    }
}
</script>

<style scoped>

</style>
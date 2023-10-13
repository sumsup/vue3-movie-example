<template>
  <div
      :style="{ backgroundImage: `url(${movie.Poster})`}"
      class="movie"
  >
    <div class="info">
      <div class="year">
        {{ movie.Year }}
      </div>
      <div class="title">
        {{ movie.Title }}
      </div>
    </div>
<!--    <img-->
<!--        :src="movie.Poster"-->
<!--        alt=""-->
<!--        width="200"-->
<!--    />-->
  </div>
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

<style lang="scss" scoped>
@import "~/scss/main";

.movie {
  $width: 168px;
  width: $width;
  height: $width * 3 / 2;
  margin: 10px;
  border-radius: 4px;
  background-color: $gray-400;
  background-size: cover; // 배경 사진이 div 크기에 맞게 fitted 되도록 cover 설정.
  overflow: hidden;
  position: relative;
  &:hover::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 6px solid $primary;
  }
  .info {
    background-color: rgba($black, .3);
    width: 100%;
    padding: 14px;
    font-size: 14px;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 0;
    backdrop-filter: blur(10px);
    .year {
      color: $primary;
    }
    .title {
      color: $white;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

</style>
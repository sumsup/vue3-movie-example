<template>
  <RouterLink
      :to="`/movie/${movie.imdbID}`"
      :style="{ backgroundImage: `url(${movie.Poster})`}"
      class="movie"
  >
    <Loader
      v-if="imageLoading"
      :size="1.5"
      absolute/>
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
  </RouterLink>
</template>

<script>
import Loader from "~/components/Loader.vue";

export default {
  components: {
    Loader
  },
  props: {
    movie: {
      type: Object,
      // default: function () { return {}} 를 화살표 함수로 간소화해서 표현.
      // default에서 객체나 배열은 함수로 반환하도록 해야 한다.
      default: () => ({})
    }
  },
  data() {
    return {
      imageLoading: true
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      // const img = document.createElement('img');
      // img.src = this.movie.Poster;
      // // 이미지 로드가 완료되면 로딩바를 false로 변경.
      // // 콜백을 화살표 함수로 작성해야 this 로 접근시 현재 컴포넌트인 MovieItem.vue 의 script에 작성된
      // // imageLoading으로 접근한다.
      // // function 키워드로 콜백을 작성하면 호출한 위치에서의 imageLoading으로 접근한다.
      // img.addEventListener('load', () => {
      //   this.imageLoading = false;
      // });

      const poster = this.movie.Poster;

      if (!poster || poster === 'N/A') {
        this.imageLoading = false;
      } else {
        // 위 내용을 플러그인으로 변경.
        await this.$loadImage(poster);
        this.imageLoading = false;
      }

    }
  }
}
</script>

<style lang="scss" scoped>
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
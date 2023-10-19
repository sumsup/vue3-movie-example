<template>
  <div class="container">
    <div
        :class="{ 'no-result': !movies.length}"
        class="inner">
      <!--      <div-->
      <!--          v-if="loading"-->
      <!--          class="spinner-border text-primary"></div>-->
      <!-- 위 Loader를 아래 Loader 컴포넌트로 대체 -->
      <Loader v-if="loading"/>
      <div
          v-if="message"
          class="message">
        {{ message }}
      </div>
      <div
          v-else
          class="movies">
        <MovieItem
            v-for="movie in movies"
            :key="movie.imdbID"
            :movie="movie"/>
      </div>
    </div>
  </div>
</template>

<script>
import MovieItem from "~/components/MovieItem.vue";
import Loader from "~/components/Loader.vue";
import {mapState} from "vuex";

export default {
  name: "MovieList",
  components: {
    MovieItem,
    Loader
  },
  // 계산된 데이터의 반응성.
  computed: {
    // movies() {
    //   // vue x -> store.state -> movie.js -> movies 배열 객체에 접근.
    //   return this.$store.state.movie.movies;
    // },
    // message() {
    //   return this.$store.state.movie.message;
    // },
    // loading() {
    //   return this.$store.state.movie.loading;
    // }

    // vuex helper가 제공하는 mapState로 store에 저장된 데이터를 간편하게 불러오는 것으로 위 코드 대체.
    ...mapState('movie', [
      'movies',
      'message',
      'loading'
    ])
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 30px;

  .inner {
    background-color: $gray-200;
    padding: 10px 0;
    border-radius: 4px;
    text-align: center;

    &.no-result {
      padding: 70px 0;
    }
  }

  .message {
    color: $gray-400;
    font-size: 20px;
  }

  .movies {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}

</style>
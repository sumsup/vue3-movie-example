<template>
  <div class="container">
    <div class="inner">
      <MovieItem
          v-for="movie in movies"
          :key="movie.imdbID"
          :movie="movie"/>
    </div>
  </div>
</template>

<script>
import MovieItem from '~/components/MovieItem';

export default {
  name: "MovieList",
  components: {
    MovieItem
  },
  // 계산된 데이터의 반응성.
  computed: {
    movies() {
      // vue x -> store.state -> movie.js -> movies 배열 객체에 접근.
      return this.$store.state.movie.movies;
    }
  }
}
</script>

<style scoped>

</style>
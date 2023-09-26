<template>
  <Headline/>
  <Search />
  <MovieList/>
</template>

<script>
import Headline from "../src/components/Headline.vue";
import Search from '~/components/Search';
import MovieList from "~/components/MovieList.vue";

export default {
    components: {
        MovieList,
        Headline,
        Search
    }
}
</script>

<style scoped>

</style>
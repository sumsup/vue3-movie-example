<template>
  <div class="about">
    <div class="photo">
      <Loader
          v-if="imageLoading"
          :size="1.5"
          absolute/>
      <img
          :src="image"
          :alt="name"/>
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ email }}</div>
    <div>{{ blog }}</div>
    <div>{{ phone }}</div>
  </div>
</template>

<script>
import Loader from "~/components/Loader.vue";
import { mapState } from "vuex";

export default {
  components: {
    Loader
  },
  data() {
    return {
      imageLoading: true
    }
  },
  computed: {
    // image() {
    //   return this.$store.state.about.image;
    // },
    // name() {
    //   return this.$store.state.about.name;
    // },
    // email() {
    //   return this.$store.state.about.email;
    // },
    // blog() {
    //   return this.$store.state.about.blog;
    // },
    // phone() {
    //   return this.$store.state.about.phone;
    // },

    // 위에서 각자 하나씩 가져오던 about store를 아래와 같이 mapState로 간소화해서 불러올 수 있다.
    // ... 전개 연산자를 사용.
    ...mapState('about', [
      'image',
      'name',
      'email',
      'blog',
      'phone'
    ])
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await this.$loadImage(this.image);
      this.imageLoading = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  text-align: center;

  .photo {
    width: 250px;
    height: 250px;
    margin: 40px auto 20px;
    padding: 30px;
    border: 10px solid $gray-300;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    position: relative;

    img {
      width: 100%;
    }
  }

  .name {
    font-size: 40px;
    font-family: "Oswald", sans-serif;
    margin-bottom: 20px;
  }
}
</style>
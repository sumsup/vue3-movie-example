<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div v-for="nav in navigations" :key="nav.name" class="nav-item">
        <!--
        RouterLink는 a 태그처럼 URL을 이동 시킴.
        그런데 새 페이지로 이동하는게 아니라, URL만 변경해 주고 컴포넌트만 router로 다시 렌더링 해주는 것. SPA 유지.
        기본적으로 활성화된 RouterLink 에는 router-link-active 클래스가 추가됨.
        활성화된 컴포넌트에 다른 클래스를 추가하고 싶을때는 active-class 속성을 사용함.
        아래에서 active-class="active" 처리 해놨으니 활성화되면 router-link-active 대신 active 가 활성화됨.

        :class="{ active : boolean }" 형태로 작성하면 true일 경우에만 active 클래스를 추가.
        -->
        <RouterLink
            v-bind:to="nav.href"
            active-class="active"
            :class="{ active: isMatch(nav.path) }"
            class="nav-link">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
    <div
        class="user"
        @click="toAbout">
      <img
          :src="image"
          :alt="name"
      />
    </div>
  </header>
</template>

<script>
import Logo from '~/components/Logo';
import { mapState } from 'vuex';

export default {
  components: {
    Logo
  },
  data() {
    return {
      navigations: [
        {
          name: 'Search',
          href: '/'
        },
        {
          name: 'Movie',
          href: '/movie',
          path: /^\/movie/ // '/movie' 로 시작하는지 확인.
        },
        {
          name: 'About',
          href: '/about'
        }
      ]
    }
  },
  computed: {
    // image() {
    //   return this.$store.state.about.image;
    // },
    // name() {
    //   return this.$store.state.about.name;
    // }

    // 위 store 데이터를 vuex helper에서 제공하는 mapState로 간소화해서 불러옴.
    ...mapState('about', [
        'image',
        'name'
    ])
  },
  methods: {
    isMatch(path) {
      if (!path) return false;

      // 정규표현식과 일치하는지 정규표현식을 확인.
      return path.test(this.$route.fullPath);
    },
    toAbout() {
      this.$router.push('/about');
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  position: relative;
  .logo {
    margin-right: 40px;
  }
  .user {
    width: 40px;
    height: 40px;
    padding: 6px;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    margin: auto;
    transition: .4s;
    &:hover {
      background-color: darken($gray-200, 10%);
    }
    img {
      width: 100%;
    }
  }
  @include media-breakpoint-down(sm) {
    .nav {
      display: none;
    }
  }
}
</style>
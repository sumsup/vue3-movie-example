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
        -->
        <RouterLink
            v-bind:to="nav.href"
            active-class="active"
            class="nav-link">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script>
import Logo from '~/components/Logo';

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
          href: '/movie'
        },
        {
          name: 'About',
          href: '/about'
        }
      ]
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
  .logo {
    margin-right: 40px;
  }
}
</style>
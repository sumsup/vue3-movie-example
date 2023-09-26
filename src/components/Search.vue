<template>
  <div class="container">
    <input
        v-model="title"
        class="form-control"
        type="text"
        placeholder="Search for Movies, Series & more"
        @keyup.enter="apply"
    />
    <div class="selects">
      <!-- v-model은 $data로 아래 data()에 접근해서 데이터를 표시할 수 있음. -->
      <select
          v-for="filter in filters"
          :key="filter.name"
          v-model="$data[filter.name]"
          class="form-select">
        <option
            v-if="filter.name === 'year'"
            value="">
          All Years
        </option>
        <option
            v-for="item in filter.items"
            :key="item">
          {{ item }}
        </option>
      </select>
    </div>

    <button class="btn btn-primary" @click="apply">
      Apply
    </button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      title: '',
      type: 'movie',
      number: 10,
      year: '',
      filters: [
        {
          name: 'type',
          items: ['movie', 'series', 'episode']
        },
        {
          name: 'number',
          items: [10, 20, 30]
        },
        {
          name: 'year',
          // 즉시 실행 함수로 연도를 셋팅. 20
          // function 키워드는 화살표 함수로 간소화.
          items: (() => {
            const years = [];
            const thisYear = new Date().getFullYear(); // 현재 연도 추가.
            for (let i = thisYear; i >= 1985; i--) {
              years.push(i);
            }
            return years;
          })()
        }
      ]
    }
  },
  methods: {
    async apply() {
      // movie.js 에 searchMovies 로 title, type, number, year 데이터 전달.
      // dispatch : 발송하다.
      this.$store.dispatch('movie/searchMovies', {
        title: this.title,
        type: this.type,
        number: this.number,
        year: this.year
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;

  // 컨테이너의 모든 자식요소를 선택.
  > * {
    margin-right: 10px;
    font-size: 15px;

    &:last-child {
      margin-right: 0;
    }
  }

  .selects {
    display: flex;

    select {
      width: 120px;
      margin-right: 10px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .btn {
    width: 120px;
    height: 50px;
    font-weight: 700;
    // flex에서 공간이 부족할 때 줄어드는 비율. 0으로 설정하면 줄어 들지 않는다.
    flex-shrink: 0;
  }
}
</style>
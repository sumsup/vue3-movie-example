import axios from "axios";

export default {
    // module!
    namespaced: true,
    // data!
    state: () => ({
        movies: [],
        message: '',
        loading: false
    }),
    // computed!
    getters: {
        // 바로 위 state 속성.
        movieIds(state) {
            return state.movies.map(m => m.imdbID);
        }
    },
    // methods!
    // 변이. 여기에서만 데이터 변경 가능.
    mutations: {
        updateState(state, payload) {
            // ['movies', 'message', 'loading']
            Object.keys(payload).forEach(key => {
                state[key] = payload[key];
            })
        },
        resetMovies(state) {
            state.movies = [];
        }
    },
    // actions 함수는 기본적으로 비동기. async await 가 기본적용 되 있음.
    actions: {
        // searchMovies(context) {
        //     context.state();
        //     context.getters();
        //     context.commit();
        // },

        // 위 코드를 객체구조분해를 통해서 아래에서 처럼 간단하게 표현 가능.
        async searchMovies(context, payload) {
            const { title, type, number, year} = payload;
            const OMDB_API_KEY = '7035c60c';

            const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${this.title}&type=${this.type}&y=${this.year}&page=1`);
            const { Search, totalResult } = res.data;
            // mutations 에 있는 updateState를 호출하면서 payload를 넘겨줌.
            context.commit('updateState', {
                movies: Search,
                message: 'Hello world!',
                loading: true
            });
        }
    }
}
import axios from "axios";
import _uniqBy from 'lodash/uniqBy';

export default {
    // module!
    namespaced: true,
    // data!
    state: () => ({
        movies: [],
        message: 'Search for the movie title!',
        loading: false
    }),
    // computed!
    getters: {
        // 바로 위 state 속성.
        // movieIds(state) {
        //     return state.movies.map(m => m.imdbID);
        // }
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

        // 위 코드를 객체구조분해를 통해서 context.commit 메서드를 메서드 시그니처 부분에서 변수에 할당해서 사용가능.
        // 아래와 같이 하면 바로 commit 만 사용 가능.
        // context.commit() 대신 static import 처럼 commit() 으로 사용 가능.
        // async searchMovies(context, payload) {
        async searchMovies({commit, state}, payload) {
            // 목록 검색 로딩중에는 중복으로 조회하지 않도록 방지.
            if (state.loading) {
                return
            }

            // 영화 검색버튼을 누르면 검색 데이터 표시 문구를 지워준다.
            commit('updateState', {
                message: '',
                loading: true
            });

            try {

                const res = await _fetchMovie({
                    ...payload,
                    page: 1
                });
                const {Search, totalResults} = res.data;

                // mutations에 있는 updateState를 호출하면서 payload를 넘겨줌.
                // 구조분해로 context 에서 { commit } 만 꺼내서 사용가능.
                commit('updateState', {
                    // 중복되는 imdbID 값은 lodash._uniqBy로 제거.
                    movies: _uniqBy(Search, "imdbID")
                });
                console.log(totalResults); // 268 => 27 페이지.
                console.log(typeof totalResults); // String

                const total = parseInt(totalResults, 10);
                const pageLength = Math.ceil(total / 10);

                // 검색 결과가 10개를 넘어가는 경우 추가로 영화정보를 요청.
                if (pageLength > 1) {
                    for (let page = 2; page <= pageLength; page += 1) {
                        // 해당 api는 기본적으로 영화정보를 10개씩 반환함.
                        // 그래서 한 페이지에 보여줄 영화 갯수가 10개를 넘어갈 경우엔 반복해서 API를 호출해서 정보를 받아와야 함.
                        // 한 페이지에 보여줄 영화 갯수에 따라 API 호출 횟수가 달라짐.
                        // ex) 15개를 보여 준다면 2번만 호출. 30개를 보여 준다면 3번만 호출.
                        if (page > (payload.number / 10)) {
                            break;
                        }

                        const res = await _fetchMovie({
                            ...payload,
                            page
                        });
                        const {Search} = res.data;
                        commit('updateState', {
                            // movies 객체 값에 기존 movies 배열을 추가하고, Search 배열값도 추가한다.
                            // ... <-- 배열 전개 연산자.
                            movies: [
                                ...state.movies,
                                ..._uniqBy(Search, "imdbID")
                            ]
                        })
                    }
                }

            } catch (message) {
                commit('updateState', {
                    movies: [],
                    message
                });
            } finally {
                commit('updateState', {
                    loading: false
                });
            }
        }
    }
}

function _fetchMovie(payload) {
    const {title, type, year, page} = payload;
    const OMDB_API_KEY = '7035c60c';
    const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;

    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(res => {
                if (res.data.Error) {
                    reject(res.data.Error);
                }
                resolve(res);
            })
            .catch(err => {
                reject(err.message)
            });
    });
}
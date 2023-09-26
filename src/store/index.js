import {createStore} from 'vuex';
import movie from './movie';
import about from './about';

export default createStore({
    modules: {
        // movie: movie,
        // about: about
        // 위처럼 속성과 데이터의 이름이 같으면 다음과 같이 속성명만 써서 모듈을 로딩할 수 있다.
        movie,
        about
    }
});
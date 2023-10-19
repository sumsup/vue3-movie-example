import { createApp } from 'vue';
import App from './App.vue';
// index를 import 할 때는 index.js 파일명은 생략해 줄 수 있다.
// import router from '../routes'; <--- 하면 index.js 를 import 함.
import router from '../routes/index.js';
import store from './store/index.js';
import loadImage from './plugins/loadImage';

createApp(App)
    .use(router) // $route
    .use(store) // $store
    .use(loadImage) // $loadImage
    .mount('#app');
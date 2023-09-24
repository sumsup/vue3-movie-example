import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./Home.vue";
import Movie from "./Movie";
import About from "./About.vue";

export default createRouter({
   // Hash
   // https://google.com/#/search
    history: createWebHashHistory(),

    // pages
    // https://google.com/about
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/movie',
            component: Movie
        },
        {
            path: '/about',
            component: About
        }
    ]
});
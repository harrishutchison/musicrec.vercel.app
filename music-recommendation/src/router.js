import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from './views/Home.vue';
import Subreddits from './views/Subreddits.vue';
import Subreddit from './views/Subreddit.vue';
import Post from './views/Post.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Subreddits,
  },
  {
    path: '/',
    name: 'subreddits',
    component: Subreddits,
  },
  {
    path: '/g/:name',
    name: 'subreddit',
    component: Subreddit,
  },
  {
    path: '/g/:name/:post_id',
    name: 'post',
    component: Post,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

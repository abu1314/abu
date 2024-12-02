import { createRouter, createWebHistory } from 'vue-router';
import BlogApp from '../components/BlogApp.vue';
import PostDetail from '../components/PostDetail.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: BlogApp
  },
  {
    path: '/post/:id',  // 动态路由
    name: 'PostDetail',
    component: PostDetail, // 确保这个组件正确导入
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

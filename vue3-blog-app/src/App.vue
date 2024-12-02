<template>
  <div id="app">
    <BlogApp />
  </div>
</template>

<script>
import BlogApp from './components/BlogApp.vue'; // 导入 BlogApp 组件

export default {
  name: 'App',
  components: {
    BlogApp  // 在这里注册 BlogApp 组件
  }
};
</script>

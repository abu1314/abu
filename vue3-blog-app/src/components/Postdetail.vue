<template>
    <div class="post-detail">
      <h1>{{ post.title }}</h1>
      <p>{{ post.content }}</p>
      <router-link to="/">Back to Home</router-link>
    </div>
  </template>
  
  <script>
  export default {
    props: ['id'],
    data() {
      return {
        post: null
      };
    },
    created() {
      this.loadPost();
    },
    methods: {
      loadPost() {
        // 从 localStorage 获取文章数据
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const post = posts.find(post => post.id === parseInt(this.id));
        if (post) {
          this.post = post;
        } else {
          this.post = {
            title: 'Post not found',
            content: 'The post you are looking for does not exist.'
          };
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .post-detail {
    padding: 20px;
  }
  
  .post-detail h1 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  .post-detail p {
    font-size: 1.2rem;
    line-height: 1.6;
  }
  
  .post-detail a {
    margin-top: 20px;
    display: inline-block;
    background-color: #2196F3;
    color: white;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 4px;
  }
  
  .post-detail a:hover {
    background-color: #0b79d0;
  }
  </style>
  
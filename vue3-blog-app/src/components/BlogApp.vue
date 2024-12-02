<template>
  <div class="blog-app">
    <h1>Vue 3 Blog App</h1>
    <div class="blog-form">
      <input v-model="newPostTitle" placeholder="Post Title" />
      <textarea v-model="newPostContent" placeholder="Post Content"></textarea>
      <button @click="addPost">Add Post</button>
    </div>

    <div class="blog-list">
      <div v-for="(post, index) in posts" :key="index" class="blog-post">
        <h2><router-link :to="'/post/' + post.id">{{ post.title }}</router-link></h2>  <!-- 使用 router-link 跳转到 PostDetail -->
        <p>{{ post.content.slice(0, 100) }}...</p>
        <button @click="editPost(index)">Edit</button>
        <button @click="deletePost(index)">Delete</button>
      </div>
    </div>

    <div v-if="isEditing" class="edit-form">
      <h3>Edit Post</h3>
      <input v-model="editedTitle" />
      <textarea v-model="editedContent"></textarea>
      <button @click="savePost">Save Changes</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: JSON.parse(localStorage.getItem('posts')) || [],
      newPostTitle: '',
      newPostContent: '',
      isEditing: false,
      editedTitle: '',
      editedContent: '',
      editingIndex: null
    };
  },
  methods: {
    addPost() {
      if (this.newPostTitle && this.newPostContent) {
        const newPost = {
          id: Date.now(), // 给文章一个唯一的 ID
          title: this.newPostTitle,
          content: this.newPostContent
        };
        this.posts.push(newPost);
        this.savePosts();
        this.newPostTitle = '';
        this.newPostContent = '';
      }
    },
    editPost(index) {
      this.isEditing = true;
      this.editingIndex = index;
      this.editedTitle = this.posts[index].title;
      this.editedContent = this.posts[index].content;
    },
    savePost() {
      if (this.editedTitle && this.editedContent) {
        this.posts[this.editingIndex].title = this.editedTitle;
        this.posts[this.editingIndex].content = this.editedContent;
        this.savePosts();
        this.isEditing = false;
        this.editedTitle = '';
        this.editedContent = '';
        this.editingIndex = null;
      }
    },
    deletePost(index) {
      this.posts.splice(index, 1);
      this.savePosts();
    },
    savePosts() {
      localStorage.setItem('posts', JSON.stringify(this.posts));
    }
  }
};
</script>

<style scoped>
.blog-app {
  padding: 20px;
}

.blog-form {
  margin-bottom: 20px;
}

.blog-form input,
.blog-form textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.blog-form button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.blog-form button:hover {
  background-color: #45a049;
}

.blog-list {
  margin-top: 20px;
}

.blog-post {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.blog-post button {
  margin-top: 10px;
  background-color: #f44336;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.blog-post button:hover {
  background-color: #e53935;
}

.edit-form {
  margin-top: 20px;
}

.edit-form input,
.edit-form textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.edit-form button {
  background-color: #2196F3;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-form button:hover {
  background-color: #0b79d0;
}
</style>

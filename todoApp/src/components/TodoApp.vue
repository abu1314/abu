<template>
  <div class="todo-app">
    <h1>小应用</h1>
    <input v-model="newTodo" @keyup.enter="addTodo" placeholder="添加" />
    <ul>
      <li v-for="(todo, index) in currentPageTodos" :key="index">
        <input type="checkbox" v-model="todo.completed" />
        <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <button @click="removeTodo(index)">删除</button>
      </li>
    </ul>
    <select name="dqy" v-model="pageSize" > 
      <option value="5">5</option>
      <option value="10">10</option>
    </select>
    <span>当前页 {{ currentPage }} 共 {{ pageCount }}页</span>
    <button v-if="currentPage > 1" @click="prevPage">上一页</button>
    <button v-if="currentPage < pageCount" @click="nextPage">下一页</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: '',
      todos: JSON.parse(localStorage.getItem('todos')) || [],
      currentPage: 1,
      pageSize: 5
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.todos.length / this.pageSize);
    },
    currentPageTodos() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.todos.slice(start, end);
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() !== '') {
        this.todos.push({ text: this.newTodo.trim(), completed: false });
        this.newTodo = '';
        this.saveTodos();
      }
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
      this.saveTodos();
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.pageCount) this.currentPage++;
    },
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }
};
</script>

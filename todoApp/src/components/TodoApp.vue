<template>
    <div class="todo-app">
      <h1>Vue 3 Todo App</h1>
      <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Add a new task" />
      <ul>
        <li v-for="(todo, index) in todos" :key="index">
          <span>{{ todo }}</span>
          <button @click="removeTodo(index)">删除</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newTodo: '',
        todos: []
      };
    },
    methods: {
      addTodo() {
        if (this.newTodo.trim() !== '') {
          this.todos.push(this.newTodo.trim());
          this.newTodo = '';
        }
      },
      removeTodo(index) {
        this.todos.splice(index, 1);
      }
    }
  };
  </script>
  
  <style scoped>
  .todo-app {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f4f4f9;
    border-radius: 8px;
  }
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    padding: 8px;
    background-color: #fff;
    margin: 5px 0;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  button {
    background-color: red;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
  }
  button:hover {
    background-color: darkred;
  }
  </style>
  
<template>
    <section class="todoapp">
      <header class="header">
        <h1>Vacation Planning Routes</h1>
        <input
          class="new-todo"
          autofocus
          placeholder="Travel Plan"
          @keyup.enter="addTodo"
          v-model="newTodo"
        >
        <input
          class="departure-time"
          type="datetime-local"
          v-model="newDepartureTime"
          placeholder="Select departure time"
        >
      </header>
      <section class="main" v-show="todos.length">
        <input
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
          :checked="remaining === 0"
          @change="toggleAll"
        >
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li
            v-for="todo in filteredTodos"
            :class="{ completed: todo.completed }"
            :key="todo.id"
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed">
              <label>
                {{ todo.title }}
                <span class="date">{{ formatDate(todo.departureTime) }}</span>
              </label>
              <button class="destroy" @click="removeTodo(todo)"></button>
            </div>
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todos.length">
        <span class="todo-count">
          <strong>{{ remaining }}</strong>
          {{ remaining === 1 ? ' item' : ' items' }} left
        </span>
        <ul class="filters">
          <li>
            <a href="#/all" :class="{ selected: visibility === 'all' }">All</a>
          </li>
          <li>
            <a href="#/active" :class="{ selected: visibility === 'active' }">Active</a>
          </li>
          <li>
            <a href="#/completed" :class="{ selected: visibility === 'completed' }">Completed</a>
          </li>
        </ul>
      </footer>
    </section>
  </template>
  
  
  <script setup>
  import { ref, computed, watchEffect } from 'vue'
  
  const STORAGE_KEY = 'vue-todomvc'
  const todos = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
  const newTodo = ref('')
  const newDepartureTime = ref('')
  const visibility = ref('all')
  const filteredTodos = computed(() => filters[visibility.value](todos.value))
  const remaining = computed(() => filters.active(todos.value).length)
  
  const filters = {
    all: (todos) => todos,
    active: (todos) => todos.filter((todo) => !todo.completed),
    completed: (todos) => todos.filter((todo) => todo.completed)
  }
  
  window.addEventListener('hashchange', onHashChange)
  onHashChange()
  
  watchEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
  })
  
  function toggleAll(e) {
    todos.value.forEach((todo) => (todo.completed = e.target.checked))
  }
  
  function addTodo() {
    const title = newTodo.value.trim()
    const departureTime = newDepartureTime.value
    if (title && departureTime) {
      todos.value.push({
        id: Date.now(),
        title: title,
        departureTime: departureTime,
        completed: false
      })
      newTodo.value = ''
      newDepartureTime.value = ''
    }
  }
  
  function removeTodo(todo) {
    todos.value.splice(todos.value.indexOf(todo), 1)
  }
  
  function formatDate(timestamp) {
    const date = new Date(timestamp)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
    return date.toLocaleDateString('en-US', options)
  }
  
  function onHashChange() {
    const route = window.location.hash.replace(/#\/?/, '')
    if (filters[route]) {
      visibility.value = route
    } else {
      visibility.value = 'all'
      window.location.hash = ''
    }
  }
  </script>
  
<style scoped>
.header {
    text-align: center;
    padding: 20px;
}
  
.departure-time {
    background-color: transparent;
    color: inherit;
    margin-top: 5px;
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 2px solid #ccc;
}
  
.date {
    font-size: 0.75em;
    color: #d9d9d9;
    margin-left: 5px;
}
  
.todo-list li.completed label {
    color: #949494;
    text-decoration: line-through;
}
</style>
  
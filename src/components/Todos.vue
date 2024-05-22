<template>
  <section class="todoapp">
    <header class="header">
      <h1>{{ title }}</h1>
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
              {{ todo.text }}
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

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Ryeza Travel'
    }
  },
  data() {
    return {
      todos: [],
      newTodo: '',
      newDepartureTime: '',
      visibility: 'all'
    }
  },
  computed: {
    filteredTodos() {
      if (this.visibility === 'active') {
        return this.todos.filter(todo => !todo.completed);
      } else if (this.visibility === 'completed') {
        return this.todos.filter(todo => todo.completed);
      } else {
        return this.todos;
      }
    },
    remaining() {
      return this.todos.filter(todo => !todo.completed).length;
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() && this.newDepartureTime) {
        this.todos.push({
          text: this.newTodo.trim(),
          completed: false,
          departureTime: this.newDepartureTime
        });
        this.newTodo = '';
        this.newDepartureTime = '';
      }
    },
    removeTodo(todo) {
      const index = this.todos.indexOf(todo);
      if (index > -1) {
        this.todos.splice(index, 1);
      }
    },
    toggleAll(event) {
      const checked = event.target.checked;
      this.todos.forEach(todo => {
        todo.completed = checked;
      });
    },
    formatDate(dateString) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
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

<template>
  <div class="app">
    <header class="header">
      <nav class="navbar">
        <ul>
          <li><a href="#" @click="showTodos">Todos</a></li>
          <li><a href="#" @click="showPosts">Posts</a></li>
        </ul>
      </nav>
    </header>

    <div v-if="showingTodos">
      <Todos />
    </div>

    <div v-if="showingPosts">
      <Posts />
    </div>
  </div>
</template>

<script>
import Todos from './components/Todos.vue';
import Posts from './components/Posts.vue';

export default {
  components: {
    Todos,
    Posts
  },
  data() {
    return {
      showingTodos: true,
      showingPosts: false,
    }
  },
  methods: {
    showTodos() {
      this.showingTodos = true;
      this.showingPosts = false;
    },
    showPosts() {
      this.showingTodos = false;
      this.showingPosts = true;
    },
  },
}
</script>

<style scoped>
.header {
  text-align: center;
  padding: 20px;
}

.navbar ul {
  list-style: none;
  padding: 0;
}

.navbar li {
  display: inline;
  margin: 0 10px;
}

.navbar a {
  text-decoration: none;
  color: white;
  font-style: italic;
  font-weight: bold;
  font-size: 24px;
}
</style>

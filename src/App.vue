<template>
  <div class="app">
    <header class="header">
      <nav class="navbar">
        <ul>
          <li><router-link to="/todos">Todos</router-link></li>
          <li><router-link to="/posts">Posts</router-link></li>
          <li><router-link to="/albums">Albums</router-link></li>
        </ul>
      </nav>
    </header>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
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

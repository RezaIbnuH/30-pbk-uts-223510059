<template>
  <div>
    <nav class="navbar">
      <ul>
        <li><router-link to="/todos" :class="{ selected: $route.path === '/todos' }">Todos</router-link></li>
        <li><router-link to="/post" :class="{ selected: $route.path === '/post' }">Post</router-link></li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.navbar {
  background-color: transparent;
  padding: 3rem;
  text-align: center;
}

.navbar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
}

.navbar ul li {
  display: inline; 
  margin-right: 2rem;
}

.navbar ul li:last-child {
  margin-right: 0;
}

.navbar ul li a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  border-radius: 5px;
  font-weight: bold;
}

.navbar ul li a.selected, .navbar ul li a:hover {
  background-color: #555;
  color: #fff;
}
</style>
<template>
  <div>
    <h1>Post Viewer</h1>
    <label for="userSelect">Select User:</label>
    <select v-model="selectedUser" @change="getPosts">
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>

    <div v-if="posts.length">
      <h2>{{ selectedUserDetails.name }}'s Posts</h2>
      <ul>
        <li v-for="post in posts" :key="post.id">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const users = ref([]);
const posts = ref([]);
const selectedUser = ref(null);
const selectedUserDetails = ref({});

const getUsers = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    users.value = data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const getUserDetails = async () => {
  if (selectedUser.value) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${selectedUser.value}`);
      const data = await response.json();
      selectedUserDetails.value = data;
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }
};

const getPosts = async () => {
  if (selectedUser.value) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`);
      const data = await response.json();
      posts.value = data;
      getUserDetails();
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }
};

onMounted(() => {
  getUsers();
});

watch(selectedUser, () => {
  getPosts();
});
</script>

<style scoped>
select {
  margin-bottom: 1.5em;
  font-size: 1.2em;
  padding: 0.5em;
}

label {
  font-weight: bold; 
  color: white;
  display: block; 
  font-size: 1.2em;
  margin-top: 20px; 
}

h1{
  text-align: center;
}

h1, h2 {
  color: white;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background: transparent;
  margin: 0.5em 0;
  color: white;
  padding: 1em;
  border: 1px solid gray;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
              0 8px 0 -3px #f6f6f6,
              0 9px 1px -3px rgba(0, 0, 0, 0.2),
              0 16px 0 -6px #f6f6f6,
              0 17px 2px -6px rgba(0, 0, 0, 1);
}

h3 {
  margin: 0 0 0.5em;
}
</style>
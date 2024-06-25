<template>
    <div>
      <h1>Album Viewer</h1>
  
      <label for="userSelect">Select User:</label>
      <select id="userSelect" v-model="selectedUserId" @change="fetchUserAlbums">
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
  
      <div v-if="albums.length">
        <h2 v-if="selectedUserDetails">{{ selectedUserDetails.name }}'s Albums</h2>
        <h2 v-else>Albums</h2>
  
        <ul>
          <li v-for="album in albums" :key="album.id">
            <h3>{{ album.title }}</h3>
            <div class="q-pa-md">
              <div class="row justify-center q-gutter-sm">
                <q-intersection
                  v-for="photo in album.photos"
                  :key="photo.id"
                  transition="scale"
                  class="example-item"
                >
                  <q-card flat bordered class="q-ma-sm" @click.prevent="showPhotoDetails(photo, album.id)">
                    <img :src="photo.thumbnailUrl" :alt="photo.title" class="photo-thumbnail">
                    <q-card-section>
                      <div class="text-h6">{{ photo.title }}</div>
                    </q-card-section>
                  </q-card>
                </q-intersection>
              </div>
            </div>
          </li>
        </ul>
      </div>
  
      <q-dialog v-model="dialogVisible" persistent>
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ selectedPhoto.title }}</div>
          </q-card-section>
          <q-img :src="selectedPhoto.url" :alt="selectedPhoto.title" class="full-size-photo"></q-img>
          <q-card-section>
            <div><strong>Album ID:</strong> {{ selectedPhoto.albumId }}</div>
            <div><strong>Photo ID:</strong> {{ selectedPhoto.id }}</div>
            <div><strong>Title:</strong> {{ selectedPhoto.title }}</div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Close" color="primary" @click="closeDialog"></q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useAlbumsStore } from '../store/albumsStore'; 
  
  const store = useAlbumsStore();
  const router = useRouter();
  const route = useRoute();
  
  const selectedUserId = ref(1);
  const albums = computed(() => store.albums);
  const selectedUserDetails = computed(() => store.selectedUserDetails);
  const dialogVisible = computed(() => store.dialogVisible);
  const selectedPhoto = computed(() => store.selectedPhoto);
  
  const users = ref([]); 
  
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      users.value = data;
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };
  
  const fetchUserAlbums = async () => {
    await store.fetchAlbums(selectedUserId.value);
  };
  
  onMounted(async () => {
    await fetchUsers();
    await fetchUserAlbums();
  });
  
  const showPhotoDetails = (photo, albumId) => {
    store.showPhotoDetails(photo);
    router.push({ path: `/albums/${albumId}`, query: { photoId: photo.id } });
  };
  
  const closeDialog = () => {
    store.closeDialog();
    const albumId = route.params.albumId;
    router.push({ path: `/albums/${albumId}` });
  };
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
  
  h1 {
    text-align: center;
    color: white;
  }
  
  h2,
  h3 {
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
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }
  
  .example-item {
    height: 200px;
    width: 200px;
  }
  
  .photo-thumbnail {
    max-width: 100%;
    max-height: 150px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  
  select {
    background-color: #333;
    border: 1px solid #555;
    color: white;
  }
  
  .full-size-photo {
    width: 100%;
    max-width: 800px;
  }
  </style>
  
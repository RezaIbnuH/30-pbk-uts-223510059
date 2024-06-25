import { defineStore } from 'pinia';

export const useAlbumsStore = defineStore('albums', {
  state: () => ({
    users: [],
    albums: [],
    selectedUser: null,
    selectedUserDetails: {},
    selectedPhoto: {},
    dialogVisible: false,
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        this.users = data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async fetchUserDetails(userId) {
      if (userId) {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
          const data = await response.json();
          this.selectedUserDetails = data;
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    },
    async fetchAlbums(userId) {
      if (userId) {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
          const data = await response.json();
          for (const album of data) {
            const photosResponse = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${album.id}`);
            const photosData = await photosResponse.json();
            album.photos = photosData;
          }
          this.albums = data;
          this.fetchUserDetails(userId);
        } catch (error) {
          console.error('Error fetching albums or photos:', error);
        }
      }
    },
    showPhotoDetails(photo) {
      this.selectedPhoto = photo;
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
  },
});

<template>
  <div>
    <div class="user-dropdown">
      <button @click="toggleDropdown">
        <i v-if="!hasUserImage" class="fas fa-user"></i>
        <img v-else :src="userImageUrl" alt="User" />
      </button>
      <div v-if="showDropdown" class="dropdown">
        <ul>
          <li class="custom-dropdown-item">
            <router-link to="/my-account" class="custom-link">Profile</router-link>
          </li>
          <li class="custom-dropdown-item">
            <span class="custom-text">Settings</span>
          </li>
          <li class="custom-dropdown-item" @click="logout">
            <span class="custom-text">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
    
  
<script>
export default {
  data() {
    return {
      showMobileMenu: false,
      hasUserImage: false, // Set this to true if user image is present
      showDropdown: false
    }
  },
  computed: {
    userImageUrl() {
      // Return the user image URL here if available
      return '/path/to/user/image.jpg';
    }
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('userid')

      this.$store.commit('removeToken')
      this.$store.commit('removeUsername')

      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
.dropdown {
  position: absolute;
  top: 100%;
  left: -4rem;
  background-color: whitesmoke;
  border-radius: 5px;
  padding: 0.5rem;
  color: black;
}

.user-dropdown.active .dropdown-menu {
  display: block;
}

.custom-dropdown-item {
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.custom-dropdown-item:hover {
  background-color: #f0f0f0; /* Change to your desired hover background color */
}

/* Style for links */
.custom-link {
  color: #007bff; /* Change to your desired link color */
  text-decoration: none;
}

.custom-link:hover {
  text-decoration: underline; /* Add underline on hover */
}

/* Style for plain text items */
.custom-text {
  color: #333; /* Change to your desired text color */
}

</style>
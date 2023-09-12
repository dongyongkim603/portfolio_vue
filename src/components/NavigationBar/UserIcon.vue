<template>
  <div>
    <div class="user-dropdown">
      <button @click="toggleDropdown">
        <i v-if="!hasUserImage" class="fas fa-user"></i>
        <img v-else class="user-icon" :src="userImageUrl" alt="User Dropdown Icon" />
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
      hasUserImage: (typeof localStorage?.thumbnailUrl  !== 'undefined' &&
        typeof this.$store.state.thumbnailUrl !== 'undefined'),
      showDropdown: false
    }
  },
  computed: {
    userImageUrl() {
      return localStorage?.thumbnailUrl || this.$store.state.thumbnailUrl
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
      localStorage.removeItem('isSuper')
      localStorage.removeItem('age')
      localStorage.removeItem('dateJoined')
      localStorage.removeItem('profileImageUrl')
      localStorage.removeItem('thumbnailUrl')
      localStorage.removeItem('uid')

      this.$store.commit('removeToken')
      this.$store.commit('removeUsername')
      this.$store.commit('removeUserDetails')

      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
.user-icon {
  width: ;
}

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
  background-color: #f0f0f0;
}

/* Style for links */
.custom-link {
  color: #333;
  text-decoration: none;
}

.custom-link:hover {
  text-decoration: underline;
}

.custom-text {
  color: #333;
}

</style>
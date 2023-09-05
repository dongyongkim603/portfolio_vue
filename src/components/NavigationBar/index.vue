<template>
  <nav class="navbar is-dark">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item"><strong>JOHN</strong></router-link>
      <a 
        class="navbar-burger" 
        aria-label="menu"
        aria-expanded="false"
        data-target="navbar-menu"
        @click="showMobileMenu = !showMobileMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div 
      class="navbar-menu"
      id="navbar-menu"
      v-bind:class="{'is-active': showMobileMenu}"
    >
      <div class="navbar-end">
        <router-link to="/about" class="navbar-item">about</router-link>
        <router-link to="/gallery" class="navbar-item">gallery</router-link>
        <router-link to="/forums" class="navbar-item">forum</router-link>
        <div class="navbar-item">
          <div v-if="!$store.state.token" class="buttons">
            <router-link to="/log-in" class="button is-light">Log in</router-link>
          </div>
          <div v-else class="buttons">
            <div class="user-dropdown">
              <!-- User Image or Icon -->
              <button @click="toggleDropdown">
                <i v-if="!hasUserImage" class="fas fa-user"></i>
                <img v-else :src="userImageUrl" alt="User" />
              </button>

              <!-- Dropdown Menu -->
              <div v-if="showDropdown" class="dropdown-menu">
                <!-- Dropdown content goes here -->
                <ul>
                  <li>Profile</li>
                  <li>Settings</li>
                  <li>Logout</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
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
    }
  }
}
</script>

<style scoped>
.user-dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  display: none;
  z-index: 10;
  background-color: yellowgreen;
  border-radius: 5px;
  padding: 0.5rem;
}

.user-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.user-dropdown button:focus + .dropdown-menu {
  display: block;
}
</style>
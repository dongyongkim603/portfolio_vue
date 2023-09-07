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
        <router-link to="/about" class="navbar-item">About</router-link>
        <!-- <router-link to="/gallery" class="navbar-item">gallery</router-link> -->
        <router-link to="/forums" class="navbar-item">Forum</router-link>
        <div class="navbar-item">
          <div v-if="!$store.state.token" class="buttons">
            <router-link to="/log-in" class="button is-light">Log in</router-link>
          </div>
        </div>
        <div class="navbar-item">
          <UserIcon v-if="$store.state.isAuthenticated"/>
        </div>
      </div>
    </div>
  </nav>
</template>
  
<script>
import UserIcon from './UserIcon.vue';

export default {
  components: {
    UserIcon
  },
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

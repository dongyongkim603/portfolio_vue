<template>
  <div id="wrapper">
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

          <div class="navbar-item">
            <div class="buttons">
              <router-link to="/log-in" class="button is-light">Log in</router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <section class="section">
      <router-view/>
    </section>

    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Contact Me</strong><br>
          <a href="mailto:dongyongkim8@gmail.com">
            <i class="fas fa-envelope"></i> <!-- Font Awesome email icon -->
            dongyongkim8@gmail.com
          </a>
        </p>
        <div class="social-icons">
          <a href="https://github.com/dongyongkim603" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-github">
              dongyongkim603
            </i>
          </a>
        </div>
        <div class="social-icons">
          <a href="https://www.linkedin.com/in/john-haney-280121140/" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-linkedin">
              John Haney
            </i>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showMobileMenu: false
    }
  }
}
</script>
<style lang="scss">
@import '../node_modules/bulma';
</style>

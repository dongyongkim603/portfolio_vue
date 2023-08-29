<template>
  <div id="wrapper">
    <NavigationBar />
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
import NavigationBar from './components/NavigationBar'

export default {
  components: {
    NavigationBar
  },
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

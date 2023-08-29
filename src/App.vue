<template>
  <div id="wrapper">
    <NavigationBar />
    <section class="section">
      <router-view/>
    </section>

    <Footer/>
  </div>
</template>
<script>
import NavigationBar from './components/NavigationBar'
import Footer from './components/Footer'

export default {
  components: {
    NavigationBar,
    Footer
  },
  data() {
    return {
      showMobileMenu: false
    }
  },
  beforeCreate() {
    document.title = 'John | Home'
  },
}
</script>
<style lang="scss">
@import '../node_modules/bulma';
</style>

<template>
  <div id="wrapper">
    <NavigationBar />
    <!-- <section class="section"> -->
      <router-view/>
    <!-- </section> -->
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
    this.$store.commit('initializeStore')
    
    // const token = this.$store.state.token
  },
}
</script>
<style lang="scss">
@import '../node_modules/bulma';
#wrapper {
  background: #a9bdff;
  // background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(25,146,187,1) 35%, rgba(0,212,255,1) 100%); 
}
</style>

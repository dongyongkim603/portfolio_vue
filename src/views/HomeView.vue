<template>
  <div class="home">
    home
    <a @click="testApi()">sanity</a>
  </div>
</template>

<script>
import sanityApi from './../helpers/sanityApi'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  methods: {
    testApi() {
      sanityApi('page')
    }
  }
}
</script>

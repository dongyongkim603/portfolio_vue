<template>
  <div class="page-forum">
    <div class="columns is-multiline">
      <div class="column is-9">
        <figure class="image mb-6">
          <img v-bind:src="forum.get_image">
        </figure>
        <h1 class="title">{{ forum.name }}</h1>
        <p>{{ forum.description }}</p>
      </div>
      <div class="cloumn is-3">
        <h2 class="subtitle">Description</h2>
      </div>
    </div>
  </div>
</template>

<script>
import apiCall from '../helpers/apiCall'

export default {
  name: 'Forum',
  data() {
    return {
      forum: {}
    }
  },
  async mounted() {
    const category_slug = this.$route.params.category_slug
    const forum_slug = this.$route.params.forum_slug
    this.forum = await apiCall('get', `forums/${category_slug}/${forum_slug}/`)
    .then(response => {
      return response?.data      
    }).catch(err => {
      console.error(err.message)
    })
  }
}
</script>

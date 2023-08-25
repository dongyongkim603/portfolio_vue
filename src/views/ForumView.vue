<template>
  <div class="forum">
    <section class="section">
      <div class="container">
        <h1 class="title">Forum</h1>
        <div class="columns">
          <div class="column is-8">
            <div class="box">
              <h2 class="subtitle">Recent Discussions</h2>
              <div v-for="forum in forums" :key="forum.id" class="media">
                <div class="media-content">
                  <p class="title is-5">{{ forum.name }}</p>
                  <!-- <p class="subtitle is-6">By {{ forum.author }}</p> -->
                  <img :src="forum.get_image" :alt="`image of ${forum.name}`"/>
                  <p>{{ forum.description }}</p>
                  <a class="button is-small is-primary" @click="viewPost(forum.id)">View Post</a>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="box">
              <h2 class="subtitle">Categories</h2>
              <ul>
                <li v-for="category in categories" :key="category.id">
                  <a @click="filterByCategory(category.id)">{{ category.name }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import apiCall from '../helpers/apiCall'

export default {
  data() {
    return {
      forums: [],
      categories: [
        { id: 1, name: "General Discussion" },
        { id: 2, name: "Technical Support" },
        // Add more categories here
      ]
    };
  },
  async mounted() {
    const data = 
    await apiCall('get', 'latest-forums/')
    .then(response => {
      return response?.data
    })
    .catch(err => {
      console.error(err.message)
      return []
    })
    console.log(data)
    this.forums = data
  },
  methods: {
    async viewPost(postId) {
      // const data = await apiCall('get', 'latest-forums/')
      // console.log(data)
      // Implement navigation to the individual post page
      // For example: this.$router.push(`/posts/${postId}`);
    },
    filterByCategory(categoryId) {
      // Implement logic to filter posts by category
      // Update the displayed posts based on the selected category
    }
  }
};
</script>

<style>
/* Add your Bulma and custom styles here */
</style>

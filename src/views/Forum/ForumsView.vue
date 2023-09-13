<template>
  <div class="forum">
    <section class="section">
      <div class="container">
        <h1 class="title">Forums</h1>
        <router-link class="button is-small is-link" :to="'/create-forum'">
          Create New Forum
        </router-link>
        <hr>
        <div class="columns">
          <div class="column is-8">
            <div class="box">
              <h2 class="subtitle">Recent Discussions</h2>
              <div class="box">
                <div v-for="forum in forums" :key="forum.id" class="media">
                  <div class="media-content">
                    <p class="title is-5">{{ forum.name }}</p>
                    <p class="title is-6">{{ forum.get_category }}</p>
                    <p class="subtitle is-6">By {{ forum.get_creator_name }}</p>
                    <img :src="forum.get_image" :alt="`image of ${forum.name}`"/>
                    <p>{{ forum.description }}</p>
                    <router-link class="button is-small is-primary" v-bind:to="forum.get_absolute_url">
                      View Forum
                    </router-link>
                  </div>
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
import apiCall from '../../helpers/apiCall'

export default {
  data() {
    return {
      forums: [],
      categories: []
    };
  },
  beforeCreate() {
    document.title = 'John | Forums'
  },
  async mounted() {
    const forums = 
    await apiCall(
      'get',
      'latest-forums/',
      this.$store.state.token
    ).then(response => {
      return response?.data
    })
    .catch(err => {
      console.error(err.message)
      return []
    })
    
    const categories = 
    await apiCall(
      'get',
      'categories/',
      this.$store.state.token)
    .then(response => {
      return response?.data
    })
    .catch(err => {
      console.error(err.message)
      return []
    })

    this.forums = forums
    this.categories = categories
  },
  methods: {
    filterByCategory(categoryId) {
      // Implement logic to filter posts by category
      // Update the displayed posts based on the selected category
    }
  }
};
</script>

<style lang="scss" scoped>
  .box{
    &.create-forum {
      width: 66.66666674%;
      margin: auto;
    }
  }

  .center-section {
    align-items: center;
  }
</style>
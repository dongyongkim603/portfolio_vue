<template>
  <div class="forum">
    <section class="section">
      <div class="container">
        <h1 class="title">Forum</h1>
        <div class="columns">
          <div class="column is-8">
            <div class="box">
              <h2 class="subtitle">Recent Discussions</h2>
              <div v-for="post in posts" :key="post.id" class="media">
                <div class="media-content">
                  <p class="title is-5">{{ post.title }}</p>
                  <p class="subtitle is-6">By {{ post.author }}</p>
                  <p>{{ post.content }}</p>
                  <a class="button is-small is-primary" @click="viewPost(post.id)">View Post</a>
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
      posts: [
        {
          id: 1,
          title: "Introduction to the Forum",
          author: "User123",
          content: "Welcome to our forum! Feel free to introduce yourself.",
          category: 1
        },
        // Add more post data here
      ],
      categories: [
        { id: 1, name: "General Discussion" },
        { id: 2, name: "Technical Support" },
        // Add more categories here
      ]
    };
  },
  methods: {
    async viewPost(postId) {
      const data = await apiCall('get', 'latest-forums/')
      console.log(data)
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

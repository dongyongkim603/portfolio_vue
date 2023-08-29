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
    <comment-form @comment-submitted="handleCommentSubmission"></comment-form>
  </div>
</template>

<script>
import apiCall from '../helpers/apiCall'
import CommentForm from './CommentForm.vue';

export default {
  name: 'Forum',
  components: {
    CommentForm
  },
  data() {
    return {
      forum: {}
    }
  },
  async mounted() {
    await this.fetchForumData()
  },
  methods: {
    async fetchForumData() {
      const category_slug = this.$route.params.category_slug
      const forum_slug = this.$route.params.forum_slug
      this.forum = await apiCall('get', `forums/${category_slug}/${forum_slug}/`)
      .then(response => {
        return response?.data      
      }).catch(err => {
        console.error(err.message)
      })
    },
    handleCommentSubmission(commentData) {
      // Handle comment submission logic, e.g., send to backend AP
      console.log('Submitted comment:', commentData);
    }
  }
}
</script>

<template>
  <div class="page-forum">
    <div class="columns is-multiline">
      <div class="column is-9">
        <figure class="image mb-6">
          <img v-bind:src="forum.get_image">
        </figure>
        <h1 class="title">{{ forum.name }}</h1>
        <div class="cloumn is-3">
          <h2 class="subtitle">Description</h2>
          <p v-if="forum.description">{{ forum.description }}</p>
          <p v-else>No description available...</p>
        </div>
      </div>
    </div>
    <CommentForm 
      :forumId="forum.id"
      @loadPostedComment="fetchCommentData"
    />
    <div 
      class="comments" 
      v-for="comment in comments"
      :key="comment.id"
    >
      <Comment :comment="comment" />
    </div>
  </div>
</template>

<script>
import apiCall from '../../helpers/apiCall'
import Comment from '../../components/Comment/index.vue';
import CommentForm from '../../components/Comment/CommentForm.vue';

export default {
  name: 'Forum',
  components: {
    CommentForm,
    Comment
  },
  data() {
    return {
      forum: {},
      comments: []
    }
  },
  async mounted() {
    await this.fetchForumData()
    await this.fetchCommentData()
  },
  methods: {
    async fetchForumData() {
      const category_slug = this.$route.params.category_slug
      const forum_slug = this.$route.params.forum_slug
      debugger
      this.forum = await apiCall(
        'get',
        `forums/${category_slug}/${forum_slug}/`,
        this.$store.state.token)
      .then(response => {
        return response?.data      
      }).catch(err => {
        console.error(err.message)
      })
    },
    async fetchCommentData() {
      this.comments = await apiCall(
        'get',
        `comments/`,
        this.$store.state.token)
      .then(response => {
        return response?.data      
      }).catch(err => {
        console.error(err.message)
      })
    }
  }
}
</script>

<template>
  <div class="comment-form">
    <h3 class="title is-4">Leave a Comment</h3>
    <form @submit.prevent="submitComment">
      <div class="field">
        <label class="label">Comment</label>
        <div class="control">
          <textarea 
            v-model="comment"
            class="textarea"
            placeholder="Your Comment" 
            :required="true"
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-primary">Submit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import apiCall from '../../helpers/apiCall';

export default {
  emits: ['loadPostedComment'],
  props: {
    forumId: Number
  },
  data() {
    return {
      name: '',
      comment: ''
    };
  },
  methods: {
    async submitComment() {
      await apiCall(
        'post',
        'comments/',
        this.$store.state.token,
        {
          creator: 1,
          forum: this.forumId,
          content: this.comment,
          image: null  // Optional: provide the image field if needed
        })
        .catch(err => {
          console.error(err.message)
          return
        })
        
      this.$emit('loadPostedComment');

      // Clear form fields
      this.name = '';
      this.comment = '';
    }
  }
};
</script>

<style scoped>
.comment-form {
  margin: 2rem 0 2rem 0;
}
</style>

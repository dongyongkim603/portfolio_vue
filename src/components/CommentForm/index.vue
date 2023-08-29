<template>
  <div class="comment-form">
    <h3 class="title is-4">Leave a Comment</h3>
    <form @submit.prevent="submitComment">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input v-model="name" class="input" type="text" placeholder="Your Name">
        </div>
      </div>
      <div class="field">
        <label class="label">Comment</label>
        <div class="control">
          <textarea v-model="comment" class="textarea" placeholder="Your Comment"></textarea>
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
export default {
  data() {
    return {
      name: '',
      comment: ''
    };
  },
  methods: {
    submitComment() {
      // Here you can emit an event to parent component to handle comment submission
      this.$emit('comment-submitted', {
        name: this.name,
        comment: this.comment
      });

      // Clear form fields
      this.name = '';
      this.comment = '';
    }
  }
};
</script>

<style scoped>
.comment-form {
  margin-top: 20px;
}
</style>

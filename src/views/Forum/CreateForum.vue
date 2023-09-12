<template>
  <div class="forum">
    <section class="section">
      <div class="container">
        <div class="comment-form">
          <h3 class="title is-4">Create a New Forum</h3>
          <form @submit.prevent="submitForum">
            <div class="field">
              <label class="label">Forum Name</label>
              <div class="control">
                <input class="input is-primary" type="text" placeholder="Primary input">
              </div>
            </div>
            <div class="field">
              <label class="label">Description</label>
              <div class="control">
                <textarea 
                  v-model="comment"
                  class="textarea"
                  placeholder="Your Comment" 
                  :required="true"
                />
              </div>
            </div>
            <img v-if="imagePreview" :src="imagePreview" alt="Image Preview" />
            <div class="file is-centered is-medium is-boxed">
              <label class="file-label">
                <input 
                  ref="fileInput"
                  class="file-input"
                  type="file"
                  name="banner"
                  @change="handleFileChange"
                  accept="image/*"
                >
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">
                    Banner Image
                  </span>
                </span>
              </label>
            </div>
            <div class="field">
              <div class="control">
                <button class="button is-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import apiCall from '../../helpers/apiCall';

export default {
  props: {
    forumId: Number
  },
  data() {
    return {
      forumName: '',
      description: '',
      bannerImage: null,
      imagePreview: null,
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];

      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = () => {
          this.imagePreview = reader.result; // Store the image data URI for preview
        };

        reader.readAsDataURL(file); // Read the selected file as a data URL
      }
    },
    async submitForum() {
      await apiCall(
        'post',
        'comments/',
        this.$store.state.token,
        {
          creator: 1,
          creator_details: 1,
          category: 1,
          name: this.forumName,
          description: this.description,
          image: this.bannerImage
        })
        .catch(err => {
          console.error(err.message)
          return
        })

      // Clear form fields
      this.forumName = ''
      this.description = ''
      this.bannerImage = null
    }
  }
};
</script>

<style scoped>
</style>

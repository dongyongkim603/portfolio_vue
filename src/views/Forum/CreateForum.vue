<template>
  <div class="forum">
    <section class="section">
      <div class="container">
        <div class="comment-form">
          <h3 class="title is-4">Create a New Forum</h3>
          <hr/>
          <form @submit.prevent="submitForum">
            <div class="field">
              <label class="label">Forum Name</label>
              <div class="control">
                <input
                  class="input is-primary"
                  type="text"
                  placeholder="Primary input"
                  :required="true"
                  v-model="forumName"
                >
              </div>
            </div>
            <label class="label">Category</label>
            <div class="select">
              <select v-model="selectedCategory" :required="true">
                <option 
                  v-for="category in categories"
                  :key="category.id"
                  :value="category"
                >
                  {{ category.name }}
                </option>
              </select>
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
import { toast } from 'bulma-toast'

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
      selectedCategory: null,
      categories: [],
    };
  },
  async mounted() {
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

    this.categories = categories
  },
  methods: {
    async checkIfForumExists() {
      return await apiCall(
        'get',
        `forums/${this.selectedCategory.slug}/${this.slugify(this.forumName)}/`,
        this.$store.state.token)
        .then(response => {
          if(response.status === 200) {
            toast({
              message: 'Forum with this title already exists.',
              type: 'is-warning',
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: 'bottom-right'
            })
            return true
          }
          return false
        })
        .catch(err => {
          console.error(err.message)
          return false
        })
    },
    slugify(str) {
      str = str.replace(/^\s+|\s+$/g, '');
      str = str.toLowerCase();
      str = str.replace(/[^a-z0-9 -]/g, '')
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-');
      return str;
    },
    handleFileChange(event) {
      const file = event.target.files[0]
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = () => {
          this.imagePreview = reader.result
        }
        reader.readAsDataURL(file)
        this.bannerImage = new FormData()
        this.bannerImage.append('image', file)
      }
    },
    async submitForum() {
      if(await this.checkIfForumExists()) {
        return 
      } else {
        await apiCall(
          'post',
          'forums/',
          this.$store.state.token,
          {
            creator: 1,
            creator_details: 1,
            category: this.selectedCategory.id,
            name: this.forumName,
            description: this.description,
            image: this.bannerImage
          },
          { headers: {'Content-Type': 'multipart/form-data'}})
          .catch(err => {
            console.error(err.message)
            return
          })
  
        this.$router.push(`forums/${this.selectedCategory.slug}/${this.slugify(this.forumName)}/`)
        this.forumName = ''
        this.description = ''
        this.bannerImage = null
      }
    }
  }
};
</script>

<style scoped>
.input-margin {
  margin: 0 1rem 0 1rem 0;
}
</style>

<template> 
  <div class="box">
    <form @submit.prevent="postUserChanges" class="image-item">
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
              Post Photo
            </span>
          </span>
        </label>
      </div>
      <div class="field">
        <label>Description</label>
        <div class="control">
          <textarea type="textarea" class="input" v-model="description"/>
        </div>
      </div>
      <div v-if="imagePreview" class="field">
        <div class="control">
          <button class="button is-dark">Post</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import apiCall from '../../helpers/apiCall'
import { 
  createProfile,
  fetchSanity
} from '../../helpers/sanity';

export default {
  name: 'MyAccount',
  props: {
    sanityProfileId: [String, Number],
    user_id: [String, Number],
    username: String,

  },
  data() {
    return {
      openPopup: false,
      uploadImage: null,
      imagePreview: null,
      imageFile: null,
      description: ''
    };
  },
  methods: {
    handleFileChange(event) {
      this.imageFile = event.target.files[0]
      if (this.imageFile && this.imageFile.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = () => {
          this.imagePreview = reader.result
        }
        reader.readAsDataURL(this.imageFile)
        this.uploadImage = new FormData()
        this.uploadImage.append('image', this.imageFile)
      }
    },
    async postUserChanges() {
      const sanityResponse = 
      await createProfile(this.sanityProfileId, this.username, this.user_id, this.imageFile)
        .catch(err => {
          console.error(err)
        })

      const imageUrl = sanityResponse.profileImageAsset.url

      const apiResponse = await apiCall(
        'patch',
        `edit-profile/${this.user_id}/`,
        this.$store.state.token,
        {
          user: this.user_id,
          age: 30,
          bio: `testing adding a bio`,
          profile_image: imageUrl,
          thumbnail: imageUrl
        })
        .then(response => {
          return response?.data
        }).catch(err => {
          console.error(err.message)
        })
    }
  }
};
</script>

<style lang="scss" scoped>
textarea {
  height: 5rem;
}

button {
  margin: 1rem auto;
}

.card {
  margin: auto;
  width: 75%;
}

.container {
  margin-top: 20px;
}

.column {
  margin-bottom: 10px;
}

.image {
  max-width: 100%;
  height: auto;
}

.image-box {
  margin: 1rem;
  display: flex;
}

.image-item {
  margin: auto;
}

.control {
  display: flex;
}

.box {
  margin: 1rem auto;
  width: 50%;
}

.container {
  display: flex;
  flex-direction: column;
}
</style>

<template>
  <div class="container">
    <h1 class="title">My Account</h1>
    <div class="card">
    <div v-if="profileImageUrl" class="card-image">
      <figure class="image is-4by3">
        <img :src="profileImageUrl" :alt="`Profile image of ${username}`">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div v-if="thumbnailUrl" class="media-left">
          <figure class="image is-48x48">
            <img :src="thumbnailUrl" :alt="`Thumbnail image of ${username}`">
          </figure>
        </div>
        <div class="media-content">
          <p v-if="firstName || lastName" class="title is-4">
            {{`${firstName} ${lastName}`}}
          </p>
          <p v-if="email" class="subtitle is-6">{{ email }}</p>
        </div>
      </div>

      <div class="content">
        {{bio}}
        <br>
        Date joined <time :datetime="dateJoined">{{ dateJoined }}</time>
      </div>
    </div>
  </div>
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
              Upload Photo
            </span>
          </span>
        </label>
      </div>
      <div v-if="imagePreview" class="field">
        <div class="control">
          <button class="button is-dark">Upload</button>
        </div>
      </div>
    </form>
  </div>
  </div>
</template>

<script>
import apiCall from '../helpers/apiCall'
import { 
  createProfile,
  fetchSanity
} from '../helpers/sanity';

export default {
  name: 'MyAccount',
  data() {
    return {
      username: this.$store.state.username || '',
      user_id: null,
      email: '',
      age: null,
      profileImageUrl: '',
      thumbnailUrl: '',
      firstName: '',
      lastName: '',
      isActive: '',
      bio: '',
      dateJoined: '',
      uploadImage: null,
      imagePreview: null,
      imageFile: null,
      sanityProfileId: null
    };
  },
  beforeCreate() {
    document.title = 'John | My Account'
  },
  async mounted() {
    const userDetails = await this.fetchUserDetails()
    this.user_id = userDetails?.get_user_id || null
    const sanityUser = 
    await this.fetchSanity(`*[_type == "profile" && uid == "${this.user_id}"]{
      _id,
      uid,
      username
    }`)
    this.sanityProfileId = sanityUser._id
    this.age = userDetails?.age || null
    this.email = userDetails?.get_email || ''
    this.firstName = userDetails?.get_first_name || ''
    this.lastName = userDetails?.get_last_name || ''
    this.profileImageUrl = userDetails?.get_profile_image || ''
    this.thumbnailUrl = userDetails?.get_thumbnail || ''
    this.dateJoined = userDetails?.get_date_joined || ''
    this.bio = userDetails?.bio || ''
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
      await createProfile(this.username, this.user_id, this.imageFile)
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
    },
    async fetchUserDetails() {
      return await apiCall(
        'get',
        `profile/${this.username}/`,
        this.$store.state.token)
        .then(response => {
          return response?.data
        }).catch(err => {
          console.error(err.message)
        })
    }
  }
};
</script>

<style scoped>
button {
  margin: 1rem auto;
}

.container {
  margin-top: 20px;
}

.title {
  font-size: 2rem;
  margin-bottom: 20px;
}

.content {
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

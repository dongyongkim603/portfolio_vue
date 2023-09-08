<template>
  <div>
    <h1>My Account</h1>
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
        Date joined <time :datetime="dateJoined">{{dateJoined}}</time>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import apiCall from '../helpers/apiCall'

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
      dateJoined: ''
    };
  },
  beforeCreate() {
    document.title = 'John | My Account'
  },
  async mounted() {
    const userDetails = await this.fetchUserDetails()
    this.user_id = userDetails?.get_user_id || null
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

<style>
/* Add your Bulma and custom styles here */
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
</style>

<template>
  <div class="container">
    <h1 class="title">{{`Hi ${username}!`}}</h1>
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

        <div class="content user-details">
          <div>
            <b>Bio: </b>{{bio}}
          </div>
          <div>
            <b>Date joined:</b> <time :datetime="dateJoined">{{ humanReadableDate(dateJoined) }}</time>
          </div>
          <div>
            <b>Birthday:</b> <time :datetime="dateJoined">{{ humanReadableDate(birthday) }}</time>
          </div>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <PopupMenu
            :uid="user_id"
            :userName="username"
            :biography="bio"
            :birth="birthday"
            :sanityProfileId="sanityProfileId"
            :profileImageUrl="profileImageUrl"
          />
        </div>
      </div>
    </div>
    <CreatePost/>
    <div class="post-container">
      <div 
        v-for="userPost in userPosts"
        :key="userPost.id"
        class="post"
      >
        <DisplayPost 
          :imageUrl="userPost.image_url"
          :description="userPost.description"
          :postDate="userPost.get_date_added"
          :username="username"
        />
      </div>
    </div>
  </div>
</template>

<script>
import apiCall from '../helpers/apiCall'
import { 
  fetchSanity
} from '../helpers/sanity';
import PopupMenu from '../components/PopupMenu/index.vue'
import CreatePost from '../components/UserPost/CreatePost.vue'
import DisplayPost from '../components/UserPost/DisplayPost.vue'
import { formatISODateToReadableDate } from '../helpers/dateTime.js'

export default {
  name: 'MyAccount',
  components: {
    PopupMenu,
    CreatePost,
    DisplayPost
  },
  data() {
    return {
      username: this.$store.state.username || '',
      user_id: null,
      email: '',
      birthday: null,
      profileImageUrl: '',
      thumbnailUrl: '',
      firstName: '',
      lastName: '',
      isActive: '',
      bio: '',
      dateJoined: '',
      sanityProfileId: null,
      userPosts: []
    };
  },
  beforeCreate() {
    document.title = 'John | My Account'
  },
  async created() {
    const userDetails = await this.fetchUserDetails()
    this.userPosts = await this.fetchUserPosts()
    this.user_id = userDetails?.get_user_id || null
    const sanityUser = 
    await fetchSanity(`*[_type == "profile" && uid == ${this.user_id}]{
      _id,
      uid,
      username
    }`)
    this.sanityProfileId = sanityUser[0]._id || 0
    this.birthday = userDetails?.birthday || null
    this.email = userDetails?.get_email || ''
    this.firstName = userDetails?.get_first_name || ''
    this.lastName = userDetails?.get_last_name || ''
    this.profileImageUrl = userDetails?.get_profile_image || ''
    this.thumbnailUrl = userDetails?.get_thumbnail || ''
    this.dateJoined = userDetails?.get_date_joined || ''
    this.bio = userDetails?.bio || ''
  },
  methods: {
    humanReadableDate(date) {
      return formatISODateToReadableDate(date)
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
    },
    async fetchUserPosts() {
      return await apiCall(
        'get',
        `user-posts/${this.username}/`,
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

<style lang="scss" scoped>
button {
  margin: 1rem auto;
}

.card {
  margin: auto;
  width: 75%;
}

.title {
  font-size: 1.5rem;
}

.content {
  margin-top: 20px;
  &.user-details {
    display: flex;
    flex-direction: column;
  }
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
  margin-top: 20px;
}

.post-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: -5px;
}

.post {
  flex: 0 0 calc(33.33% - 10px);
  margin: 5px;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .post {
    flex-basis: 100%;
  }
}
</style>

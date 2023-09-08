<template>
  <div>
    My account
    <br>
    username:{{username}}
    <br>
    email:{{email}}
    <br>
    age:{{age}}
    <br>
    isActive:{{isActive}}
    <br>
    dateJoined:{{dateJoined}}
    <br>
    firstName:{{firstName}}
    <br>
    lastName:{{lastName}}
    <br>
    <img :src="profileImageUrl" alt="Image" class="image">
    <img :src="thumbnailUrl" alt="Image" class="image">
  </div>
</template>

<script>
import apiCall from '../helpers/apiCall'

export default {
  name: 'My Account',
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
  },
  methods: {
    async fetchUserDetails(){
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
</style>

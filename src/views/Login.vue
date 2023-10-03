<template>
  <div class="page-sign-up">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">Log In</h1>
        <form @submit.prevent="submitForm">
          <div class="field">
            <label>Username</label>
            <div class="control">
              <input 
                type="text"
                class="input"
                v-model="username"
                :required="true"
              >
            </div>
          </div>
          <div class="field">
            <label>Password</label>
            <div class="control">
              <input 
                type="password"
                class="input"
                v-model="password"
                :required="true"
              >
            </div>
          </div>
          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" :key="error">{{error}}</p>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-dark">Log In</button>
            </div>
          </div>
          <hr>
          Or <router-link to="/sign-up">click here</router-link> to sign up!
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from 'bulma-toast'
import apiCall from '../helpers/apiCall'

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      errors: []
    }
  },
  beforeCreate() {
    document.title = 'Log In | John'
  },
  methods: {
    generateRandomString(length) {
      let text = '';
      let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    },
    redirectToSpotify() {
      const state = this.generateRandomString(16);
      const queryParams = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.VUE_APP_SPOTIFY_CLIENT_ID,
        redirect_uri: 'http://localhost:8080/spotify/callback',
        state: state,
        scope: 'user-top-read',
      });
      const spotifyAuthUrl = `https://accounts.spotify.com/authorize?${queryParams.toString()}`;
      window.location.href = spotifyAuthUrl;
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
    async submitForm() {
      localStorage.removeItem('token')

      const userData = {
        username: this.username,
        password: this.password
      }

      await apiCall(
        'post',
        'token/login/',
        this.$store.state.token,
        userData,
      ).then(async response => {
        const userDetails = await this.fetchUserDetails()

        const token = response.data.auth_token
        
        this.$store.commit('setToken', token)
        this.$store.commit('setUsername', this.username)
        this.$store.commit('setUserDetails', userDetails)
        
        localStorage.setItem('username', this.username)
        localStorage.setItem('token', token)
        localStorage.setItem('isSuper', userDetails.get_is_superuser)
        localStorage.setItem('uid', userDetails.id)
        localStorage.setItem('age', userDetails.age)
        localStorage.setItem('dateJoined', userDetails.get_date_joined)
        localStorage.setItem('profileImageUrl', userDetails.get_profile_image)
        localStorage.setItem('thumbnailUrl', userDetails.get_thumbnail)

        this.redirectToSpotify();
      })
      .catch(err => {
        if(err.response) {
          for(const property in err.response.data) {
            this.errors.push(`${property}: ${err.response.data[property]}`)
          }
          console.error(JSON.stringify(err.response.data))
        } else if (err.message) {
          this.errors.push('Something went wrong. Please try again')
          console.error(JSON.stringify(err))
        }
      })

    }
  }
}
</script>

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
        localStorage.setItem('age', userDetails.age)
        localStorage.setItem('dateJoined', userDetails.get_date_joined)
        localStorage.setItem('profileImageUrl', userDetails.get_profile_image)
        localStorage.setItem('thumbnailUrl', userDetails.get_thumbnail)

        const toPath = this.$route.query.to || '/'

        this.$router.push(toPath)
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

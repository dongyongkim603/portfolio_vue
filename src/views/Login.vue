<template>
  <div class="page-sign-up">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">Log In</h1>
        <form @submit.prevent="submitForm">
          <div class="field">
            <label>Username</label>
            <div class="control">
              <input type="text" class="input" v-model="username">
            </div>
          </div>
          <div class="field">
            <label>Password</label>
            <div class="control">
              <input type="password" class="input" v-model="password">
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
    submitForm() {
      this.errors = []

      if(this.username === '') {
        this.errors.push('The username cannot be empty.')
      }

      if(this.password === '') {
        this.errors.push('The password cannot be empty.')
      }

      if(!this.errors.length) {
        const userData = {
          username: this.username,
          password: this.password
        }

        apiCall('post', userData, this.$store.state.token)
        .then(response => {
          toast({
            message: 'Account created, please log in!',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: 'bottom-right'
          })
          this.$router.push('/log-in')
        })
        .catch(err => {
          if(err.response) {
            for(const property in err.response.data) {
              this.errors.push(`${property}: ${err.response.data[property]}`)
            }
            console.error(JSON.stringify(err.response.data))
          } else if (error.message) {
            this.errors.push('Something went wrong. Please try again')
            console.error(JSON.stringify(err))
          }
        })

      }
    }
  }
}
</script>

<template>
  <div>
    Code: {{spotifyCode}}
    State: {{spotifyState}}    
  </div>
</template>
<script>
import expressApi from '../../helpers/expressApi'

export default {

  name: 'Spotify Login',
  data() {
    return {
      spotifyCode: this.$route.query.code || '',
      spotifyState: this.$route.query.state || '',
    }
  },
  async mounted() {
    const auth = 
    await expressApi(
      'get', 
      `callback?code=${this.spotifyCode}&state=${this.spotifyState}`
    )
    .catch(err => {
      console.error(err.message)
      return
    })
    console.log(auth?.data?.auth?.refresh_token) 
    const refresh = 
    await expressApi(
      'post', 
      `refresh_token`,
      { refresh_token: auth.data.auth.refresh_token }
    )
    .catch(err => {
      console.error(err.message)
      return
    })
    debugger

    console.log("refresh token",refresh)
  },
  beforeCreate() {
    document.title = 'Spotify | John'
  },
  methods: {

  }
}
</script>

<script>
import apiCall from '../helpers/apiCall'

export default {
  name: 'Login',
  data() {
    return {
      spotifyCode: '',
      spotifyState: '',
    }
  },
  beforeCreate() {
    document.title = 'Spotify | John'
  },
  methods: {

  }
}
</script>

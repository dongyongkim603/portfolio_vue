import { createStore } from 'vuex'

export default createStore({
  state: {
    isAuthenticated: false,
    token: '',
    isLoading: false,
    username: '',
    isSuper: false,
    age: null,
    dateJoined: null,
    profileImageUrl: '',
    thumbnailUrl: '',
  },
  getters: {
  },
  mutations: {
    initializeStore(state) {
      if(localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.username = localStorage.getItem('username')
        state.isSuper = localStorage.getItem('isSuper')
        state.isAuthenticated = true
      } else {
        state.token = ''
        state.username = ''
        state.isAuthenticated = false
        state.isSuper = false
      }
    },
    setIsLoading(state, status) {
      state.isLoading = status
    },
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },
    removeToken(state, token) {
      state.token = ''
      state.isAuthenticated = false
    },
    setUsername(state, username) {
      state.username = username
    },
    removeUsername(state, username) {
      state.username = ''
    },
    setUserDetails(state, userDetails) {
      state.isSuper = true
      state.age = userDetails.age
      state.dateJoined = userDetails.get_date_joined,
      state.profileImageUrl = userDetails.get_profile_image
      state.thumbnailUrl = userDetails.get_thumbnail
      state.isSuper = userDetails.get_is_superuser
    },
    removeUserDetails(state, userDetails) {
      state.isSuper = false
      state.age = null
      state.dateJoined = null,
      state.profileImageUrl = ''
      state.thumbnailUrl = ''
      state.isSuper = false
    }
  },
  actions: {
  },
  modules: {
  }
})

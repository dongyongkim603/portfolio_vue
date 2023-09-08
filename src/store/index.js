import { createStore } from 'vuex'

export default createStore({
  state: {
    isAuthenticated: false,
    token: '',
    isLoading: false,
    username: '',
    isSuper: false
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
    setIsSuper(state, isSuper) {
      state.isSuper = isSuper
    },
    removeIsSuper(state, isSuper) {
      state.isSuper = false 
    }
  },
  actions: {
  },
  modules: {
  }
})

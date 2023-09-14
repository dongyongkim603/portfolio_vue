//add security

const axios = require('axios');
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1/'

export default async function apiCall(method, path, token, body, headers) {
  if(token) {
    axios.defaults.headers.common['Authorization'] = "Token " + token
  } else {
    axios.defaults.headers.common['Authorization'] = ""
  }

  let res = {}
  switch(method.toLowerCase()) {
    case "post":
      res = axios.post(path, body, headers)
        .then(response => {
          return response
        })
        .catch(err => {
          console.error(err.message)
          return { message: err.message }
        })
      break
    case "patch":
      res = axios.patch(path, body, headers)
        .then(response => {
          return response
        })
        .catch(err => {
          console.error(err.message)
          return { message: err.message }
        })
      break
    case "get":
      res = await axios.get(path)
        .then(response => {
          return response
        })
        .catch(err => {
          console.error(err.message)
          return { message: err.message }
        })
    case "delete":
      break
    default:
      res = null
  }
  return res
}
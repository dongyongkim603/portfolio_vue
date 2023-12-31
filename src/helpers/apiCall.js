//add security

const axios = require('axios');

export default async function apiCall(method, path, token, body, headers) {
  axios.defaults.baseURL = process.env.VUE_APP_DJANGO_URL
  if(token) {
    axios.defaults.headers.common['Authorization'] = "Token " + token
  } else {
    axios.defaults.headers.common['Authorization'] = ""
  }

  let res = {}
  switch(method.toLowerCase()) {
    case "post":
      res = axios.post(path, body, headers)
        .catch(err => {
          console.error(err.message)
          return { message: err.message }
        })
      break
    case "patch":
      res = axios.patch(path, body, headers)
        .catch(err => {
          console.error(err.message)
          return { message: err.message }
        })
      break
    case "get":
      res = await axios.get(path)
        .catch(err => {
          console.error(err.message)
          return { message: err.message }
        })
      break
    case "get-file":
      res = await axios.get(path, { responseType: 'blob' })
        .catch(err => {
          console.error(err.message)
          return { message: err.message }
        })
      break
    case "delete":
      break
    default:
      res = null
  }
  return res
}
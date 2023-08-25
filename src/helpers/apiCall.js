const axios = require('axios');
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1/'

export default async function apiCall(method, path, body) {
  let res = {}
  switch(method.toLowerCase()) {
    case "post":
      axios.post()
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
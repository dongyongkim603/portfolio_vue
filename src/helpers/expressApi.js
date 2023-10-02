//add security
const expressAxios = require('axios');

const headers = {
  'Content-Type': 'application/json',
};

export default async function expressApi(method, path, body) {
  expressAxios.defaults.baseURL = process.env.VUE_APP_EXPRESS_URL
  let res = {}

  switch(method.toLowerCase()) {
    case "post":
      res = expressAxios.post(path, body, headers)
        .catch(err => {
          console.error(err.message)
          return { message: err.message }
        })
      break
    case "patch":
      res = expressAxios.patch(path, body, headers)
        .catch(err => {
          console.error(err.message)
          return { message: err.message }
        })
      break
    case "get":
      res = await expressAxios.get(path)
        .catch(err => {
          console.error(err.message)
          return { message: err.message }
        })
      break
    case "get-file":
      res = await expressAxios.get(path, { responseType: 'blob' })
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

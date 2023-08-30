export default async function sanityApi(type, props) {
  let queryString = `*[_type == "${type}"]`
  
  const QUERY = encodeURIComponent(queryString)
  const URL = `https://${process.env.VUE_APP_SANITY_PROJECT_ID}` +
    `.api.sanity.io/v2021-10-21/data/query/${process.env.VUE_APP_SANITY_DATASET}?query=${QUERY}`
    
  fetch(URL)
    .then((res) => res.json())
    .then(({ result }) => {
      return result
    })
    .catch((err) => console.error(err));
}
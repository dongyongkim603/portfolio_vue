import {createClient} from '@sanity/client'

const client = createClient({
  projectId: process.env.VUE_APP_SANITY_PROJECT_ID,
  dataset: process.env.VUE_APP_SANITY_DATASET,
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2023-05-03',
})

export default async function fetchSanity(query) {
  return await client.fetch(query)
  .catch(err => {
    console.error(err.message)
    return null
  })
}

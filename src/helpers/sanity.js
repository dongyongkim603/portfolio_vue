import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.VUE_APP_SANITY_PROJECT_ID,
  dataset: process.env.VUE_APP_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2023-05-03',
})

export async function fetchSanity(query) {
  return await client.fetch(query)
    .then(res => {
      return res
    })
    .catch(err => {
      console.error(err.message)
      return null
    })
}

export async function createDocSanity(doc) {
  return await client.create(doc)
    .then(res => {
      return res
    })
    .catch(err => {
      console.error(err.message)
      return null
    })
}

export async function createIfNotExists(doc) {
  return client.createIfNotExists(doc)
    .then((res) => {
      return res
    })
    .catch(err => {
      console.error(err.message)
      return null
    })
}
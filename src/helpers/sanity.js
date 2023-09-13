import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.VUE_APP_SANITY_PROJECT_ID,
  dataset: process.env.VUE_APP_SANITY_DATASET,
  useCdn: false,
  token: process.env.VUE_APP_SANITY_TOKEN,
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

export async function fetchMultiple(ids) {
  return await client.getDocuments(ids)
  .then((docs) => {
    return docs
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

export async function createPostImage(postId, imageFile) {
  console.log(process.env)
  debugger
//   const imageAsset = await client.assets.upload('image', imageFile)

  
//   const newPostImage = {
//     _type: 'post_image',
//     post_id: postId,
//     image: {
//       _type: 'image',
//       asset: {
//         _type: 'reference',
//         _ref: imageAsset._id,
//       },
//     },
//   };
// debugger
  
//   const createdPostImage = 
//   await client.create(newPostImage)
//   .catch(err => {
//     console.error(err.message)
//     return null
//   });

//   return createdPostImage;
}

export async function createProfile(username, uid, profileImageFile, userImages = []) {
  // Upload the profile image to Sanity and get the image asset's reference
  const profileImageAsset = await client.assets.upload('image', profileImageFile);

  // Create a new profile document
  const newProfile = {
    _type: 'profile',
    username: username,
    uid: uid,
    profileImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: profileImageAsset._id, // Reference to the uploaded profile image asset
      },
    },
    usersImages: userImages, // You can pass an array of user images here
  };

  // Use the client to create the new document
  const createdProfile = await client.create(newProfile);

  return createdProfile;
}
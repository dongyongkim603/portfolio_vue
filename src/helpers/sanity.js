import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.VUE_APP_SANITY_PROJECT_ID,
  dataset: process.env.VUE_APP_SANITY_DATASET,
  useCdn: false,
  token: process.env.VUE_APP_SANITY_TOKEN,
  apiVersion: '2023-05-03',
})

const newPostImage = (postId, imageAsset) => {
  return {
    _type: 'post_image',
    post_id: postId,
    image: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: imageAsset._id,
      },
    },
  }
};

const newProfile = (_id, username, uid, profileImageAsset, userImages) => {
  return {
    _id: _id,
    _type: 'profile',
    username: username,
    uid: uid,
    profileImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: profileImageAsset._id,
      },
    },
    usersImages: userImages,
  }
}

export async function fetchSanity(query) {
  return await client.fetch(query)
    .then(res => {
      return res
    })
    .catch(err => {
      console.error(err.message)
      return err.message
    })
}

export async function fetchMultiple(ids) {
  return await client.getDocuments(ids)
  .then((docs) => {
    return docs
  })
  .catch(err => {
    console.error(err.message)
    return err.message
  })
}

export async function createDocSanity(doc) {
  return await client.create(doc)
    .then(res => {
      return res
    })
    .catch(err => {
      console.error(err.message)
      return err.message
    })
}

export async function createIfNotExists(doc) {
  return client.createIfNotExists(doc)
    .then((res) => {
      return res
    })
    .catch(err => {
      console.error(err.message)
      return err.message
    })
}

export async function createOrReplace(doc) {
  client.createOrReplace(doc)
  .then((res) => {
    return res
  })
  .catch(err => {
    console.error(err.message)
    return err.message
  })
}

export async function createPostImage(postId, imageFile) {
  const imageAsset = 
  await client.assets.upload('image', imageFile)
  .catch(err => {
    console.error(err.message)
    return err.message
  })

  const image = newPostImage(postId, imageAsset)
  
  const createdPostImage = 
  await client.create(image)
  .catch(err => {
    console.error(err.message)
    return err.message
  });

  return createdPostImage;
}

export async function createOrReplaceProfile(_id, username, uid, profileImageFile, userImages = []) {
  const profileImageAsset = await client.assets.upload('image', profileImageFile)
  const profile = newProfile(_id, username, uid, profileImageAsset, userImages)
  const err = await createOrReplace(profile)
  .catch(err => {
    console.error(err.message)
    return err
  })

  if(err) {
    return err
  }
  return {
    profileImageAsset,
    profile
  };
}

export async function prependUserPost(uid, postId, imageFile) {
  try {
    const imageAsset = await client.assets.upload('image', imageFile)
    const postImage = newPostImage(imageAsset._id, imageAsset)
    const response = await client
      .patch('m91XOnio4LVIQdOZNBQoRh')
      .setIfMissing({usersImages: []})
      .prepend('usersImages', [
        postImage
      ])
      .commit({autoGenerateArrayKeys: true})

    return {
      imageAsset,
      response
    };
  } catch(err) {
    console.error(err.message)
    return err
  }
}

export function imagePostUrl(ref) {
  return `${process.env.VUE_APP_SANITY_IMAGE_URL}/${process.env.VUE_APP_SANITY_PROJECT_ID}` + 
  `/${process.env.VUE_APP_SANITY_DATASET}/${transformFileName(ref)}`
}

function transformFileName(inputFileName, newExtension) {
  const fileNameWithoutPrefix = inputFileName.replace(/^image-/, '');
  const fileExtensionMatch = fileNameWithoutPrefix.match(/-(\w+)$/);
  if (fileExtensionMatch) {
    const currentExtension = fileExtensionMatch[1];
    const updatedFileName = fileNameWithoutPrefix.replace(
      `-${currentExtension}`,
      `.${newExtension}`
    );
    return updatedFileName;
  }
  return inputFileName;
}
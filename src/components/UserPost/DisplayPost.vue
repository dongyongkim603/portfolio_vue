<template> 
  <div class="box">
    <img v-if="imageUrl" :src="imageUrl" alt="Image Preview" />
    <div class="content user-details">
      <div>
        <b>Date Posted: </b>{{postDate}}
      </div>
      <div v-if="username">
        <b>Username: </b>{{username}}
      </div>
      <div v-if="description">
        <b>Description: </b>{{description}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyAccount',
  props: {
    sanityProfileId: [String, Number],
    user_id: [String, Number],
    username: String,
    description: String,
    imageUrl: String,
    postDate: Date
  }
};
</script>

<style lang="scss" scoped>
textarea {
  height: 5rem;
}

button {
  margin: 1rem auto;
}

.card {
  margin: auto;
  width: 75%;
}

.container {
  margin-top: 20px;
}

.column {
  margin-bottom: 10px;
}

.image {
  max-width: 100%;
  height: auto;
}

.image-box {
  margin: 1rem;
  display: flex;
}

.image-item {
  margin: auto;
}

.control {
  display: flex;
}

.box {
  margin: 1rem auto;
  width: 50%;
}

.container {
  display: flex;
  flex-direction: column;
}
</style>

<template> 
  <div class="box post">
    <div class="image-container">
      <img 
        v-if="imageUrl"
        :src="imageUrl"
        alt="Image Preview"
        class="image"
      />
    </div>
    <div class="content user-details">
      <div>
        <b>Date Posted: </b>{{ humanReadableDate(postDate) }}
      </div>
      <div v-if="username">
        <b>Username: </b>{{ username }}
      </div>
      <div v-if="description">
        <b>Description: </b>{{ description }}
      </div>
    </div>
  </div>
</template>

<script>
import { formatISODateToReadableDate } from '../../helpers/dateTime.js'
export default {
  name: 'MyAccount',
  props: {
    sanityProfileId: [String, Number],
    user_id: [String, Number],
    username: String,
    description: String,
    imageUrl: String,
    postDate: [Date, String]
  },
  methods: {
    humanReadableDate(date) {
      return formatISODateToReadableDate(date)
    }
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
  height: 100%;
  width: 100%;
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
  &.post {
    width: 100%;
    height: 100%;
  }
}

.container {
  display: flex;
  flex-direction: column;
}

.image-container {
  display: flex;
  margin: 1rem auto;
  width: 80%;
  height: 60%;
  box-shadow: 1.5px 1.5px 1.5px 1.5px #00c4a7;
}
</style>

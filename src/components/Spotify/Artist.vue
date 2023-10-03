<template>
  <div class="artist-info">
    <div class="column">
      <div class="column is-one-third">
        <h1><b>{{ artist.name }}</b></h1>
        <p><b>Genres:</b> {{ artist.genres.join(', ') }}</p>
        <p><b>Popularity:</b> {{ artist.popularity }}</p>
        <p><b>Followers:</b> {{ artist.followers.total }}</p>
        <a :href="artist.external_urls.spotify" target="_blank">Spotify Profile</a>
        <div v-for="image in artist.images" :key="image.url">
          <img :src="image.url" :alt="artist.name" :width="image.width" :height="image.height" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    artist: Object,
  },
};
</script>

<style scoped>
.column,
.artist-info {
  padding: 10px;
  border-radius: 5px;
  margin-top: auto;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  width: 90%;
}

img {
  margin: 10px;
}
</style>

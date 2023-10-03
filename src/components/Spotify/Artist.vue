<template>
  <div class="artist-info">
    <h1>{{ artist.name }}</h1>
    <p>Genres: {{ artist.genres.join(', ') }}</p>
    <p>Popularity: {{ artist.popularity }}</p>
    <p>Followers: {{ artist.followers.total }}</p>
    <h2>External Links:</h2>
    <a :href="artist.external_urls.spotify" target="_blank">Spotify Profile</a>
    <h2>Images:</h2>
    <div v-for="image in artist.images" :key="image.url">
      <img :src="image.url" :alt="artist.name" :width="image.width" :height="image.height" />
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
.artist-info {
  text-align: center;
  margin: 20px;
}

img {
  margin: 10px;
}
</style>

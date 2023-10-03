<template>
  <div class="artist-info">
    <div class="column">
      <div class="column is-one-third">
        <a :href="artist.external_urls.spotify" target="_blank">
          <section class="artist-section">
            <h1 class="title is-4"><b>{{ artist.name }}</b></h1>
            <p><b>Genres</b> {{ artist.genres.join(', ') }}</p>
          </section>
          <section class="artist-section">
            <img
              :src="artist.images[0].url"
              :alt="artist.name"
              :width="artist.images[0].width"
              :height="artist.images[0].height" 
            />
          </section>
        </a>
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

<style lang="scss" scoped>
.column,
.artist-info {
  border-radius: 5px;
  margin-top: auto;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  width: 90%;
  align-content: center;
  justify-content: center;

  &.is-one-third {
    margin: auto;
  }
}
.artist-section {
  height: 50%;
  margin-top: 1rem;
}

img {
  max-height: 100%;
  max-width: 100%;
  border-radius: 1rem;
}
</style>

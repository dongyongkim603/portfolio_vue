<template>
  <div class="image-gallery">
    <div class="columns is-multiline">
      <div class="column is-4" v-for="image in images" :key="image.id">
        <div class="image-card">
          <img :src="image.url" alt="Image" class="image">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageGallery',
  props: {
    images: Array,
  },
};
</script>

<style scoped>
.image-gallery {
  padding: 20px;
}

.image-card {
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.image {
  max-width: 100%;
  height: auto;
}
</style>
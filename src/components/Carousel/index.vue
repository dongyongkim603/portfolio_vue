<template>
  <div class="carousel-inner">
    <div 
      class="carousel-item"
      v-for="(imageUrl, index) in imagesUrls"
      :key="index"
      :style="{ 'display': index === currentIndex ? 'flex' : 'none' }"
    >
      <img :src="imageUrl" alt="Carousel Image">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imagesUrls: Array,
    headline: String,
    carouselName: String,
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  mounted() {
    this.startSlideshow();
  },
  methods: {
    startSlideshow() {
      setInterval(() => {
        this.nextImage();
      }, 3000);
    },
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.imagesUrls.length;
    },
  },
};
</script>

<style scoped>
img {
  margin: 0 0 0 1rem;
  overflow: hidden;
  max-height: 100%;
  max-width: 100%;
  border-radius: 3rem;
  box-shadow: 5px 5px 5px #ffb5d6;
}

.carousel-inner {
  margin: auto;
}

.carousel-item {
  max-width: 25rem;
  max-height: 20rem;
  margin: auto;
}
</style>

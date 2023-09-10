<template>
  <div class="carousel">
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
  </div>
</template>

<script>
export default {
  props: {
    imagesUrls: Array, // Corrected prop name here (with 's')
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
      this.currentIndex = (this.currentIndex + 1) % this.imagesUrls.length; // Corrected prop name here (with 's')
    },
  },
};
</script>

<style scoped>
img {
  margin: auto;
  overflow: hidden;
  max-height: 100%;
  max-width: 100%;
}

.carousel {
  width: 35rem;
  
  margin: auto;
  background-color: #f0f0f0;
  padding: 2rem;
  box-shadow: 5px 5px 5px;
}

.carousel-inner {
  width: 30rem;
  height: 25rem;
  margin: auto;
}

.carousel-item {
  width: 30rem;
  height: 25rem;
  margin: auto;
}
</style>

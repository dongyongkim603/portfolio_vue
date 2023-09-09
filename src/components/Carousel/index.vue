<template>
  <div class="carousel">
    <div class="carousel-inner">
      <div 
        class="carousel-item"
        v-for="(image, index) in images"
        :key="index"
        :class="{ 'is-active': index === currentIndex }"
      >
        <img :src="image" alt="Carousel Image">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: Array
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
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
  },
};
</script>

<style>
.carousel {

}
</style>

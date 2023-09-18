<template>
  <div class="banner-container">
    <Carousel
      v-if="carouselUrls"
      :imagesUrls="carouselUrls"
      :headline="''"
    />
    <div class="banner" :style="bannerStyle">
      <!-- Content for the banner -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Carousel from '../../components/Carousel/index.vue'

export default {
  name: 'Banner',
  components: {
    Carousel
  },
  props: {
    imageUrl: String,
    carouselUrls: Array
  },
  computed: {
    bannerStyle() {
      return {
        backgroundImage: `url(${this.imageUrl})`,
      };
    },
  },
};
</script>

<style scoped>
.banner {
  height: 300px;
  width: 90%;
  margin: 2rem;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 3rem;
  box-shadow: 5px 5px 5px #ffb5d6;
}

.banner-container{
  display: flex;
  flex-basis: 1rem;
}
</style>

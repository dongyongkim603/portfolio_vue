<template>
  <div class="banner" :style="bannerStyle">
    <!-- Content for the banner -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  props: {
    imageUrl: String,
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
  height: 300px; /* Adjust the height as needed */
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff; /* Set text color for content */
}
</style>

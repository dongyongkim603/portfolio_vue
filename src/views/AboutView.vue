<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ImageGalary
      :images="imageData"
    />
  </div>
</template>

<script>
import ImageGalary from './../components/ImageGallary/index.vue'

export default {
  name: 'About',
  components: {
    ImageGalary
  },
  data() {
    return {
      imageData: [
        { id: 1, url: 'John_portfolio/portfolio_vue/src/assets/AboutImages/1598624160181.jpg' },
        // { id: 2, url: '/Users/johnhaney/Code/Django/John_portfolio/portfolio_vue/src/assets/AboutImages/FB_IMG_1652280542780.jpg' },
        // { id: 3, url: 'John_portfolio/portfolio_vue/src/assets/AboutImages/received_388398701744553.jpeg' },
        // { id: 4, url: 'John_portfolio/portfolio_vue/src/assets/AboutImages/Screenshot 2023-08-29 at 22-39-59 John Haney (@dongyongkim) • Instagram photos and videos.png' },
      ]
    }
  },
  beforeCreate() {
    document.title = 'John | About'
  },
}
</script>


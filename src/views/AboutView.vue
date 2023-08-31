<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Banner 
      :imageUrl="banner"
    />
    <ImageGalary
      :images="imageData"
    />
  </div>
</template>

<script>
import fetchSanity from '../helpers/sanity'
import ImageGalary from './../components/ImageGallary/index.vue'
import Banner from './../components/Banner/index.vue'

export default {
  name: 'About',
  components: {
    ImageGalary,
    Banner
  },
  data() {
    return {
      banner: '',
      imageData: [
        { id: 1, url: 'path_to_your_image1.jpg' },
        { id: 2, url: 'path_to_your_image2.jpg' },
      ]
    }
  },
  async beforeCreate() {
    document.title = 'John | About'
    const pageData = 
    await fetchSanity(`*[_type == "page" && name == "About"]{
        _id,
        url,
        name,
        headline,
        banner{
          asset->{
            _id,
            url
          },
          alt
        }
      }`)
    this.banner = pageData[0].banner.asset.url
    console.log(this.banner)
  },
}
</script>


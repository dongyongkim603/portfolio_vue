<template>
  <div class="about">
    <h1 class="title" v-if="headline">{{headline}}</h1>
    <Banner 
      v-if="banner"
      :imageUrl="banner"
    />
    <ImageGalary
      v-if="imageData.length > 0"
      :images="imageData"
    />
    <div v-if="sellingPoints" class="columns">
      <SellingPoint
        v-for="sellingPoint in sellingPoints"
        :key="sellingPoint.id"
        :sellingPoint="sellingPoint"
      />
    </div>
  </div>
</template>

<script>
import { fetchSanity } from '../helpers/sanity'
import ImageGalary from './../components/ImageGallary/index.vue'
import Banner from './../components/Banner/index.vue'
import SellingPoint from './../components/SellingPoint/index.vue'

export default {
  name: 'About',
  components: {
    ImageGalary,
    Banner,
    SellingPoint
  },
  data() {
    return {
      banner: '',
      headline: '',
      imageData: [],
      sellingPoints: []
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
        components[]{
          button,
          button_link,
          headline,
          content,
          main_image{
            asset->{
              _id,
              url
            },
            alt
          }
        },
        banner{
          asset->{
            _id,
            url
          },
          alt
        }
      }`)
    console.log(pageData)
    this.banner = pageData[0]?.banner?.asset?.url
    this.headline = pageData[0]?.headline
    this.sellingPoints = pageData[0]?.components
  },
}
</script>
<style scoped>

</style>

<template>
  <div class="home">
    <section class="section title">
      <h1 class="title" v-if="headline">{{headline}}</h1>
    </section>
    <Banner 
      v-if="banner"
      :imageUrl="banner"
      :carouselUrls="carouselUrls"
    />
    <section class="section">
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
      <!-- <Carousel
        v-if="carouselData"
        :imagesUrls="carouselUrls"
        :headline="''"
      /> -->
    </section>
  </div>
</template>

<script>
import Carousel from '../components/Carousel/index.vue'
import Banner from '../components/Banner/index.vue'
import ImageGalary from '../components/ImageGallary/index.vue'
import SellingPoint from '../components/SellingPoint/index.vue'

import { fetchSanity } from '../helpers/sanity'

export default {
  name: 'HomeView',
  components: {
    Carousel,
    Banner,
    ImageGalary,
    SellingPoint
  },
  data() {
    return {
      carouselData: null,
      sellingPoints: [],
      imageData: [],
      headline: '',
      banner: '',
    }
  },
  async beforeCreate() {
    document.title = 'John | About'
    const pageData = 
    await fetchSanity(`*[_type == "page" && name == "Home"]{
      _id,
      url,
      name,
      headline,
      page_carousel{
        name,
        headline,
        images[]{
            asset->{
              _id,
              url
            },
            alt
        }
      },
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
    this.banner = pageData[0]?.banner?.asset?.url
    this.headline = pageData[0]?.headline
    this.sellingPoints = pageData[0]?.components
    this.carouselData = pageData[0]?.page_carousel
  },
  computed: {
    carouselUrls() {
      return this.carouselData?.images.map(item => item.asset.url);
    }
  }
}
</script>

<style lang="scss" scoped>
.section {
&.title {
    background: #ffe5f0;
    margin-bottom: 0;
  }
}
</style>

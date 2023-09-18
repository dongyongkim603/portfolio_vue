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
      <div class="selling-point title">
        <h3 class="subtitle is-3">Projects</h3>
      </div>
      <div v-if="sellingPoints" class="columns usp">
        <SellingPoint
          v-for="sellingPoint in sellingPoints"
          :key="sellingPoint.id"
          :sellingPoint="sellingPoint"
          class="selling-point"
        />
      </div>
    </section>
    <section class="section">
      <div class="selling-point title">
        <h3 class="subtitle is-3">Resume</h3>
      </div>
      <div class="columns usp">
        resume
      </div>
    </section>
    <ImageGalary
      v-if="imageData.length > 0"
      :images="imageData"
    />
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

.title{
  color: #193db1;
  font-size: 3rem;
}

.columns {
  &.usp {
    display: flex;
  }
}

.selling-point {
  background: #ffe5f0;
  border-radius: 3rem;
  margin: 1rem;
  flex: 1 1 0px;
  box-shadow: 5px 5px 5px ;

  &.title {
    width: 20%;
    height: 4rem;
    display: flex;
  }
}

.subtitle {
  margin: auto;
}
</style>

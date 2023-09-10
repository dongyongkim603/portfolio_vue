<template>
  <div class="home">
    home
    <Carousel
      v-if="carouselData"
      :imagesUrls="carouselUrls"
      :headline="''"
    />
  </div>
</template>

<script>
import Carousel from '../components/Carousel/index.vue'
import fetchSanity from '../helpers/sanity'

export default {
  name: 'HomeView',
  components: {
    Carousel
  },
  data() {
    return {
      carouselData: null,
      sellingPoints: [],
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
    console.log(pageData)
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

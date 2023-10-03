<template>
  <div>
    <section v-motion-fade-visible class="section title">
      <h1 class="title" v-if="headline">{{headline}}</h1>
    </section>
    <Banner 
      v-motion-fade-visible
      v-if="banner"
      :imageUrl="banner"
    />
    <section class="section">
      <div class="about">
        <ImageGalary
          v-if="imageData.length > 0"
          :images="imageData"
          v-motion-fade-visible
        />
        <h3 class="title is-3">Professional Sites</h3>
        <div v-motion-fade-visible v-if="sellingPoints" class="columns">
          <SellingPoint
            v-for="sellingPoint in sellingPoints"
            :key="sellingPoint.id"
            :sellingPoint="sellingPoint"
            class="selling-point"
          />
        </div>
      </div>
    </section>
    <section v-if="recentTracks" class="section">
      <div class="title-icon">
        <h3 class="title is-3">Top Listens</h3>
        <i class="fa-brands fa-spotify"></i>
      </div>
      <div 
        v-if="sellingPoints"
        class="spotify-collection"
      >
        <div 
          v-for="track in recentTracks.data.recent_tracks.items"
          :key="track.id"
          class="spotify-artist"
          v-motion-fade-visible 
        >
          <Artist v-motion-fade-visible :artist="track" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { fetchSanity } from '../helpers/sanity'
import ImageGalary from './../components/ImageGallary/index.vue'
import Banner from './../components/Banner/index.vue'
import Artist from './../components/Spotify/Artist.vue'
import SellingPoint from './../components/SellingPoint/index.vue'
import expressApi from '../helpers/expressApi'
import testData from './spotify-test-data.json'

export default {
  name: 'About',
  components: {
    ImageGalary,
    Banner,
    SellingPoint,
    Artist
  },
  data() {
    return {
      banner: '',
      headline: '',
      imageData: [],
      sellingPoints: [],
      recentTracks: testData//null
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
    this.banner = pageData[0]?.banner?.asset?.url
    this.headline = pageData[0]?.headline
    this.sellingPoints = pageData[0]?.components
    // this.recentTracks = await this.getSpotifyTop()
    // console.log(this.recentTracks)
    // debugger
  },
  methods: {
    async getSpotifyTop() {
      return await expressApi('post', 'recent-tracks')
    }
  }
}
</script>
<style scoped lang="scss">
.section {
  &.title {
    background: #ffe5f0;
    margin-bottom: 0;
  }
}

.spotify-collection {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.selling-point {
  background: #ffe5f0;
  border-radius: 3rem;
  margin: 1rem;
  box-shadow: 5px 5px 5px ;
}

.spotify-artist {
  background: #e5ffe6b6;
  border-radius: 3rem;
  margin: 1rem;
  box-shadow: 5px 5px 5px #1DB954;
}

.title-icon {
  display: flex;
}

.fa-brands {
  &.fa-spotify {
    margin-bottom: 1.25rem;
    margin-top: auto;
    margin-left: 1rem;
    font-size: 3rem;
    color: #1DB954;
  }
}
</style>

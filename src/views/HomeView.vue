<template>
  <div class="home">
    <div v-if="pageHtml" v-html="pageHtml"></div>
    <section v-motion-fade-visible class="section title">
      <h1 class="title" v-if="headline">{{headline}}</h1>
    </section>
    <Banner 
      v-motion-fade-visible
      v-if="banner"
      :imageUrl="banner"
      :carouselUrls="carouselUrls"
    />

    <button label="test" class="button is-info" @click="redirectToSpotify"> test </button>

    <section v-motion-fade-visible class="section">
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
    <Resume
      :resumeUrl="resumeUrl"
      :resumeHtml="resumeHtml"
    />
    <ImageGalary
      v-motion-fade-visible
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
import Resume from '../components/Resume/index.vue'

import { fetchSanity } from '../helpers/sanity'
import apiCall from '../helpers/apiCall'
import expressApi from '../helpers/expressApi'

export default {
  name: 'HomeView',
  components: {
    Carousel,
    Banner,
    ImageGalary,
    SellingPoint,
    Resume
  },
  data() {
    return {
      carouselData: null,
      sellingPoints: [],
      imageData: [],
      headline: '',
      banner: '',
      resumeHtml: '',
      resumeUrl: '',
      pageHtml: ''
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
    await apiCall(
      'get',
      'homepage-detail/',
      this.$store.state.token
    ).then(response => {
      this.resumeHtml = response?.data[0]?.get_resume_html
      this.resumeUrl = response?.data[0]?.get_resume_url
    }).catch(err => {
      console.error(err.message)
      return ''
    })
  },
  methods: {
    generateRandomString(length) {
      let text = '';
      let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    },
    redirectToSpotify() {
      const state = this.generateRandomString(16);
      const queryParams = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.VUE_APP_SPOTIFY_CLIENT_ID,
        redirect_uri: 'http://localhost:8080/spotify/callback',
        state: state,
        scope: 'user-top-read',
      });
      const spotifyAuthUrl = `https://accounts.spotify.com/authorize?${queryParams.toString()}`;
      window.location.href = spotifyAuthUrl;
    },
    async downloadResume() {
      await apiCall('get-file',
        'download-resume/',
        this.$store.state.token)
        .then(async response => {
          const blob = new Blob([response?.data], { type: 'application/octet-stream' });

          const url = window.URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = 'resume.docx';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          return response?.data[0]?.get_resume_file
      }).catch(err => {
        console.error(err.message)
        return ''
      })
    },
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

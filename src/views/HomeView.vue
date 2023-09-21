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
    <section 
      v-if="resumeHtml"
      class="section"
      v-motion-fade-visible
    >
      <div class="resume-ctas">
        <div class="selling-point title">
          <h3 class="subtitle is-3">Resume</h3>
        </div>
        <div class="button-container">
          <button class="button is-info" @click="downloadResume">
            Download Resume
          </button>
        </div>
      </div>
      <div v-motion-fade-visible class="columns">
        <div 
          :ref="'resume'"
          class="resume"
        >
          <div v-motion-fade-visible v-html="resumeHtml"></div>
        </div>
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
import apiCall from '../helpers/apiCall'

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
      resumeHtml: '',
      resumeUrl: '',
      resumeFile: null,
      isResumeVisible: false,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.checkResumeVisibility)
    this.checkResumeVisibility()
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
    checkResumeVisibility() {
      const element = this.$refs.resume;
      if (element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        console.log(this.isResumeVisible)
        console.log(rect.top, 0)
        console.log( rect.bottom, windowHeight)
        if (rect.top >= 0 && rect.bottom <= windowHeight) {
          this.isResumeVisible = true;
        } else {
          this.isResumeVisible = false;
        }
      }
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

.resume {
  margin: 2rem 5rem 5rem 5rem;
  background-color: white;
  padding: 5rem;
}

.resume-ctas {
  display: flex;
  justify-content: space-between;
  align-items: center; 
}

.button-container {
  width: 20%;
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

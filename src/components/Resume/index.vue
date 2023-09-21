<template>
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
</template>

<script>
import apiCall from '../../helpers/apiCall'

export default {
  props: {
    resumeHtml: String,
    resumeUrl: String,
  },
  methods: {
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

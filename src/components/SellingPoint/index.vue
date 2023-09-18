<template>
  <div class="selling-point">
    <div class="column">
      <div class="column is-one-third">
        <h2 class="title">{{ sellingPoint.headline }}</h2>
        <img 
          v-if="sellingPoint.main_image"
          :src="sellingPoint.main_image.asset.url"
          alt="Main Image" 
          class="image"
        />
      </div>
      <div class="column">
        <p class="subtitle">{{ sellingPoint.content }}</p>
      </div>
      <a :href="sellingPoint.button_link" class="button is-info">{{ sellingPoint.button }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SellingPoint',
  props: {
    sellingPoint: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.column,
.selling-point {
  padding: 10px;
  border-radius: 5px;
  margin-top: auto;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  width: 90%;
}

.image {
  max-width: 100%;
}

.title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.subtitle {
  margin-bottom: 20px;
}

.button {
  padding: 10px 20px;
}
</style>

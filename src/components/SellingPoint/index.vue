<template>
  <div class="selling-point">
    <div class="column">
      <div class="column is-one-third">
        <img :src="sellingPoint.main_image.asset.url" alt="Main Image" class="image" />
      </div>
      <div class="column">
        <h2 class="title">{{ sellingPoint.headline }}</h2>
        <p class="subtitle">{{ sellingPoint.content }}</p>
        <a :href="sellingPoint.button_link" class="button is-primary">{{ sellingPoint.button }}</a>
      </div>
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

<style scoped>
.column
.selling-point {
  padding: 20px;
  border: 1px solid rgb(36, 129, 206);
  border-radius: 5px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  width: fit-content;
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

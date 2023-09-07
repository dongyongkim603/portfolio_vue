<template>
  <div class="box">
    <article class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img :src="comment.get_image" alt="User Avatar">
        </figure>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{ comment.get_creator }}</strong>
            <br>
            {{ comment.content }}
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    comment: Object,
  },
};
</script>

<style scoped>
/* Add your custom CSS styles here */
</style>

<template>
  <div class="box">
    <article class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img :src="comment.get_creator_thumbnail" :alt="`${comment.get_creator}'s User Avatar`">
        </figure>
      </div>
      <div class="media-content">
        <div class="comment-content">
          <p>
            <strong>@{{ comment.get_creator }}</strong> | {{showTimeSince(comment.date_added)}}
            <br>
            {{ comment.content }}
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { timeSince } from '../../helpers/dateTime.js'

export default {
  props: {
    comment: Object,
  },
  methods: {
    showTimeSince(date) {
      return timeSince(date)
    }
  }
};
</script>

<style scoped>
  .comment-content {
    margin: auto 2rem auto auto 2rem;
  }
</style>

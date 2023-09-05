<template>
  <div>
    My account
  </div>
</template>

<script>
import apiCall from '../helpers/apiCall'

export default {
  name: 'My Account',
  data() {
    return {

    };
  },
  beforeCreate() {
    document.title = 'John | My Account'
  },
};
</script>

<style>
/* Add your Bulma and custom styles here */
</style>

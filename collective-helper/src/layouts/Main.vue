<template>
  <div class="container">
    <a class="block-link" href="/">
      <img src="../assets/kollektivlogocropped.png" width="50%" class="center">
    </a>
    <ul>
      <li>
        <v-link href="/">Home</v-link>
        <v-link href="/laundry">Laundry</v-link>
        <v-link href="/cleaning">Cleaning</v-link>
      </li>
    </ul>
    <div class="home-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import VLink from '../components/VLink.vue'

  export default {
    components: {
      VLink
    },
  }
</script>

<style scoped lang="css">
 @import "./stylesheets/Main.scss";
</style>

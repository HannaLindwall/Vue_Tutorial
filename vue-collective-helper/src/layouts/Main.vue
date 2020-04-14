<template>
  <div class="container">
    <a class="block-link" href="/">
      <img src="../../public/kollektivlogocropped.png" width="50%" class="center">
    </a>
    <ul>
      <li>
        <v-link href="/">Home</v-link>
        <v-link href="/laundry">Laundry</v-link>
        <v-link href="/cleaning">Cleaning</v-link>
      </li>
    </ul>

    <slot></slot>
  </div>
</template>

<script>
  import VLink from '../components/VLink.vue'

  export default {
    components: {
      VLink
    },
    methods: {
      clickRoute() {
        console.log("clicked");
      }
    }
  }
</script>

<style scoped lang="css">
  .container {
    max-width: 100%;
    background: white;
    font-family: 'Montserrat', sans-serif;
  }
  .container ul {
    list-style: none;
    text-align: center;
    padding-left: 0;
    padding-top: 30px;
    padding-bottom: 30px;
    background: rgb(233, 245, 235);
  }
  .container ul li {
    display: flex;
    justify-content: space-evenly;
  }
  .container ul li a {
    text-decoration: none;
    font-weight: bold;
    color: gray;
    font-size: x-large;
  }
  .block-link {
    display: block;
  }
  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>

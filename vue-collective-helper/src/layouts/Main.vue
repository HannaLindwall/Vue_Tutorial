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
    background-color: rgba(240, 246, 243, 0.4);;
    font-family: 'Montserrat', sans-serif;
    margin: 0px;
  }
  .container ul {
    list-style: none;
    text-align: center;
    padding-left: 0;
    padding-top: 50px;
    padding-bottom: 50px;
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
    background: white;
  }
  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .home-container {
    display: grid;
    grid-template-columns: 410px 1fr;
  }
</style>

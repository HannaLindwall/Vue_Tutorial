<template>
  <div id="app" class="app-container">
    <a class="block-link" href="/">
      <img src="./assets/kollektivlogocropped.png" width="50%" class="center">
    </a>
    <nav>
      <router-link :style="homeIsActive" to="/home" v-on:click.native="isActive()">Home</router-link>
      <router-link :style="laundryIsActive" to="/laundry" v-on:click.native="isActive()">Laundry</router-link>
      <router-link :style="cleaningIsActive" to="/cleaning" v-on:click.native="isActive()">Cleaning</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      homeIsActive: {
      },
      laundryIsActive: {
      },
      cleaningIsActive: {
      }
    }
  },
  created() {
    var current = this.$router.currentRoute.name
    if (current === "home" || current === "default") {
        this.homeIsActive = {fontWeight: "bold"}
      } else if (current === "laundry") {
        this.laundryIsActive = {fontWeight: "bold"}
      } else if (current === "cleaning") {
        this.cleaningIsActive = {fontWeight: "bold"}
      }
  },
  methods: {
    isActive() {
      var current = this.$router.currentRoute.name
      if (current === "home" || current === "default") {
        this.homeIsActive = {fontWeight: "bold"}
        this.laundryIsActive = {fontWeight: "normal"}
        this.cleaningIsActive = {fontWeight: "normal"}
      } else if (current === "laundry") {
        this.homeIsActive = {fontWeight: "normal"}
        this.laundryIsActive = {fontWeight: "bold"}
        this.cleaningIsActive = {fontWeight: "normal"}
      } else if (current === "cleaning") {
        this.homeIsActive = {fontWeight: "normal"}
        this.laundryIsActive = {fontWeight: "normal"}
        this.cleaningIsActive = {fontWeight: "bold"}
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');
@import "./App.scss";
</style>

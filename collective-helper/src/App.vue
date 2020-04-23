<template>
  <div id="app" class="app-container">
    <a class="block-link" href="/">
      <img src="./assets/kollektivlogocropped.png" width="50%" class="center">
    </a>
    <nav>
      <router-link to="/home">Home</router-link>
      <router-link to="/laundry">Laundry</router-link>
      <router-link to="/cleaning">Cleaning</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');
@import "./App.scss";
</style>

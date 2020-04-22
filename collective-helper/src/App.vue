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

body {
  font-family: 'Montserrat', sans-serif;
}
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.block-link {
  display: block;
  background: white;
  padding-top: 50px;
  padding-bottom: 50px;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.app-container {
  max-width: 100%;
  background-color: rgba(240, 246, 243, 0.4);
  font-family: 'Montserrat', sans-serif;
  margin: 0px;
}
.app-container>nav {
  padding-top: 50px;
  padding-bottom: 50px;
  background: rgb(233, 245, 235); 
  display: flex;
  justify-content: space-evenly;
}

nav>a {
  text-decoration: none;
  color: gray;
  font-size: xx-large;
}
nav>a:hover {
  color: gray;
  text-decoration: none;
}
nav>a:focus {
  font-weight: bold;
}
</style>

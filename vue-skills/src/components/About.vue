<template>
    <div class="about">
        <h1>This is an about page</h1>
        <p> Lorem ipsum... {{ their_name }}</p>
    </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      their_name: this.$route.params.name
    }
  }
}
</script>
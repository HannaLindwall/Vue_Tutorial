<template>
  <main-layout>
    <div class="cleaning-sidebar">
      <cleaners />
    </div>
    <div class="cleaning-checklist-container">
      <div class="weekly-cleaning">
        <h1>Weekly Cleaning</h1>
        <ul>
          <li v-for="(clean, index) in weeklycleaning" :key='index'>
            <div class="margin-to-the-left">
              <p-check color="success">
                  {{clean}}
              </p-check>
            </div>
          </li>
        </ul>
      </div>
      <div class="big-cleaning">
        <h1>Big Collective Cleaning</h1>
        <ul>
          <li v-for="(clean, index) in bigcleaning" :key='index'>
            <div  class="margin-to-the-left">
              <p-check color="success">
                  {{clean}}
              </p-check>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </main-layout>
</template>

<script>
  import MainLayout from '../layouts/Main.vue'
  import Cleaners from '../components/Cleaners.vue'

  export default {
    components: {
      MainLayout,
      Cleaners
    }, 
    data() {
      return {
        weeklycleaning: [
          "item1",
          "item2"
        ],
        selectedWeeklyItems: [],
        bigcleaning: [
          "item1",
          "item2"
        ],
        selectedBigItems: []
      }
    },
     watch: {
      selectedWeeklyItems: function (newVal, oldVal) {
        // Do what you want with the selected objects:
        console.log(newVal)
      },
      selectedBigItems: function (newVal, oldVal) {
        console.log(newVal)
      }
    },
  }
</script>

<style scoped lang="css">
.cleaning-sidebar {
  color: gray;
}
.cleaning-checklist-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 20px 20px 20px 20px;
}
h1 {
  color: gray;
  margin-left: 20px;
}
.cleaning-checklist-container div>ul {
  margin: 20px 20px 20px 20px;
  border-radius: 10px;
}
.cleaning-checklist-container div>ul>li {
  background: white;
  color: gray;
  text-align: left; 
  width: 80%; 
  display: inline-block;
  padding-top: 20px;
  padding-bottom: 20px;
}
.margin-to-the-left {
  margin-left: 20px;
}
</style>

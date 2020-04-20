<template>
  <main-layout>
    <div class="cleaning-sidebar">
      <cleaner-list />
    </div>
    <div class="cleaning-checklists-container">
      <cleaning-list :header="'Weekly Cleaning'" :cleaningList="weeklycleaning" />
      <cleaning-list :header="'Big Collective Cleaning'" :cleaningList="bigcleaning"/>
    </div>
  </main-layout>
</template>

<script>
  import CleanerList from '../components/CleanerList.vue'
  import CleaningList from "../components/CleaningList.vue"
  import fetchData from "../api/fetchData.js"
  import MainLayout from '../layouts/Main.vue'

  export default {
    components: {
      CleanerList,
      CleaningList,
      MainLayout
    }, 
    data() {
      return {
        weeklycleaning: [],
        bigcleaning: [],
      }
    },
    created() {
      this.weeklycleaning = fetchData.getWeeklyCleaningList()
      this.bigcleaning = fetchData.getBigCleaningList()
    }
  }
</script>

<style scoped lang="css">
h1 {
  color: gray;
  margin-left: 20px;
}
.cleaning-checklists-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 20px 20px 20px 20px;
}

.cleaning-sidebar {
  color: gray;
}

</style>

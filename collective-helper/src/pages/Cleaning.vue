<template>
  <b-row class="fix-weight">
    <b-col class="col-lg-3">
      <div class="cleaning-sidebar">
        <cleaner-list />
      </div>
    </b-col>
    <b-col>
      <div class="cleaning-checklists-container">
        <b-row>
          <b-col>
            <cleaning-list :header="'Weekly Cleaning'" :cleaningList="weeklycleaning" :cleaningListType="1"/>
          </b-col>
          <b-col>
            <cleaning-list :header="'Big Collective Cleaning'" :cleaningList="bigcleaning" :cleaningListType="2"/>
          </b-col>
        </b-row>
      </div>
    </b-col>
  </b-row>
</template>

<script>
  import CleanerList from '../components/CleanerList.vue'
  import CleaningList from "../components/CleaningList.vue"
  import fetchData from "../api/fetchData.js"

  export default {
    components: {
      CleanerList,
      CleaningList,
    }, 
    data() {
      return {
        weeklycleaning: [],
        bigcleaning: [],
      }
    },
    async created() {
      try {
        const weeklycleaning = await fetchData.getWeeklyCleaningList()
        this.weeklycleaning = weeklycleaning.data
        const bigcleaning = await fetchData.getBigCleaningList()
        this.bigcleaning = bigcleaning.data
      } catch(err) {
        console.log(err.message)
      }
    }
  }
</script>

<style scoped lang="scss">
@import "./stylesheets/Cleaning.scss";
</style>

<template>
    <div>
        <div class="list-cleaning-names">
            <img src="../assets/cleaning2.png" width="40%" class="style-cleaning-img">
            <b-row align-v="center">
                <div class="style-weekly-cleaner">
                    <h3 class="weekly-cleaner">Weekly Cleaners</h3>
                    <ul>
                        <li v-for="(cleanerdata, index) in cleaners" :key='index'>
                            {{cleanerdata}}
                        </li>
                    </ul>
                </div>
            </b-row>
        </div>
        <div class="next-cleaning">
            <h3>Next Collective Cleaning:</h3>
            <p> {{date.date}} ({{date.daysleft}} days left) </p>
        </div>
    </div>
</template>

<script>
import fetchData from "../api/fetchData.js"
  
  export default {
    components: {
    },
    data() {
        return {
            cleaners: [],
            date: null,
        }
    },
    created() {
        this.cleaners = fetchData.getWeeklyCleaners()
        this. date = fetchData.getDateOfBigCleaning()
    }
    
  }
</script>

<style scoped lang="scss">
@import "./stylesheets/CleanerList.scss";
</style>
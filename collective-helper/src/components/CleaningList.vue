<template>
    <div class="cleaninglist-container">
        <h1>{{header}}</h1>
        <ul>
          <li v-for="(clean, index) in cleaningList" :key='index'>
            <div class="margin-to-the-left">
              <p-check color="success" v-model="clean.done" @change="selectedCleaningItems2(clean)">
                  {{clean.cleaning_item}}
              </p-check>
            </div>
          </li>
        </ul>
      </div>
</template>

<script>
import "pretty-checkbox-vue/dist/pretty-checkbox-vue.min.js"
import fetchData from "../api/fetchData.js"

export default {
    props: {
        header: {
            type: String,
            required: true
        },
        cleaningList: {
            type: Array,
            required:true
        },
        cleaningListType: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            selectedCleaningItems: []
        }
    },
    watch: {
        selectedCleaningItems: function (newVal, oldVal) {
            // Do what you want with the selected objects:
            console.log(newVal, oldVal)
            console.log("hej")
        }
    },
    methods: {
        async selectedCleaningItems2(clean) {
            try {
                if (this.cleaningListType === 1) {
                    await fetchData.updateWeeklyCleaningItem(clean._id, clean.done)
                } else {
                    await fetchData.updateBigCleaningItem(clean._id, clean.done)
                }
            } catch(err) {
                console.log(err.message)
            }
        }
    },
}
</script>

<style scoped lang="scss">
@import "./stylesheets/CleaningList.scss";
</style>
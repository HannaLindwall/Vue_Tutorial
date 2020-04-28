<template>
    <div class="cleaninglist-container">
        <h1>{{header}}</h1>
        <ul>
          <li v-for="(clean, index) in cleaningList" :key='index'>
            <div class="margin-to-the-left">
              <p-check color="success">
                  {{clean.cleaning_item}}
              </p-check>
            </div>
          </li>
        </ul>
      </div>
</template>

<script>
import "pretty-checkbox-vue/dist/pretty-checkbox-vue.min.js"
export default {
    props: {
        header: {
            type: String,
            required: true
        },
        cleaningList: {
            type: Array,
            required:true
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
        }
    },
}
</script>

<style scoped lang="scss">
@import "./stylesheets/CleaningList.scss";
</style>
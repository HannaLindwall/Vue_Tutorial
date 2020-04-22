<template>
    <div class="cleaninglist-container">
        <h1>{{header}}</h1>
        <ul>
          <li v-for="(clean, index) in cleaningList" :key='index'>
            <div class="margin-to-the-left">
              <p-check color="success">
                  {{clean}}
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

<style scoped lang="css">

h1 {
    color: gray;
}

.cleaninglist-container>ul {
    margin: 50px 20px 20px 20px;
    border-radius: 10px;
    padding-top: 50px;
    padding-bottom: 50px;
    background: rgb(233, 245, 235);
    text-align: center;
    padding-left: 0px;
}
.cleaninglist-container>ul>li {
  background: white;
  color: gray;
  text-align: left; 
  width: 80%; 
  list-style: none;
  text-align: left;
  display: inline-block;
  padding-top: 20px;
  padding-bottom: 20px;
}

.margin-to-the-left {
    margin-left: 20px;
}

</style>
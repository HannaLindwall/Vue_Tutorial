<template>
  <b-row class="fix-weight">
    <b-col>
      <div class="home-sidebar">
        <div class="home-sidebar-cal">
          <p-calendar v-model="date14" :inline="true" :showWeek="true"></p-calendar>
        </div>
        <cleaner-list />
      </div>
    </b-col>
    <b-col>
      <div class="neewsfeed-container">
        <h1>News Feed</h1>
          <ul class="neewsfeed-list">
            <li v-for="(newsdata, index) in news" :key='index'>
              <div>
                <h3>{{newsdata.title}}</h3>
                <div>
                  <span v-if="!newsdata.readMoreActivated">{{newsdata.text.slice(0, 700)}}...   </span>
                  <button v-if="!newsdata.readMoreActivated" v-on:click="activateReadMore(newsdata.key)">{{newsdata.readText}}</button>
                  <span v-if="newsdata.readMoreActivated" v-html="newsdata.text"></span>
                  <button v-if="!newsdata.readLessActivated" v-on:click="activateReadLess(newsdata.key)">{{newsdata.readText}}</button>
                </div>
              </div>
            </li>
          </ul>
      </div> 
    </b-col>
  </b-row>
</template>

<script>
  import CleanerList from '../components/CleanerList.vue'
  import fetchData from "../api/fetchData.js"

  export default {
    components: {
      CleanerList
    },
    data() {
      return {
        date14: null,
        news: [],
      }
    },
    methods: {
      activateReadMore(key) {
        var isReadMoreActivated = this.news[key].readMoreActivated
        console.log("just testing" + isReadMoreActivated)
        this.news[key].readMoreActivated = true
        this.news[key].readText = "(Read Less)"
        this.news[key].readLessActivated = false
      },
      activateReadLess(key) {
        var isReadLessActivated = this.news[key].readLessActivated
        console.log("just testing" + isReadLessActivated)
        this.news[key].readLessActivated = true
        this.news[key].readText = "(Read More)"
        this.news[key].readMoreActivated = false
      }
    },
    created() {
      this.news = fetchData.getNews()
    }
  }
</script>

<style scoped lang="scss">
 @import "./stylesheets/Home.scss";
</style>

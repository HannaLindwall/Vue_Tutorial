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

<style scoped lang="css">
  h1, h3, p, span {
    color: gray;
  }
  .fix-weight {
    width: 100%;
  } 
  .home-sidebar {
    padding-left: 20px;
    margin-top: 100px;
  }
  .neewsfeed-container {
    margin: 100px 100px 100px 0px;
    text-align: left;
  }
  .neewsfeed-container ul {
    width: 60vw;
    border-radius: 10px;
    list-style: none;
    background: rgb(233, 245, 235);
    padding: 50px 50px 30px 50px;
    margin-top: 50px;
  }
  .neewsfeed-container ul>li {
   background: white;
   margin: 20px 20px 50px 20px;
   max-height: 305px;
   border-radius: 5px;
   overflow: auto;
  }
  .neewsfeed-container ul>li>div {
    padding: 20px;
    width: 100%;
    text-align: left;
  }
  .neewsfeed-container ul>li>div>div>button {
    font-size: medium;
    color:lightblue;
    border: none;
    background: white;
  }
  .neewsfeed-container ul>li>div>div>button:hover {
    text-decoration: underline;
  }
  .neewsfeed-container ul>li>div>div>button:focus {
    outline: 0;
  }
  .neewsfeed-container ul>li>div>div>span {
    line-height: 2;
    white-space: pre-line;
  }
</style>

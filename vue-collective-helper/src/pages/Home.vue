<template>
  <main-layout>
      <div class="home-sidebar">
        <div class="home-sidebar-cal">
          <p-calendar v-model="date14" :inline="true" :showWeek="true"></p-calendar>
        </div>
        <cleaners />
      </div>
      <div class="neewsfeed-container">
        <h1>News Feed</h1>
          <ul class="neewsfeed-list">
            <li v-for="(newsdata, index) in news" :key='index'>
              <div>
                <h3>{{newsdata.title}}</h3>
                <div>
                  <span v-if="!newsdata.readMoreActivated">{{newsdata.text.slice(0, 800)}}...   </span>
                  <button v-if="!newsdata.readMoreActivated" v-on:click="activateReadMore(newsdata.key)">{{newsdata.readText}}</button>
                  <span v-if="newsdata.readMoreActivated" v-html="newsdata.text"></span>
                  <button v-if="!newsdata.readLessActivated" v-on:click="activateReadLess(newsdata.key)">{{newsdata.readText}}</button>
                </div>
              </div>
            </li>
          </ul>
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
        value: null,
        cleaners: [
          "Name1",
          "Name2"
        ],
        date: {
          "date": "XX/XX-XX",
          "daysleft": "X"
        },
        news: [
          {
            "key": 0,
            "title": "Newsfeed title 1", 
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "readMoreActivated": false,
            "readLessActivated": true,
            "readText": "(Read More)"
          },
          {
            "key": 1,
            "title": "Newsfeed title 2",
            "text": "Newsfeed text 2",
            "readMoreActivated": true,
            "readLessActivated": true,
            "readText": ""
          }
        ],
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
    }
  }
</script>

<style scoped lang="css">
  .home-sidebar {
    padding-left: 20px;
    margin-top: 30px;
  }
  h1, h3, p, span {
    color: gray;
  }
  .neewsfeed-container {
    margin-left: 100px;
  }
  .neewsfeed-container ul {
    width: 60vw;
    border-radius: 10px;
    border: solid 2px #e6e6e6
  }
  .neewsfeed-container ul>li {
   background: white;
   margin: 20px 20px 20px 20px;
   max-height: 300px;
   border-radius: 5px;
  }
  .neewsfeed-container ul>li>div {
    padding: 20px;
    width: 100%;
    text-align: left;
    overflow: auto;
  }
  .neewsfeed-container ul>li>div>div>span {
    line-height: 2;
    white-space: pre-line;
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
</style>

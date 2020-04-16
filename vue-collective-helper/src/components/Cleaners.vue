<template>
    <div>
        <div class="list-cleaning-names">
            <img src="../../public/cleaning2.png" width="40%" class="style-cleaning-img">
            <div class="style-weekly-cleaner">
                <h3 class="weekly-cleaner">Weekly Cleaners</h3>
                <ul>
                    <li v-for="(cleanerdata, index) in cleaners" :key='index'>
                        {{cleanerdata}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="next-cleaning">
            <h3>Next Collective Cleaning:</h3>
            <p> {{date.date}} ({{date.daysleft}} days left) </p>
        </div>
    </div>
</template>

<script>
  
  export default {
    components: {
    },
    data() {
        return {
            cleaners: [
                "Name1",
                "Name2"
            ],
            date: {
            "date": "XX/XX-XX",
            "daysleft": "X"
            },
        }
    }
  }
</script>

<style scoped lang="css">
h3, p {
    color: gray;
}
.list-cleaning-names {
    display: flex;
    margin-top: 30px;
  }
.list-cleaning-names ul {
    list-style-type: circle;
    padding-left: 20px;
    padding-top: 0px;
    padding-bottom: 0px;
    background: none;
}
.list-cleaning-names ul li{
    color: gray;
    padding-bottom: 10px;
    display: list-item;
    text-align: left;
}
.next-cleaning {
    text-align: center;
}
</style>
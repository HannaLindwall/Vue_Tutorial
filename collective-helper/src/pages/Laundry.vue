<template>
  <b-row class="fix-weight">
    <b-col cols="3">
      <div class="laundry-sidebar laundry-container">
        <h1>My Bookings:</h1>
        <p v-if="nbrOfBookings===0">{{noBookings}}</p>
        <div class="bookings-container" v-if="nbrOfBookings!==0">
          <ul class="bookings-list">
            <transition-group name="machine-list" enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
              <li class="booking-listitem" v-for="(booking, index) in bookings" :key="`booking.title-${index}`">
                <div class="booking-content">
                  <p>Machine: {{booking.title}}</p>
                  <p>Date: {{booking.date}}</p>
                  <p>Time: {{booking.time}}:00-{{calculateEndTime(booking.time)}}:00</p>
                </div>
                <div class="remove-booking-container">
                  <button class="remove-booking-button" v-on:click="removeBooking(index)">X</button>
                </div>
              </li>
            </transition-group>
          </ul>
        </div>
      </div>
    </b-col>
    <b-col>
      <div class="laundry-timeslots-container laundry-container">
        <div class="laundry-cal">
          <p-calendar v-model="date14" :inline="true" :showWeek="true"></p-calendar>
        </div>
        <div class="slot-text-style">
          <h1>Available Time Slots</h1>
          <p v-if="nbrOfAvailableSlots===0">{{noAvailableSlots}}</p>
        </div>
        <div class="timeslot-container" v-if="nbrOfAvailableSlots!==0">
          <ul class="timeslot-list">
            <li class="timeslot-listitem" v-for="(availableSlot, slotindex) in availableSlots" :key="`availableSlot.time-${slotindex}`">
              <div class="timeslot-content">
                <h3>Time: {{availableSlot.time}}:00-{{calculateEndTime(availableSlot.time)}}:00</h3>
                <ul class="machines-list">
                  <transition-group name="machine-list" enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
                    <li class="machine-listitem" v-for="(availableMachine, machineindex) in availableSlot.machines" :key="`availableMachine-${machineindex}`" transition="fade">
                        <button class="machine-button" :style="buttonStyle" v-on:click="clickOnMachine(slotindex, availableSlot.time, availableMachine, machineindex)">{{availableMachine}}</button>
                    </li>
                  </transition-group>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
  import fetchData from "../api/fetchData.js"

  export default {
    components: {
    },
    data() {
      return {
        nbrOfBookings: 0,
        noBookings: "No current bookings.",
        bookings: [],
        nbrOfAvailableSlots: 0,
        noAvailableSlots: "No time slots for the chosen date.",
        availableSlots: [],
        buttonStyle: {
          backgroundColor: "gray",
          color: "lightgray"
        },
        selectedDate: "XX/XX-XX",
        date14: null
      }
    },
    methods: {
      calculateEndTime(startTime) {
        var endTime = startTime+2
        if (endTime > 23) {
          endTime = endTime - 20
        }
        return endTime
      },
      clickOnMachine(slotIndex, starttime, machine, machineindex) {
        this.bookings.push({"title": machine, date: this.selectedDate,"time": starttime})
        this.availableSlots[slotIndex].machines.splice(machineindex, 1)
      },
      removeBooking(bookingIndex) {
        var starttime = this.bookings[bookingIndex].time 
        var title = this.bookings[bookingIndex].title 
        this.availableSlots.find(function(slot) {return slot.time===starttime}).machines.push(title)
        this.bookings.splice(bookingIndex, 1)
      }
    },
    created() {
      this.bookings = fetchData.getBookings()
      this.nbrOfBookings = this.bookings.length
      this.availableSlots = fetchData.getAvailableSlots()
      this.nbrOfAvailableSlots = this.availableSlots.length
    }
  }
</script>

<style scoped lang="css">
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
h1, h3, p {
  color: gray;
}
.fix-weight {
  width: 100%;
}
.laundry-cal {
  margin-left: 22%;
  margin-top: 100px;
}
.laundry-container {
  margin-bottom: 100px;
  text-align: left;
  margin-left: 10%;
}
.laundry-container>div>ul>span>li {
  text-align: left;
  width: 100%;
  margin-top: 10px;
}
.laundry-sidebar {
  margin-left: 50px;
  margin-top: 100px;
  text-align: left;
}
.laundry-sidebar>.bookings-container {
  width: 80%;
  margin-top: 50px;
}
.laundry-sidebar>div>ul {
  background: gray;
  border-radius: 10px;
  padding-top: 20px;
  padding-bottom: 30px;
}
.laundry-sidebar>.bookings-container>.bookings-list>span>.booking-listitem{
  display: inline-flex;
  justify-content: space-around;
}
.laundry-sidebar>div>ul>span>li>div>p {
  margin: 5px;
   color:  rgb(233, 245, 235);
}
.laundry-timeslots-container>div>ul {
  background: white;
  width: 50%;
  padding: 0px;
  margin-top: 50px;
}
.laundry-timeslots-container>div>ul>li {
  display: inline-block;
  text-align: left;
  width: 100%;
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin: 0px;
}
.laundry-timeslots-container>div>ul>li>div {
  margin-left: 30px; 
}
.laundry-timeslots-container>div>ul>li:nth-child(odd) {
  background: rgb(233, 245, 235);
}
.machine-button {
  border: none;
  border-radius: 50%;
  padding: 10px 20px 10px 20px;
  font-weight: bold;
  font-size: 20px;
}
.machine-button:focus {
  outline: 0;
}
.remove-booking-button {
  border-radius: 5px;
  background: none;
  border: solid 1px rgb(233, 245, 235);
  color: rgb(233, 245, 235);
  padding: 5px 10px 5px 10px;
  font-weight: bold;
  height: 35px;
  width: 35px;
}
.remove-booking-container {
  display: flex;
  align-items: center;
}
.timeslot-content {
  padding-top: 15px;
}
.timeslot-content>.machines-list {
  background: none;
  padding: 10px 0px 10px 0px;
  list-style: none;
}
.timeslot-content>.machines-list>span {
  display: flex;
  margin-bottom: 10px;
}
.timeslot-content>.machines-list>span>.machine-listitem {
  padding-right: 20px;
}
</style>

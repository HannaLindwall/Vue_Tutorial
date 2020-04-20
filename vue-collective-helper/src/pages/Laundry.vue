<template>
  <main-layout>
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
  </main-layout>
</template>

<script>
  import MainLayout from '../layouts/Main.vue'

  export default {
    components: {
      MainLayout
    },
    data() {
      return {
        nbrOfBookings: 1,
        noBookings: "No current bookings.",
        bookings: [
          {"title": "1", "date": "XX/XX-XX", "time": 10},
          {"title": "2", "date": "XX/XX-XX", "time": 16}
        ],
        nbrOfAvailableSlots: 1,
        noAvailableSlots: "No time slots for the chosen date.",
        availableSlots: [
          {time: 12, machines: ["1", "2"]},
          {time: 14, machines: ["2", "3"]},
        ],
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
        this.availableSlots.find(function(slot, index) {return slot.time===starttime}).machines.push(title)
        this.bookings.splice(bookingIndex, 1)
      }
    }
  }
</script>

<style scoped lang="css">
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
h1, h3, p {
  color: gray;
}
.laundry-cal {
  margin-left: 22%;
  margin-top: 80px;
}
.laundry-container {
  margin-bottom: 100px;
}
.laundry-container>div>ul>span>li {
  text-align: left;
  width: 100%;
  margin-top: 10px;
}
.laundry-sidebar {
  margin-left: 20px;
}
.laundry-sidebar>.bookings-container {
  width: 80%;
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
  padding: 10px 17px 10px 17px;
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
.slot-text-style {
  margin-left: 25%;
}
.timeslot-container {
  margin-left: 15%;
}
.timeslot-content>.machines-list {
  background: none;
  padding: 0px 0px 10px 0px;
}
.timeslot-content>.machines-list>span {
  display: flex;
  margin-bottom: 10px;
}
.timeslot-content>.machines-list>span>.machine-listitem {
  padding-right: 20px;
}
</style>

<template>
  <b-row class="fix-weight">
    <b-col class="col-xl-3">
      <div class="laundry-sidebar laundry-container">
        <h1>My Bookings:</h1>
        <p v-if="nbrOfBookings===0">{{noBookings}}</p>
        <div class="bookings-container" v-if="nbrOfBookings!==0">
          <ul class="bookings-list">
            <transition-group name="machine-list" enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
              <li class="booking-listitem" v-for="(booking) in bookings" :key="`${booking.id}`">
                <div class="booking-content" :key="`${booking.dateOnly}${booking.timeOnly}${booking.machine}`">
                  <p>Machine: {{booking.machine}}</p>
                  <p>Date: {{booking.dateOnly}}</p>
                  <p>Time: {{booking.timeOnly}}-{{calculateEndTime(booking.timeOnly)}}:00</p>
                </div>
                <div class="remove-booking-container">
                  <button class="remove-booking-button" v-on:click="removeBooking(booking.id)">X</button>
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
                <h3>Time: {{availableSlot.startTime}}:00-{{availableSlot.endTime}}:00</h3>
                <ul class="machines-list">
                  <transition-group name="machine-list" enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
                    <li class="machine-listitem" v-for="(availableMachine, machineindex) in availableSlot.machines" :key="`${availableMachine.id}`" transition="fade">
                        <button class="machine-button" :style="buttonStyle" v-on:click="clickOnMachine(slotindex, availableSlot.startTime, availableMachine.name, machineindex)" :key="`availableMachine-${availableMachine.id}`">{{availableMachine.name}}</button>
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
        selectedDate: "2020-04-28",
        date14: null,
        user: "Hanna Lindwall",
      }
    },
    methods: {
      calculateEndTime(startTime) {
        var time = startTime.split(":")[0]
        return parseInt(time, 10) + 4
      },
      async clickOnMachine(slotIndex, starttime, machine) {
        try {
          const insertDate = this.selectedDate + "T" + (parseInt(starttime, 10)<10?'0':'') + starttime + ":00:00.000+00:00"
          await fetchData.insertBooking(insertDate, this.user, machine)
          
          // this.bookings.push({"title": machine, date: this.selectedDate,"time": starttime})
          // this.availableSlots[slotIndex].machines.splice(machineindex, 1)
          const bookings = await fetchData.getBookings(this.user)
          this.bookings = bookings.data
          this.nbrOfBookings = this.bookings.length

          const availableSlots = await fetchData.getAvailableSlots(this.selectedDate)
          this.availableSlots = availableSlots.data
          this.nbrOfAvailableSlots = this.availableSlots.length
        } catch(err) {
          console.log(err.message)
        }
      },
      async removeBooking(bookingIndex) {
        try {
          await fetchData.removeBooking(bookingIndex)
          // var starttime = this.bookings[bookingIndex].time 
          // var title = this.bookings[bookingIndex].title 
          // this.availableSlots.find(function(slot) {return slot.time===starttime}).machines.push(title)
          // this.bookings.splice(bookingIndex, 1)
          const bookings = await fetchData.getBookings(this.user)
          this.bookings = bookings.data
          this.nbrOfBookings = this.bookings.length

          const availableSlots = await fetchData.getAvailableSlots(this.selectedDate)
          this.availableSlots = availableSlots.data
          this.nbrOfAvailableSlots = this.availableSlots.length
        } catch(err) {
          console.log(err.message)
        }

      }
    },
    async created() {
      try {
        const bookings = await fetchData.getBookings(this.user)
        this.bookings = bookings.data
        this.nbrOfBookings = this.bookings.length
        
        const availableSlots = await fetchData.getAvailableSlots(this.selectedDate)
        this.availableSlots = availableSlots.data
        this.nbrOfAvailableSlots = this.availableSlots.length
      } catch(err) {
        console.log(err.message)
      }
    }
  }
</script>

<style scoped >
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
@import "./stylesheets/Laundry.scss";
</style>

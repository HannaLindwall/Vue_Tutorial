<template>
  <b-row class="fix-weight">
    <b-col class="col-xl-3">
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

<style scoped >
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
@import "./stylesheets/Laundry.scss";
</style>

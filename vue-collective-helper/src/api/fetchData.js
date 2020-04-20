import {Data} from "./server.js"

function getAvailableSlots() {
    return Data.availableSlots
}

function getBigCleaningList() {
    return Data.bigcleaning
}

function getBookings() {
    return Data.bookings
}

function getDateOfBigCleaning() {
    return {date: Data.nextBigCleaningDate, daysleft: "X"}
}

function getNews() {
    return Data.news
}

function getWeeklyCleaners() {
    return Data.cleaners
}

function getWeeklyCleaningList() {
    return Data.weeklycleaning
}


export default {
    getAvailableSlots,
    getBigCleaningList, 
    getBookings,
    getDateOfBigCleaning, 
    getNews,
    getWeeklyCleaners,
    getWeeklyCleaningList
}
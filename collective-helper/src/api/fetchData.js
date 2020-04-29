import axios from 'axios';

const cleaning_url = 'api/cleaning'
const common_url = 'api/common'
const home_url = 'api/home'
const laundry_url = 'api/laundry'

function getAvailableSlots(date) {
    const uri = '/availabletimeslots/' + date
    return new Promise((resolve, reject) => {
        try {
            const res = axios.get(laundry_url + uri)
            resolve(res)
        } catch (err) {
            reject(err.message)
        }
    })
}

function getBigCleaningList() {
    const uri = '/bigcleaninglist'
    return new Promise((resolve, reject) => {
        try {
            const res = axios.get(cleaning_url + uri)
            resolve(res)
        } catch (err) {
            reject(err.message)
        }
    })
}

function getBookings(user) {
    const uri = '/bookings/' + user
    return new Promise((resolve, reject) => {
        try {
            const res = axios.get(laundry_url + uri)
            resolve(res)
        } catch (err) {
            reject(err.message)
        }
    })
}

function getDateOfBigCleaning() {
    const uri = '/nextbigcleaningdate'
    return new Promise((resolve, reject) => {
        try {
            const res = axios.get(common_url + uri)
            resolve(res)
        } catch (err) {
            reject(err.message)
        }
    })
}

function getNews() {
    const uri = '/news'
    return new Promise((resolve, reject) => {
        try {
            const res = axios.get(home_url + uri)
            resolve(res)
        } catch (err) {
            reject(err.message)
        }
    })
}

function getWeeklyCleaners() {
    const uri = '/cleanerslist'
    return new Promise((resolve, reject) => {
        try {
            const res = axios.get(common_url + uri)
            resolve(res)
        } catch (err) {
            reject(err.message)
        }
    })
}

function getWeeklyCleaningList() {
    const uri = '/weeklycleaninglist'
    return new Promise((resolve, reject) => {
        try {
            const res = axios.get(cleaning_url + uri)
            resolve(res)
        } catch (err) {
            reject(err.message)
        }
    })
}

function insertBooking(date, user, machine) {
    const uri = "/bookings"
    return axios.post(laundry_url + uri, {
        date,
        user,
        machine
    })
}

function removeBooking(id) {
    const uri = "/bookings/" + id
    return axios.delete(laundry_url+uri)
}


export default {
    getAvailableSlots,
    getBigCleaningList, 
    getBookings,
    getDateOfBigCleaning, 
    getNews,
    getWeeklyCleaners,
    getWeeklyCleaningList,
    insertBooking,
    removeBooking
}
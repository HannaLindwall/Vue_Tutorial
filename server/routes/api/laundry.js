const express = require('express');
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const uri = 'mongodb+srv://test123:test123@vueapp-xtm7t.mongodb.net/test?retryWrites=true&w=majority';
const dbName = "vue_express_database";
const machines_collection_name = "washing_machines_collection";
const timeslots_collection_name = "timeslots_collection";

const laundryRouter = express.Router();

// Get available timeslots for doing laundry
laundryRouter.get('/availabletimeslots/:date', async (req, res) => {
    await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, async function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const dBase = client.db(dbName);
        
        await getBookingsForDate("bookings_collection", dBase, req.params.date, async function callback1(bookingsForDate) {
            var allTimeslots = await getTimeslots(timeslots_collection_name, dBase);
            var bookingsPerTimeslot = allTimeslots.map(timeslot => {
                return {
                    startTime: timeslot.timeslotStart,
                    endTime: timeslot.timeslotEnd, 
                    bookings: bookingsForDate.filter(booking => {
                    return booking.date.getUTCHours() === timeslot.timeslotStart;
                })};
            });
            var allMachines = await getWashingMachines(machines_collection_name, dBase);
            allMachines = allMachines.map(machine => {
                return {
                    id: machine._id,
                    name: machine.name
                };
            });
            var availableTimeslots = bookingsPerTimeslot.map(bookingsPerTimeslot => {
                var availableMachines = allMachines.filter(machine => {
                    var machineIsBooked = bookingsPerTimeslot.bookings.find(booking => {
                        return booking.machine === machine.name;
                    })
                    return machineIsBooked === undefined;
                })
                return {
                    startTime: bookingsPerTimeslot.startTime,
                    endTime: bookingsPerTimeslot.endTime,
                    machines: availableMachines
                }
            })
            return res.send(availableTimeslots);
        });
    });
});

// Get my bookings for doing laundry
laundryRouter.get('/bookings/:user', async(req, res) => {
    const collection_name = "bookings_collection";
    await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, async function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const dBase = client.db(dbName);
        await getBookings(collection_name, dBase, req.params.user, function callback(bookings) {
            try {
                const restructBookings = bookings.map(booking => {
                    const id = booking._id
                    const machine = booking.machine
                    const bookingDate = new Date(booking.date)
                    const dateOnly = bookingDate.getUTCFullYear() + "-" + (bookingDate.getUTCMonth() + 1) + "-" + bookingDate.getUTCDate()
                    const timeOnly = bookingDate.getUTCHours() + ":" + (bookingDate.getUTCMinutes()<10?'0':'') + bookingDate.getUTCMinutes()
                    return {id, machine, dateOnly, timeOnly}
                })
                client.close()
                return res.send(JSON.stringify(restructBookings));
            } catch(err) {
                client.close()
                console.log(err.message)
            }
        });
    });
})

// Add booking
laundryRouter.post('/bookings', async(req, res) => {
    const collection_name = "bookings_collection";
    await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, async function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const req_body = req.body;
        const dBase = client.db(dbName);
        const bookingCollection = dBase.collection(collection_name);
        await bookingCollection.insertOne({
            date: new Date(req_body.date), 
            user: req_body.user, 
            machine: req_body.machine
        });
        client.close();
        return res.status(201).send();
    });
}) 

// Remove booking
laundryRouter.delete('/bookings/:id', async(req, res) => {
    const collection_name = "bookings_collection";
    await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, async function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const dBase = client.db(dbName);
        const bookingCollection = dBase.collection(collection_name);
        await bookingCollection.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
        client.close();
        return res.status(200).send();
    });
}) 

async function getBookingsForDate(collection_name, dBase, date, callback) {
    const bookingsCollection = dBase.collection(collection_name);
    var startDate = new Date(date + "T00:00:00.000+00:00");
    var endDate = new Date(date + "T23:59:59.000+00:00");
    await bookingsCollection.find({
        date: {
            "$gte": startDate,
            "$lt": endDate
        }
    }).sort({date: 1}).toArray(function(err, bookings) {
        assert.equal(err, null);
        callback(bookings);
    });
}

async function getBookings(collection_name, dBase, user, callback) {    
    const bookingCollection = dBase.collection(collection_name);
    await bookingCollection.find({user: user}).sort({date: 1}).toArray(function(err, bookings) {
        assert.equal(err, null);
        callback(bookings);
    });
}

async function getTimeslots(collection_name, dBase) {    
    const timeslotsCollection = dBase.collection(collection_name);
    try {
        return await timeslotsCollection.find({}).sort({timeslotId: 1}).toArray();
    } catch (err) {
        console.log(err.message)
    }
}

async function getWashingMachines(collection_name, dBase) {    
    const machinesCollection = dBase.collection(collection_name);
    try {
        return await machinesCollection.find({}).sort({orderId: 1}).toArray();

    } catch(err) {
        console.log(err.message)
    }
    
}

module.exports = laundryRouter
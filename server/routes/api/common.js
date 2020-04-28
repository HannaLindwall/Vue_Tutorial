const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const moment = require('moment');

const uri = 'mongodb+srv://test123:test123@vueapp-xtm7t.mongodb.net/test?retryWrites=true&w=majority';
const dbName = "vue_express_database";

const commonRouter = express.Router();

// Get date of the next big cleaning
commonRouter.get('/nextbigcleaningdate', async (req, res) => {
    const collection_name = "date_collection";
    await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, async function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const dBase = client.db(dbName);
        await getNextBigCleaningDate(collection_name, dBase, function callback(cleaningDates) {
            try {
                const today = new Date()
                const closestDateItem = cleaningDates.find(dateItem => {
                    const date = new Date(dateItem.date)
                    return today <= date
                })
                const closestDate = new Date(closestDateItem.date)
                const cleaningDate = closestDate.getUTCFullYear() + "-" + (closestDate.getUTCMonth() + 1) + "-" + closestDate.getUTCDate()
                const result = {date: cleaningDate, nextcleaningdate: moment(cleaningDate, "YYYY-MM-DD").fromNow()}
                client.close()
                return res.send(JSON.stringify(result));
            } catch (err) {
                client.close()
                console.log(err.message)
            }
        });
    });
})

// Get cleaners of the week
commonRouter.get('/cleanerslist', async (req, res) => {
    const collection_name = "cleaners_collection";
    await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, async function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const dBase = client.db(dbName);
        await getCleanersList(collection_name, dBase, function callback(cleanerslist) {
            try {
                var weekNumber = moment().week()
                var selectedIndex = weekNumber % cleanerslist.length
                client.close()
                return res.send(JSON.stringify(cleanerslist[selectedIndex].names));
            } catch(err) {
                client.close()
                console.log(err.message)
            }
        });
    });
})

async function getCleanersList(collection_name, dBase, callback) {    
    const cleanersCollection = dBase.collection(collection_name);
    await cleanersCollection.find({}).sort({order: 1}).toArray(function(err, cleaners) {
        assert.equal(err, null);
        callback(cleaners);
    });
}

async function getNextBigCleaningDate(collection_name, dBase, callback) {    
    const dateCollection = dBase.collection(collection_name);
    await dateCollection.find({}).sort({date: 1}).toArray(function(err, dates) {
        assert.equal(err, null);
        callback(dates);
    });
}

module.exports = commonRouter
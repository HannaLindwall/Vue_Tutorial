const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const uri = 'mongodb+srv://test123:test123@vueapp-xtm7t.mongodb.net/test?retryWrites=true&w=majority';
const dbName = "vue_express_database";

const cleaningRouter = express.Router();

// Get cleaning list for big cleaning
cleaningRouter.get('/bigcleaninglist', async (req, res) => {
    const collection_name = "big_cleaning_collection";
    await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, async function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const dBase = client.db(dbName);
        await getBigCleaningList(collection_name, dBase, function callback(resp) {
            client.close()
            return res.send(JSON.stringify(resp));
        });
    });
})

// Get date of the next big cleaning
cleaningRouter.get('/nextbigcleaningdate', async (req, res) => {
    const collection_name = "date_collection";
    await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, async function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const dBase = client.db(dbName);
        await getNextBigCleaningDate(collection_name, dBase, function callback(resp) {
            client.close()
            return res.send(JSON.stringify(resp));
        });
    });
})

// Get cleaners of the week
cleaningRouter.get('/cleanerslist', async (req, res) => {
    const collection_name = "cleaners_collection";
    await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, async function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const dBase = client.db(dbName);
        await getCleanersList(collection_name, dBase, function callback(resp) {
            client.close()
            return res.send(JSON.stringify(resp));
        });
    });
})

// Get cleaning list for weekly cleaning
cleaningRouter.get('/weeklycleaninglist', async (req, res) => {
    const collection_name = "weekly_cleaning_collection";
    await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, async function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const dBase = client.db(dbName);
        await getWeeklyCleaningList(collection_name, dBase, function callback(resp) {
            client.close()
            return res.send(JSON.stringify(resp));
        });
    });
})

async function getBigCleaningList(collection_name, dBase, callback) {    
    const bigCleaningCollection = dBase.collection(collection_name);
    await bigCleaningCollection.find({}).toArray(function(err, cleaninglist) {
        assert.equal(err, null);
        callback(cleaninglist);
    });
}

async function getNextBigCleaningDate(collection_name, dBase, callback) {    
    const dateCollection = dBase.collection(collection_name);
    await dateCollection.find({}).toArray(function(err, dates) {
        assert.equal(err, null);
        callback(dates);
    });
}

async function getCleanersList(collection_name, dBase, callback) {    
    const cleanersCollection = dBase.collection(collection_name);
    await cleanersCollection.find({}).toArray(function(err, cleaners) {
        assert.equal(err, null);
        callback(cleaners);
    });
}

async function getWeeklyCleaningList(collection_name, dBase, callback) {    
    const weeklyCleaningCollection = dBase.collection(collection_name);
    await weeklyCleaningCollection.find({}).toArray(function(err, cleaninglist) {
        assert.equal(err, null);
        callback(cleaninglist);
    });
}

module.exports = cleaningRouter
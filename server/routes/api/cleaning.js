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

async function getWeeklyCleaningList(collection_name, dBase, callback) {    
    const weeklyCleaningCollection = dBase.collection(collection_name);
    await weeklyCleaningCollection.find({}).toArray(function(err, cleaninglist) {
        assert.equal(err, null);
        callback(cleaninglist);
    });
}

module.exports = cleaningRouter
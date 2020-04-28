const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const uri = 'mongodb+srv://test123:test123@vueapp-xtm7t.mongodb.net/test?retryWrites=true&w=majority';
const dbName = "vue_express_database";

const homeRouter = express.Router();

// Get date of big cleaning
homeRouter.get('/nextbigcleaningdate', async (req, res) => {
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

// Get news
homeRouter.get('/news', async (req, res) => {
    const collection_name = "news_collection";
    await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, async function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const dBase = client.db(dbName);
        await getNews(collection_name, dBase, function callback(resp) {
            client.close()
            return res.send(JSON.stringify(resp));
        });
    });
})

// Get cleaners of the week
homeRouter.get('/cleanerslist', async (req, res) => {
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

async function getNextBigCleaningDate(collection_name, dBase, callback) {    
    const dateCollection = dBase.collection(collection_name);
    await dateCollection.find({}).toArray(function(err, dates) {
        assert.equal(err, null);
        callback(dates);
    });
}

async function getNews(collection_name, dBase, callback) {    
    const newsCollection = dBase.collection(collection_name);
    await newsCollection.find({}).toArray(function(err, news) {
        assert.equal(err, null);
        callback(news);
    });
}

async function getCleanersList(collection_name, dBase, callback) {    
    const cleanersCollection = dBase.collection(collection_name);
    await cleanersCollection.find({}).toArray(function(err, cleaners) {
        assert.equal(err, null);
        callback(cleaners);
    });
}

module.exports = homeRouter
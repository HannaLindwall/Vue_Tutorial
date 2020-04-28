const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const uri = 'mongodb+srv://test123:test123@vueapp-xtm7t.mongodb.net/test?retryWrites=true&w=majority';
const dbName = "vue_express_database";

const homeRouter = express.Router();

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

async function getNews(collection_name, dBase, callback) {    
    const newsCollection = dBase.collection(collection_name);
    await newsCollection.find({}).sort({date: -1}).toArray(function(err, news) {
        assert.equal(err, null);
        callback(news);
    });
}

module.exports = homeRouter
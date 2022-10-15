const MongoClient = require('mongodb').MongoClient;
let mongoUrl = "mongodb://localhost:27017/prodflow";

function getSiteInfo(Site, callback) {
    MongoClient.connect(mongoUrl, (err, client) => {
        if (err) throw err;

        const db = client.db('prodflow');

        db.collection("Sites").find({ "name": Site }).toArray((err, result) => {
            if (err) throw err;
            // console.log(result[0]);
            client.close();
            callback(result);
        });
    });
};

function getSitesName(callback) {
    MongoClient.connect(mongoUrl, (err, client) => {
        if (err) throw err;

        const db = client.db('prodflow');

        db.collection("Sites").distinct("name",(err, result) => {
            if (err) throw err;
            // console.log(result);
            client.close();
            callback(result);
        });
    });
};

function createNewSite(siteInfo, callback) {
    MongoClient.connect(mongoUrl, (err, client) => {
        if (err) throw err;

        const db = client.db('prodflow');

        db.collection("Sites").insertOne(siteInfo, (err, result) => {
            if (err) throw err;
            console.log(result);
            client.close();
            callback(result);
        });
    });
};


function createNewLine(site, line, callback) {
    MongoClient.connect(mongoUrl, (err, client) => {
        if (err) throw err;

        const db = client.db('prodflow');

        db.collection("Sites").updateOne({"name": site}, {$push: {"prodLines": {"lineId": line, "nbUnitPerMn": 0}}}, (err, result) => {
            if (err) throw err;
            client.close();
            callback(result);
        });
    });
};

function updateLine(site, line, nbUnit, callback) {
    MongoClient.connect(mongoUrl, (err, client) => {
        if (err) throw err;

        const db = client.db('prodflow');

        let filter = {"name": site, "prodLines.lineId":line};
        let set = {$set: {"prodLines.$.nbUnitPerMn": nbUnit}}

        db.collection("Sites").updateOne(filter, set, (err, result) => {
            if (err) throw err;
            console.log(result);
            client.close();
            callback(result);
        });
    });
};

module.exports = {
    getSitesName: getSitesName,
    getSiteInfo: getSiteInfo,
    createNewSite: createNewSite,
    createNewLine: createNewLine,
    updateLine: updateLine
};

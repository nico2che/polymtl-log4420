"use strict";

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://nico_pierre:pub4life@ds245615.mlab.com:45615/online-shop", { useMongoClient: true });
const db = mongoose.connection;

db.on('error', (err) => {
    console.error(err);
    process.exit(1);
});

db.once('open', () => {
    console.log("mongoose started");
});

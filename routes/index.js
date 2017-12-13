var express = require('express');
var router = express.Router();
var carelink = require('./../carelink');
var client = carelink.Client({username: process.env.USERNAME,
        password: process.env.PASSWORD});
var moment = require('moment');
moment.locale('nl-be');

/* GET home page. */
router.get('/', function (ignore, res) {
    'use strict';
    client.fetch(function callback(ignore, data) {
        res.render('index', {data: data, moment: moment});
    });
});

module.exports = router;

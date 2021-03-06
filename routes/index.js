var express = require('express');
var router = express.Router();
var carelink = require('./../carelink');
var client = carelink.Client({username: process.env.USERNAME,
        password: process.env.PASSWORD});
var moment = require('moment');
var Cookie = require('tough-cookie');
var MemoryCookieStore = Cookie.MemoryCookieStore;
moment.locale('nl-be');

/* GET home page. */
router.get('/', function (req, res) {
    'use strict';
    var cookieStore = new MemoryCookieStore(),
        JSONcookies = JSON.parse(req.cookies.carelinkCookies || '[]'),
        noop = function () { return; },
        i,
        cookie;
    for (i = 0; i < JSONcookies.length; i += 1) {
        cookie = Cookie.fromJSON(JSONcookies[i]);
        // callback ignored since putCookie is synchronous anyway
        cookieStore.putCookie(cookie, noop);
    }
    client.fetch(cookieStore, function callback(ignore, data) {
        cookieStore.getAllCookies(function (ignore, cookies) {
            var theCookies = [];
            for (i = 0; i < cookies.length; i += 1) {
                theCookies.push(cookies[i].toJSON());
            }
            res.cookie('carelinkCookies', JSON.stringify(theCookies), { maxAge: 900000, httpOnly: true });
            res.render('index', {data: data, moment: moment});
        });
    });
});

module.exports = router;

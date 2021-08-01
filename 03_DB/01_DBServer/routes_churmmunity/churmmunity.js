var express = require('express');
var router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();

// sql connection
const conn = require('../config/database');

router.get('/', function (req, res, next) {
    res.json('churmmunity route / ');
});

router.get('/getMyGroupDatas', (req, res) => {
    let sql = 'SELECT * FROM myGroupDatas'; // myGroupDatas 테이블에서 모든 값을 가져옴
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            console.log(rows);
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
});

router.get('/getMyLightDatas', (req, res) => {
    let sql = 'SELECT * FROM myLightDatas'; // myLightDatas 테이블에서 모든 값을 가져옴
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            console.log(rows);
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
});

router.get('/getRecGroups', (req, res) => {
    let sql = 'SELECT * FROM recGroups'; // recGroups 테이블에서 모든 값을 가져옴
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            console.log(rows);
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
});


router.get('/getRecGroupsOrderRand', (req, res) => {
    let sql = 'SELECT * FROM recGroups ORDER BY RAND()'; // recGroups 테이블에서 모든 값을 가져옴
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            console.log(rows);
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
});


router.get('/getRecLights', (req, res) => {
    let sql = 'SELECT * FROM recLights'; // recLights 테이블에서 모든 값을 가져옴
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            console.log(rows);
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
});

var today = '2021-05-15 01:00:00';

router.get('/getRecLightsOrderTime', (req, res) => {
    let sql = `SELECT * FROM recLights WHERE DATE_FORMAT(time, "%Y-%m-%d %H:%i:%s") > '${today}' ORDER BY time`; // recLights 테이블에서 현재 시간 이후의 값을 가져옴
    // let sql = `SELECT * FROM recLights WHERE time > '${today}' ORDER BY time`; // recLights 테이블에서 현재 시간 이후의 값을 가져옴
    // let sql = `SELECT * FROM recLights WHERE time > NOW() ORDER BY time`; // recLights 테이블에서 현재 시간 이후의 값을 가져옴
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            console.log(rows);
            console.log(sql);
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
});


module.exports = router;
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

// [CUHR-94] myGroupDatas, RecGroupDatas 정보를 Groups 로 합침

router.post('/GetMyGroupDatas', (req, res) => {
    // let sql = 'SELECT * FROM myGroupDatas'; // myGroupDatas 테이블에서 모든 값을 가져옴
    // console.log('request on');
    // console.log(req.body);
    let sql = `SELECT Groups.id, Groups.name, Groups.mainImg, Groups.location, Groups.description
    FROM Groups, GroupUser, User
    WHERE GroupUser.userId = ${req.body.userId}
        AND GroupUser.userId = User.id
        AND GroupUser.groupId = Groups.id`;
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            // console.log(rows);
            console.log('query success')
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
});

router.post('/GetGroupMembers', (req, res) => {
    let sql = `SELECT User.id, User.name, User.photo
    FROM Groups, GroupUser, User
    WHERE GroupUser.groupId = ${req.body.groupId}
        AND GroupUser.userId = User.id
        AND GroupUser.groupId = Groups.id`;
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            // console.log(rows);
            console.log('query success')
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
})

router.post('/JoinGroup', (req, res) => {
    let sql = `INSERT INTO GroupUser (groupId, userId, role) VALUES (${req.body.groupId}, ${req.body.userId}, 'user')`;
    console.log(sql);
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            // console.log(rows);
            console.log('query success')
            res.send('success');
        } else {
            console.log('query error : ' + error);
            res.send('fail' + error);
        }
    });
})

router.post('/ExitGroup', (req, res) => {
    let sql = `DELETE FROM GroupUser 
	            WHERE GroupUser.userId = ${req.body.userId}
                    AND GroupUser.groupId = ${req.body.groupId}`;
    console.log(sql);
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            // console.log(rows);
            console.log('query success')
            res.send('success');
        } else {
            console.log('query error : ' + error);
            res.send('fail' + error);
        }
    });
})

router.get('/GetMyLightDatas', (req, res) => {
    let sql = 'SELECT * FROM myLightDatas'; // myLightDatas 테이블에서 모든 값을 가져옴
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            // console.log(rows);
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
});

router.get('/GetRecGroups', (req, res) => {
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


router.get('/GetRecGroupsOrderRand', (req, res) => {
    let sql = 'SELECT * FROM Groups ORDER BY RAND()'; // recGroups 테이블에서 모든 값을 가져옴
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            // console.log(rows);
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
});


router.get('/GetRecLights', (req, res) => {
    let sql = 'SELECT * FROM recLights'; // recLights 테이블에서 모든 값을 가져옴
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            // console.log(rows);
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
});

var today = '2021-05-15 01:00:00';

router.get('/GetRecLightsOrderTime', (req, res) => {
    let sql = `SELECT * FROM recLights WHERE DATE_FORMAT(time, "%Y-%m-%d %H:%i:%s") > '${today}' ORDER BY time`; // recLights 테이블에서 현재 시간 이후의 값을 가져옴
    // let sql = `SELECT * FROM recLights WHERE time > '${today}' ORDER BY time`; // recLights 테이블에서 현재 시간 이후의 값을 가져옴
    // let sql = `SELECT * FROM recLights WHERE time > NOW() ORDER BY time`; // recLights 테이블에서 현재 시간 이후의 값을 가져옴
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            // console.log(rows);
            // console.log(sql);
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
});

router.post('/SetNumGroupMember', (req, res) => {
    console.log('SetNumGroupMember Called')
    let sql = `UPDATE Groups SET numMember = ${req.body.numMember} WHERE Groups.id = ${req.body.groupId};`
    console.log(sql);
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            // console.log(rows);
            console.log('query success')
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
})



module.exports = router;
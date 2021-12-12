var express = require('express');
var router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();

// sql connection
const conn = require('../config/database');
var fileName = '';

router.get('/', function (req, res, next) {
    res.json('churmmunity route / ');
});

// [CUHR-94] myGroupDatas, RecGroupDatas 정보를 Groups 로 합침

router.post('/GetMyGroupDatas', (req, res) => {
    // let sql = 'SELECT * FROM myGroupDatas'; // myGroupDatas 테이블에서 모든 값을 가져옴
    // console.log('request on');
    // console.log(req.body);
    let sql = `SELECT Groups.id, Groups.name, Groups.mainImg, Groups.location, Groups.description, Groups.numMember
    FROM Groups, GroupUser, User
    WHERE GroupUser.userId = ${req.body.userId}
        AND GroupUser.userId = User.id
        AND GroupUser.groupId = Groups.id`;
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            // console.log(rows);
            // console.log('query success')
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
            // console.log('query success')
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
            // console.log('query success')
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
            // console.log('query success')
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
            // console.log(rows);
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
    let sql = `UPDATE Groups SET numMember = ${req.body.numMember} WHERE Groups.id = ${req.body.groupId}`;
    console.log(sql);
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            // console.log(rows);
            // console.log('query success')
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
})

// 그룹 게시판 관련
router.post('/GetUserData', (req, res) => {
    let sql = `SELECT * FROM User WHERE id = ${req.body.userId}`
    console.log(sql);
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            console.log(rows);
            // console.log('query success')
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
})

router.get('/User/:id', (req, res) => {
    let sql = `SELECT * FROM User WHERE id = ${req.params.id}`
    console.log(sql);
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            console.log(rows);
            // console.log('query success')
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
})

router.post('/GetGroupFeeds', (req, res) => {
    let sql = `SELECT * FROM Feed WHERE groupId = ${req.body.groupId} ORDER BY time DESC`
    console.log(sql);
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            console.log(rows);
            // console.log('query success')
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
})

router.post('/GetFeedComments', (req, res) => {
    let sql = `SELECT * FROM Comment WHERE groupId = ${req.body.groupId} AND feedId = ${req.body.feedId} ORDER BY time DESC`
    console.log(sql);
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            console.log(rows);
            // console.log('query success')
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
})

router.post('/GetCommentAuthorData', (req, res) => {
    let sql = `SELECT * FROM User WHERE id = ${req.body.userId}`
    console.log(sql);
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            console.log(rows);
            // console.log('query success')
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
})

router.post('/FeedComments', (req, res) => {
    let sql = `INSERT INTO Comment (groupId, feedId, authorId, text) VALUES (${req.body.groupId}, ${req.body.feedId}, ${req.body.authorId}, '${req.body.text}')`;
    console.log(sql);
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            // console.log(rows);
            // console.log('query success')
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
})

const uploadPost = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/FeedImg');
        },
        filename(req, file, cb) {
            console.log(file.originalname);
            let maxId = -1;
            let sql = 'SELECT MAX(id) FROM Feed';
            conn.query(sql, function (error, rows, fields) {
                if (!error) {
                    var result = rows[0];
                    maxId = result['MAX(id)'];
                } else {
                    console.log('query error : ' + error);
                    maxId = -1;
                    return;
                }                
                console.log(maxId);
                var temp = file.originalname.split('.');
                var fileExt = temp[temp.length - 1];
                fileName = 'FeedId' + (maxId + 1) + '.' + fileExt;                
                cb(null, fileName);
            })
        },
    }),
})

router.post('/Feed/Img', uploadPost.single('file'), async (req, res, next) => {
    console.log(req.file.filename);
    res.send(true);
})

router.post('/Feed', (req, res) => {
    console.log(req.body);
    let sql = `INSERT INTO Feed (groupId, authorId, location, time, contentImg, contentText) VALUES ('${req.body.groupId}', '${req.body.authorId}', '${req.body.location}', '${req.body.time}', '/FeedImg/${fileName}', '${req.body.contentText}')`;
    console.log(sql);
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            // console.log(rows);
            // console.log('query success')
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
})    

module.exports = router;
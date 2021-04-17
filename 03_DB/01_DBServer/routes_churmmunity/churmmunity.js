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

router.get('/getMyCommDatas', (req, res) => {
    let sql = 'SELECT * FROM myCommDatas'; // myCommDatas 테이블에서 모든 값을 가져옴
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            // console.log(rows);
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
});

module.exports = router;
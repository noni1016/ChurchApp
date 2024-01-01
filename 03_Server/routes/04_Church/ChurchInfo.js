var express = require('express');
var router = express.Router();
const multer = require('multer');
const fs = require('fs');
const domain = 'http://121.139.124.10:7009';

////////////////////////////////////////////////////////////sql connection
const conn = require('../../config/database');

////////////////////////////////////////////////////////////Churmmunity
// Find Church
router.get('/Find/:name', (req, res) => {
    let sql = `SELECT * FROM ChurchInfo WHERE name REGEXP '${req.params.name}'`;
    console.log(sql)
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            console.log(rows);
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
});



module.exports = router;
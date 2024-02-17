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

router.get('/Add/:name', (req, res) => {
    let sql = `SELECT * FROM ChurchInfo WHERE name REGEXP '${req.params.name}'`;
    console.log(sql)
    console.log(req)
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            console.log(rows);
            if(rows.length == 0)
            {
                console.log("new church!");
                sql1 = `INSERT INTO ChurchInfo (name, location_ll, pastor) VALUES ('${req.body.name}', ST_GeomFromText('POINT(${req.body.location_ll_x} ${req.body.location_ll_y})', 4326), '${req.body.pastorName}')`;
            }    
            else
            {

            }
            //res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
});

////////////////////////////////////////////////////////////Churmmunity
// Get Church
router.get('/:churchId', (req, res) => {
    let sql = `SELECT name FROM ChurchInfo WHERE id = '${req.params.churchId}'`
    console.log(sql)
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            console.log(rows[0]);
            res.send(rows[0]);
        } else {
            console.log('query error : ' + error);
        }
    });
});

module.exports = router;
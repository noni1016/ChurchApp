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
    res.json('Login route / ');
});

router.get('/User/:domain/:id', (req, res) => {
    let sql = `SELECT * FROM User WHERE id_${req.params.domain} = ${req.params.id}`
    console.log(sql);
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            console.log(rows);
            // console.log('query success')
            res.send(rows);
        } else {
            console.log('query error : ' + error);
            res.send(-1);
        }
    });
})

router.post('/User/:domain', (req, res) => {
    let sql = `INSERT INTO User (name, photo, church, age, level, role, id_${req.params.domain}) VALUES ('${req.body.name}', '${req.body.photo}', '${req.body.church}', '${req.body.age}', '${req.body.level}', '${req.body.role}', '${req.body.id_domain}')`;
    console.log(sql);
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            console.log(rows);
            // console.log('query success')
            res.send(rows);
        } else {
            console.log('query error : ' + error);
            res.send(false);
        }
    });
})

module.exports = router;
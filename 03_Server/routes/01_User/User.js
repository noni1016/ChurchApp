var express = require('express');
var router = express.Router();
const multer = require('multer');
const fs = require('fs');

////////////////////////////////////////////////////////////sql connection
const conn = require('../../config/database');

////////////////////////////////////////////////////////////Churmmunity
// User's Club
router.get('/:userId/Club', (req, res) => {
    let sql = `SELECT Club.id, Club.name, Club.mainImg, Club.location, Club.description, Club.numMember
    FROM Club, ClubUser, User
    WHERE ClubUser.userId = ${req.params.userId}
        AND ClubUser.userId = User.id
        AND ClubUser.clubId = Club.id`;
    console.log(sql)
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
});

// Get User Data
router.get('/:userId', (req, res) => {
    let sql = `SELECT * FROM User WHERE id = ${req.params.userId}`;
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

// Get User Data from domain id
router.get('/Domain/:domain/:id_domain', (req, res) => {
    let sql = `SELECT * FROM User WHERE id_${req.params.domain} = ${req.params.id_domain}`;
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

// Join(Upload) User
router.post('/Domain/:domain', async (req, res) => {
    let queryResult;
    let sql1 = `INSERT INTO User (name, photo, church, age, level, role, id_${req.params.domain}) VALUES ('${req.body.name}', '${req.body.photo}', '${req.body.church}', '${req.body.age}', '${req.body.level}', '${req.body.role}', '${req.body.id_domain}')`;
    let sql2 = `SELECT * FROM User WHERE id_${req.params.domain} = ${req.body.id_domain}`;
    console.log(sql1);
    console.log(sql2);
    try {
        await conn.beginTransaction();
        await conn.query(sql1);
        await conn.query(sql2, async (error, rows) => {
            queryResult = rows;
            console.log(queryResult);
            await conn.commit();
            res.send(queryResult);
        });
    } catch (err) {
        console.log(err)
        await conn.rollback()
        res.status(500).json(err)
    }
})

// Update(Put) User Information
router.put('/:userId/:column', (req, res) => {
    let queryRes = false;
    let sql = `UPDATE User SET ${req.params.column} = '${req.body.data}' WHERE id = ${req.params.userId}`;
    console.log(sql);
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            console.log(rows.affectedRows);
            if (rows.affectedRows === 1) queryRes = true;
            // console.log('query success')
            res.send(queryRes);
        } else {
            console.log('query error : ' + error);
        }
    });
});

module.exports = router;
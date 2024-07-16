var express = require('express');
var router = express.Router();
const multer = require('multer');
const fs = require('fs');

////////////////////////////////////////////////////////////Setings
// sql connection
const conn = require('../../config/database');
const path = require('path');

// Member
router.get('/:spotId/Member', (req, res) => {
    let sql = `SELECT User.id, User.name, User.photo, SpotUser.role
            FROM Spot, SpotUser, User
            WHERE SpotUser.spotId = ${req.params.spotId}
            AND SpotUser.userId = User.id
            AND SpotUser.spotId = Spot.id`;
    console.log(sql);
    conn.query(sql, function (error, rows, fields) {
        if (!error) {
            console.log(rows);
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    })
});

router.put('/Leader/:spotId/:memberId', async (req, res) => {
    // 1. Change Group table's leader number
    let sql0 = `UPDATE Spot Set leader = ${req.params.memberId} WHERE id = ${req.params.spotId}`;
    
    // 2. Change Group-User table's role of past leader
    let sql1 = `UPDATE SpotUser SET role = 0 WHERE spotId = ${req.params.spotId} AND role = 1`;

    // 3. Change Group-User table's role of current leader
    let sql2 = `UPDATE SpotUser SET role = 1 WHERE spotId = ${req.params.spotId} AND userId = ${req.params.memberId}`;

    try {
        await conn.beginTransaction();
        console.log(sql0);
        await conn.query(sql0);
        console.log(sql1);
        await conn.query(sql1);
        console.log(sql2);
        await conn.query(sql2);
        await conn.commit();
        res.send({ result: true });
    } catch (err) {
        console.log(err);
        await conn.rollback();
        res.send ({result: false});
    }

})

router.delete('/Member/:spotId/:memberId', (req, res) => {
    let sql = `DELETE FROM SpotUser WHERE spotId = ${req.params.spotId} AND userId = ${req.params.memberId}`;
    console.log(sql);

    conn.query(sql, (err, rows) => {
        if (!err) {
            res.send({result: true});
        } else {
            console.log(err);
            res.send({result: false});
        }
    })
})

module.exports = router;
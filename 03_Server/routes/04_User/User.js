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

module.exports = router;
var express = require('express');
var router = express.Router();
const multer = require('multer');
const fs = require('fs');

////////////////////////////////////////////////////////////Setings
// sql connection
const conn = require('../../config/database');
var fileName = '';
var imgUpload = false;

////////////////////////////////////////////////////////////Churmmunity Page
// All Club
router.get('/', (req, res) => {
    let sql = 'SELECT * FROM Club'; // Club 테이블에서 모든 값을 가져옴
    console.log(sql);
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            // console.log(rows);
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
});

// All Club with Sorting
router.get('/Sort/:method/:num', (req, res) => {
    let sql = `SELECT * FROM Club ORDER BY ${req.params.method} LIMIT 0, ${req.params.num}`; // Club 테이블에서 Sorting 해서 num 개 까지의 값을 가져옴
    console.log(sql);
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            // console.log(rows);
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
});

////////////////////////////////////////////////////////////Club Page
// Get Club Member
router.get('/:clubId/Member', (req, res) => {
    let sql = `SELECT User.id, User.name, User.photo
    FROM Club, ClubUser, User
    WHERE ClubUser.clubId = ${req.params.clubId}
        AND ClubUser.userId = User.id
        AND ClubUser.clubId = Club.id`;
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

// Get Num of club member
router.get('/:clubId/NumMember/', function (req, res) {
    let sql = `SELECT COUNT(*) FROM Club, ClubUser, User
    WHERE ClubUser.clubId = ${req.params.clubId}
        AND ClubUser.userId = User.id
        AND ClubUser.clubId = Club.id`;
    console.log(sql);
    conn.query(sql, function (error, rows, fields) {
        if (!error) {
            console.log(rows);
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
})

// Join club
router.get('/:clubId/Join/:userId', async (req, res) => {
    let cnt = 0;
    let sql1 = `INSERT INTO ClubUser (clubId, userId, role) VALUES (${req.params.clubId}, ${req.params.userId}, 'user')`;
    let sql2 = `SELECT COUNT(*) FROM Club, ClubUser, User WHERE ClubUser.clubId = ${req.params.clubId}
        AND ClubUser.userId = User.id
        AND ClubUser.clubId = Club.id`;
    let sql3 = ``;
    console.log(sql1);
    console.log(sql2);
    try {
        await conn.beginTransaction();
        await conn.query(sql1);
        await conn.query(sql2, (error, rows) => {
            let row = rows[0];
            cnt = row['COUNT(*)'];       
            console.log(cnt);     
            sql3 = `Update Club SET numMember = ${cnt} WHERE id = ${req.params.clubId}`;
            conn.query(sql3);
        });
        console.log(sql3);
        await conn.commit();
        res.send('OK');
    } catch (err) {
        console.log(err)
        await conn.rollback()
        res.status(500).json(err)
    }
})



// Exit club
router.get('/:clubId/Join/:userId', async (req, res) => {
    let sql1 = `INSERT INTO ClubUser (clubId, userId, role) VALUES (${req.params.clubId}, ${req.params.userId}, 'user')`;
    let sql2 = `SELECT COUNT(*) FROM Club, ClubUser, User WHERE ClubUser.clubId = ${req.params.clubId}
        AND ClubUser.userId = User.id
        AND ClubUser.clubId = Club.id`;
    console.log(sql1);
    console.log(sql2);
    try {
        await conn.beginTransaction();
        // const ins = await conn.query(`INSERT INTO ClubUser set ?`, {clubId: req.params.clubId, userId: req.params.userId, role: 'user'});
        // const cnt = await conn.query(`UPDATE Club set numMember = numMember + 1 where id = ?`, [req.params.clubId]);
        
        await conn.query(sql1);
        let cnt = await conn.query(sql2);
        console.log('cnt :'+ cnt[0]);
        await conn.commit();
        res.send('OK');
    } catch (err) {
        console.log(err)
        await conn.rollback()
        res.status(500).json(err)
    }
})

// const updateClubMem

router.get('/:clubId/Exit/:userId', (req, res) => {
    let sql1 = `DELETE FROM ClubUser 
        WHERE ClubUser.userId = ${req.params.userId}
        AND ClubUser.clubId = ${req.params.clubId};`;
        let sql2 = `SELECT COUNT(*) FROM Club, ClubUser, User
        WHERE ClubUser.clubId = ${req.params.clubId}
        AND ClubUser.userId = User.id
        AND ClubUser.clubId = Club.id;`;
    console.log(sql1);
    console.log(sql2);
    conn.query(sql1 + sql2, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            // console.log(rows);
            // console.log('query success')
            var res1 = rows[0];	//sql1 의 결과값
            var res2 = rows[1];	//sql2 의 결과값
            let sql3 = `UPDATE Club SET numMember = ${rows[1]} WHERE Club.id = ${req.params.clubId}`;
            console.log(sql3);
            conn.query(`UPDATE Club SET numMember = ${rows[1]} WHERE Club.id = ${req.params.clubId}`, function (error, rows, fields) { // sql 쿼리 수행
                if (!error) {        
                    res.send('success');
                } else {
                    console.log('query error : ' + error);
                    res.send('fail' + error);
                }
            });

            res.send(rows[1]);
        } else {
            console.log('query error : ' + error);
            res.send('fail' + error);
        }
    });
})


// // Set Num of club member
// router.post('/SetNumGroupMember', (req, res) => {
//     console.log('SetNumGroupMember Called')
//     let sql = `UPDATE Groups SET numMember = ${req.body.numMember} WHERE Groups.id = ${req.body.groupId}`;
//     console.log(sql);
//     conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
//         if (!error) {
//             // console.log(rows);
//             // console.log('query success')
//             res.send(rows);
//         } else {
//             console.log('query error : ' + error);
//         }
//     });
// })

module.exports = router;
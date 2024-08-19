var express = require('express');
var router = express.Router();
const multer = require('multer');
const fs = require('fs');

////////////////////////////////////////////////////////////Setings
// sql connection
const conn = require('../../config/database');
const path = require('path');


var returnTableValue;
var spotId;
const createSpot = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `public/SpotMainImg`);
        },
        async filename(req, file, cb) {
            console.log(file.originalname);
            console.log(req.params.name);
            let sql1 = `INSERT INTO Spot (name, location, location_ll, description, keyword, time, leader) VALUES ('${req.body.name}', '${req.body.location}', ST_GeomFromText('POINT(${req.body.location_ll_x} ${req.body.location_ll_y})', 4326), '${req.body.description}','${req.body.keyword}', '${req.body.time}', '${req.body.userId}')`;
            console.log(sql1);
            var fileName = ``;
            try {
                await conn.beginTransaction();
                await conn.query(sql1, (error, rows) => {
                    spotId = rows.insertId;
                    fileName = spotId + path.extname(file.originalname);
                    cb(null, fileName);
                    console.log(fileName);
                    let sql2 = `INSERT INTO SpotUser (SpotId, userId, role) VALUES (${spotId}, ${req.body.userId}, 1)`;
                    console.log(sql2);
                    conn.query(sql2, (err, rows) => {
                        if (err) console.log(err);
                        else {
                            let sql3 = `UPDATE Spot SET mainImg = '${fileName}' WHERE id = ${spotId}`;
                            console.log(sql3);
                            conn.query(sql3, (err, rows) => {
                                if (err) console.log(err);
                                else {
                                    let sql4 = `SELECT * FROM SpotView WHERE id = ${spotId}`;
                                    console.log(sql4);
                                    conn.query(sql4, (error, rows) => {
                                        console.log(rows[0]);
                                        conn.commit();
                                        returnTableValue = rows[0];
                                    })
                                }
                            })
                        }
                    })
                })
            } catch (err) {
                console.log(err);
                await conn.rollback();
            }
        }
    })
}).single('file');

// Create Spot Info
router.post('/', async (req, res) => {
    createSpot(req, res, async (err) => {
        if (err) res.send(false);
        else res.json(returnTableValue);
    })    
})



const storage = multer.diskStorage({
    destination: 'public/SpotMainImg',
    filename(req, file, cb) {
        cb(null, `${req.params.id}${path.extname(file.originalname)}`);
    }
})
const formData = multer({storage: storage});

// Update Spot Info
router.put('/:id', formData.single('file'), async (req, res) => {
    let sql1 = `UPDATE Spot SET name = '${req.body.name}', location = '${req.body.location}', location_ll = ST_GeomFromText('POINT(${req.body.location_ll_x} ${req.body.location_ll_y})', 4326), description = '${req.body.description}', keyword = '${req.body.keyword}', time = '${req.body.time}' WHERE id = ${req.params.id}`;

    if (req.file) console.log(req.file.filename);

    try {
        await conn.beginTransaction();
        await conn.query(sql1, (error, rows) => {
            if (error) console.log(error);
            console.log(rows);
            let sql2 = `SELECT * FROM SpotView WHERE id = ${req.params.id}`; 
            conn.query(sql2, (error, rows) => {
                console.log(rows[0]);
                conn.commit();
                res.json(rows[0]);
            })
        })
    } catch (err) {
        console.log(err);
        await conn.rollback();
    }
})

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
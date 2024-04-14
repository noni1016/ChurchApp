var express = require('express');
var router = express.Router();
const multer = require('multer');
const fs = require('fs');
const domain = 'http://121.139.124.10:7009';

////////////////////////////////////////////////////////////sql connection
const conn = require('../../config/database');
const path = require('path');

////////////////////////////////////////////////////////////Churmmunity
// Find Church
router.get('/Find/:name', (req, res) => {
    let sql = `SELECT * FROM ChurchView WHERE name REGEXP '${req.params.name}'`;
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

// Find same church
router.get('/FindSameChurch/:name/:long/:lat/:pastorName', (req, res) => {
    let name = req.params.name;
    let long = Number(req.params.long);
    let lat = Number(req.params.lat);
    let pastorName = req.params.pastorName;

    let sql = `SELECT * FROM ChurchView WHERE (name = '${name}' AND ST_Distance_Sphere(location_ll, point(${long}, ${lat})) < 3 AND pastor = '${pastorName}')`;
    console.log(sql);
    conn.query(sql, function (error, rows, fields) {
        if (!error) {
            console.log(rows);
            res.json(rows);
        } else {
            console.log('query error : ' + error);
        }
    })
});


router.post('/Add/:name', (req, res) => {
    let sql1 = `SELECT * FROM ChurchView WHERE name REGEXP '${req.params.name}'`;
    console.log(sql1)
    console.log(req)
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            console.log(rows);
            if(rows.length == 0)
            {
                console.log("new church!");
                sql1 = `INSERT INTO Church (name, location_ll, pastor) VALUES ('${req.params.name}', ST_GeomFromText('POINT(${req.body.location_ll_x} ${req.body.location_ll_y})', 4326), '${req.body.pastorName}')`;
                console.log(sql1);
                conn.query(sql1, function (error, rows, fields) {
                    if (!error) {
                        console.log(rows);
                        res.send(rows);
                    }
                })
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

var returnTableValue;
const createChurch = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `public/ChurchMainImg`);
        },
        async filename(req, file, cb) {
            console.log(file.originalname);
            console.log(req.params.name);
            var sql2 = `INSERT INTO Church (name, pastor, location, location_ll, description) VALUES ('${req.params.name}', '${req.params.pastorName}', '${req.body.location}', ST_GeomFromText('POINT(${req.params.long} ${req.params.lat})', 4326), '${req.body.description}' )`;
            var fileName = '';
            try {
                await conn.beginTransaction();
                await conn.query(sql2, (error, rows) => {
                    churchId = rows.insertId;
                    fileName = churchId + path.extname(file.originalname);
                    cb(null, fileName);
                    console.log(fileName);
                    sql3 = `INSERT INTO ChurchUser (churchId, userId, role) VALUES (${churchId}, ${req.body.userId}, 1)`;
                    console.log(sql3);
                    conn.query(sql3, (error, rows) => {
                        if (error) console.log(error);
                        else {
                            sql4 = `Update Church SET mainImg = '${fileName}' WHERE id = ${churchId}`;
                            console.log(sql4);
                            conn.query(sql4, (error, rows) => {
                                if (error) console.log(error);
                                else {
                                    sql5 = `SELECT * FROM ChurchView WHERE id = ${churchId}`;
                                    console.log(sql5);
                                    conn.query(sql5, (error, rows) => {
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

router.post('/:name/:long/:lat/:pastorName', async (req, res) => {
    let long = req.params.long ? Number(req.params.long) : 127;
    let lat = req.params.lat ? Number(req.params.lat) : 37;

    let sql1 = `SELECT * FROM ChurchView WHERE (name LIKE '${req.params.name}' AND pastorName LIKE '${req.params.pastorName}' AND ST_Distance_Sphere(location_ll, point(${long}, ${lat})) <= 10 ))`;

    conn.query(sql1, function (error, rows, fields) {
        console.log(rows);
        if (rows) {
            res.send(false);
        } else {
            createChurch(req, res, async (err) => {
                if (err) {
                    res.send(false);
                } else {
                    res.json(returnTableValue);
                }
            });
        }
    })
})

////////////////////////////////////////////////////////////Churmmunity
// Get Church
router.get('/:churchId', (req, res) => {
    let sql = `SELECT name FROM ChurchView WHERE id = '${req.params.churchId}'`
    console.log(sql)
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            console.log(rows[0]);
            res.send(rows[0]);
        } else {
            console.log('query error : ' + error);
        }
    ;});
});

router.get('', (req, res) => {
    let sql = `SELECT * FROM ChurchView ORDER BY numMember LIMIT 0, 10`;
    console.log(sql);
    conn.query(sql, function (error, rows, fields) {
        if (!error) {
            console.log(rows);
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    })
})


//////////////////////////////////////////////////////////////////////////
//Get Church Member
router.get('/Member/:churchId', (req, res) => {
    let sql = `SELECT User.id, User.name, User.photo, ChurchUser.role
            FROM Church, ChurchUser, User
            WHERE ChurchUser.churchId = ${req.params.churchId}
            AND ChurchUser.userId = User.id
            AND ChurchUser.churchId = Church.id`;
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


module.exports = router;
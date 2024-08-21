var express = require('express');
var router = express.Router();
const multer = require('multer');
const fs = require('fs');
const util = require('util');




////////////////////////////////////////////////////////////Setings
// sql connection
const conn = require('../../config/database');
const path = require('path');

// Get group with id
router.get('/:type/:id', (req, res) => {
    let dbTbl = 'Club'
    if (req.params.type == '1' || req.params.type == 'Club') dbTbl = 'ClubView';
    else if (req.params.type == '2' || req.params.type == 'Spot') dbTbl = 'SpotView';

    let sql = `SELECT * FROM ${dbTbl} where id=${req.params.id}`;
    console.log(sql);
    conn.query(sql, function (err, rows, fields) {
        if (!err) {
            console.log(rows[0]);
            res.send(rows[0]);
        } else {
            console.log('query error : ' + err);
        }
    });
})

// All Group with Sorting
router.get('/Sort/:type/:condition/:method/:num', (req, res) => {
    let sql = `SELECT * FROM ${req.params.type}View WHERE ${req.params.condition} ORDER BY ${req.params.method} LIMIT 0, ${req.params.num}`; // Club ?��?��블에?�� Sorting ?��?�� num �? 까�???�� 값을 �??��?��
    console.log(sql);
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 ?��?��
        if (!error) {
            // console.log(rows);
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
});

// Create group
var groupId;
var returnTableValue;
const uploadGroupImg = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            let group = ``;
            if (req.params.type == 1) // Club
                group = `Club`;
            else if (req.params.type == 2) // Spot
                group = 'Spot';
            cb(null, `public/${group}MainImg`);
        },
        async filename(req, file, cb) {
            console.log(file.originalname);
            console.log(req.params.type);
            var sql1 = ``;
            var group = ``;
            if (req.params.type == 1) // Club
            {
                sql1 = `INSERT INTO Club (name, location, location_ll, description, keyword, leader) VALUES ('${req.body.name}', '${req.body.location}', ST_GeomFromText('POINT(${req.body.location_ll_x} ${req.body.location_ll_y})', 4326), '${req.body.description}','${req.body.keyword}', '${req.body.userId}')`;
                group = `Club`;
            }
            else if (req.params.type == 2) // Spot
            {
                sql1 = `INSERT INTO Spot (name, location, location_ll, description, keyword, time, leader) VALUES ('${req.body.name}', '${req.body.location}', ST_GeomFromText('POINT(${req.body.location_ll_x} ${req.body.location_ll_y})', 4326), '${req.body.description}','${req.body.keyword}', '${req.body.time}', '${req.body.userId}')`;
                group = 'Spot';
            }

            console.log(sql1);
            var fileName = '';
            try {
                await conn.beginTransaction();
                await conn.query(sql1, (error, rows) => {
                    groupId = rows.insertId;
                    fileName = groupId + path.extname(file.originalname);
                    cb(null, fileName);
                    console.log(fileName);
                    sql2 = `INSERT INTO ${group}User (${group}Id, userId, role) VALUES (${groupId}, ${req.body.userId}, 1)`;
                    console.log(sql2);
                    conn.query(sql2, (err, rows) => {
                        if (err) console.log(err);
                        else {
                            sql3 = `Update ${group} SET mainImg = '${fileName}' WHERE id = ${groupId}`;
                            console.log(sql3);
                            conn.query(sql3, (error, rows) => {
                                sql4 = `SELECT * FROM ${group}View WHERE id = ${groupId}`;
                                console.log(sql4);
                                conn.query(sql4, (error, rows) => {
                                    console.log(rows[0]);
                                    conn.commit();
                                    returnTableValue = rows[0];
                                    // res.json(rows[0]);
                                })
                            })
                        }
                    })
                })
            }
            catch (err) {
                console.log(err);
                await conn.rollback();
                // res.send({ result: false });
            }
            // cb(null, Date.now() + path.extname(file.originalname));
        },
    }),
}).single('file');

router.post('/:type', async (req, res) => {

    uploadGroupImg(req, res, async (err) => {
        if (err) {
            res.send({result: false});
        }
        else {
            res.json(returnTableValue);        }

    })

})

router.delete('/:type/:groupId/', async (req, res) => {
    let table = '';
    let imgSrc = '';

    if (req.params.type == '1') table = 'Club';
    else if (req.params.type == '2') table = 'Spot';
    else res.send({result: false});

    let sql1 = `SELECT mainImg from ${table} WHERE id=${req.params.groupId}`;
    let sql2 = `DELETE FROM ${table} WHERE id=${req.params.groupId}`;
    console.log(sql1);
    console.log(sql2);
    try {
        await conn.beginTransaction();
        await conn.query(sql1, async (error, rows) => {
            imgSrc = rows[0].mainImg;
            await conn.query(sql2, (error, rows) => {
                if (imgSrc)
                {
                    fs.unlink(`./public/ClubMainImg/${imgSrc}`, (err) => {
                        err ? console.log(imgSrc) : console.log(`${imgSrc}ï¿?? ?ï¿½ï¿½?ï¿½ï¿½?ï¿½ï¿½?ï¿½ï¿½ï¿?? ?ï¿½ï¿½?ï¿½ï¿½?ï¿½ï¿½?ï¿½ï¿½?ï¿½ï¿½?ï¿½ï¿½`);
                      })
                }
                conn.commit();
                res.send({ result: true });
            });
        });

    } catch (err) {
        console.log(err)
        await conn.rollback()
        res.send({ result: false });
    }
    
})


router.get('/Search/:type/:searchKey/:long/:lat', (req, res) => {

    let long = req.params.long ? Number(req.params.long) : 127;
    let lat = req.params.lat ? Number(req.params.lat) : 37;

    // Ref : [ST_Distance_Sphere ?ï¿½ï¿½?ï¿½ï¿½|https://tzara.tistory.com/45]
    let sql1 = `SELECT * FROM ${req.params.type}View WHERE (name LIKE '%${req.params.searchKey}%' OR location LIKE '%${req.params.searchKey}%' OR description LIKE '%${req.params.searchKey}%' OR keyword LIKE '%${req.params.searchKey}%') ORDER BY ST_Distance_Sphere(location_ll, point(${long}, ${lat})), numMember`;

    conn.query(sql1, function (error, rows, fields) {
        if (!error) {
            console.log(rows);
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
})

// Join Group 
router.get('/Join/:type/:groupId/:userId', (req, res) => {
    // console.log('Join Group');
    let sql = `INSERT INTO ${req.params.type}User (${req.params.type}Id, userId, role) VALUES (${req.params.groupId}, ${req.params.userId}, 0)`;
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

// Exit Group 
router.get('/Exit/:type/:groupId/:userId', (req, res) => {
    let sql = `DELETE FROM ${req.params.type}User
        WHERE ${req.params.type}User.${req.params.type}id = ${req.params.groupId}
        AND ${req.params.type}User.userId = ${req.params.userId}`;
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

// Get Group Member
router.get('/Member/:type/:groupId', (req, res) => {
    let sql = `SELECT User.id, User.name, User.photo, ${req.params.type}User.role 
    FROM ${req.params.type}, ${req.params.type}User, User
    WHERE ${req.params.type}User.${req.params.type}Id = ${req.params.groupId}
    AND ${req.params.type}User.userId = User.id
    AND ${req.params.type}User.${req.params.type}Id = ${req.params.type}.id`;
    console.log(sql)
    conn.query(sql, function (error, rows, fields) {
        if (!error) {
            console.log(rows);
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    })
})




module.exports = router;
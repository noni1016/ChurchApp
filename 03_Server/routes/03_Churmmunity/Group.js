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
    else if (req.params.type == '2' || req.params.type == 'Spot') dbTbl = 'Spot';

    let sql = `SELECT * FROM ${dbTbl} where id=${req.params.id}`;
    console.log(sql);
    conn.query(sql, function (err, rows, fields) {
        if (!err) {
            console.log(rows);
            res.send(rows);
        } else {
            console.log('query error : ' + err);
        }
    });
})

// All Club with Sorting
router.get('/Sort/:method/:num', (req, res) => {
    let sql = `SELECT * FROM ClubView ORDER BY ${req.params.method} LIMIT 0, ${req.params.num}`; // Club Å×ÀÌºí¿¡¼­ Sorting ÇØ¼­ num °³ ±îÁöÀÇ °ªÀ» °¡Á®¿È
    console.log(sql);
    conn.query(sql, function (error, rows, fields) { // sql Äõ¸® ¼öÇà
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
            cb(null, 'public/ClubMainImg');
        },
        async filename(req, file, cb) {
            console.log(file.originalname);
            let sql1 = `INSERT INTO Club (name, location, location_ll, description, keyword) VALUES ('${req.body.name}', '${req.body.location}', ST_GeomFromText('POINT(${req.body.location_ll_x} ${req.body.location_ll_y})', 4326), '${req.body.description}','${req.body.keyword}')`;
            console.log(sql1);
            let fileName = '';
            try {
                await conn.beginTransaction();
                await conn.query(sql1, (error, rows) => {
                    groupId = rows.insertId;
                    fileName = groupId + path.extname(file.originalname);
                    cb(null, fileName);
                    console.log(fileName);
                    sql2 = `INSERT INTO ClubUser (clubId, userId, role) VALUES (${groupId}, ${req.body.userId}, 1)`;
                    console.log(sql2);
                    conn.query(sql2, (err, rows) => {
                        if (err) console.log(err);
                        else {
                            sql3 = `Update Club SET mainImg = '${fileName}' WHERE id = ${groupId}`;
                            console.log(sql3);
                            conn.query(sql3, (error, rows) => {
                                sql4 = `SELECT * FROM ClubView WHERE id = ${groupId}`;
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
    let sql1 = ``;
    let sql2 = ``;
    let sql3 = ``;
    let sql4 = ``;

    uploadGroupImg(req, res, async (err) => {
        if (err) {
            res.send({result: false});
        }
        else {
            res.json(returnTableValue);
        }

        // sql1 = `INSERT INTO Club (name, location, location_ll, description, keyword) VALUES ('${req.body.name}', '${req.body.location}', ST_GeomFromText('POINT(${req.body.location_ll_x} ${req.body.location_ll_y})', 4326), '${req.body.description}','${req.body.keyword}')`;
        // console.log(sql1);

        // try {
        //     await conn.beginTransaction();
        //     await conn.query(sql1, (error, rows) => {
        //         groupId = rows.insertId;
        //         uploadGroupImg(req, res, async (err) => {
        //             console.log(req.file.filename);
        //             sql2 = `INSERT INTO ClubUser (clubId, userId, role) VALUES (${groupId}, ${req.body.userId}, 'leader')`;
        //             console.log(sql2);
        //             conn.query(sql2, (error, rows) => {
        //                 sql3 = `Update Club SET mainImg = '${req.file.filename}' WHERE id = ${groupId}`;
        //                 console.log(sql3);
        //                 conn.query(sql3, (error, rows) => {
        //                     sql4 = `SELECT * FROM ClubView WHERE id = ${groupId}`;
        //                     console.log(sql4);

        //                 })
        //             })
        //         })
        //     })
        // } catch (err) {
        //     console.log(err);
        //     await conn.rollback();
        //     res.send({ result: false });
        // }
    })

    // sql1 = `INSERT INTO Club (name, location, location_ll, description, keyword) VALUES ('${req.body.name}', '${req.body.location}', ST_GeomFromText('POINT(${req.body.location_ll_x} ${req.body.location_ll_y})', 4326), '${req.body.description}','${req.body.keyword}')` ;
    // console.log(sql1);

    // try {
    //     await conn.beginTransaction();
    //     await conn.query(sql1, (error, rows) => {
    //         groupId = rows.insertId;
    //         uploadGroupImg(req, res, async (err) => {
    //             console.log(req.file.filename);
    //             sql2 = `INSERT INTO ClubUser (clubId, userId, role) VALUES (${groupId}, ${req.body.userId}, 'leader')`;
    //             console.log(sql2);
    //             conn.query(sql2, (error, rows) => {
    //                 sql3 = `Update Club SET mainImg = '${req.file.filename}' WHERE id = ${groupId}`;
    //                 console.log(sql3);
    //                 conn.query(sql3, (error, rows) => {
    //                     sql4 = `SELECT * FROM ClubView WHERE id = ${groupId}`;
    //                     console.log(sql4);

    //                 })                    
    //             })
    //         })
    //     })
    // } catch (err) {
    //     console.log(err);
    //     await conn.rollback();
    //     res.send({ result: false });
    // }

    // uploadGroupImg(req, res, async (err) => {
    //     if (err) {
    //         res.send({fileName : null});
    //     }

    //     console.log(req.file.filename);
    //     console.log(req.body);

    //     if (req.params.type == '1') // Club
    //     {
    //         console.log('Create Club');
    //         // sql = `INSERT INTO Club (name, mainImg, location, description) VALUES ('${req.body.name}', '${req.file.filename}', '${req.body.location}', '${req.body.description}')` ;
    //         sql1 = `INSERT INTO Club (name, location, location_ll, description, keyword) VALUES ('${req.body.name}', '${req.body.location}', ST_GeomFromText('POINT(${req.body.location_ll_x} ${req.body.location_ll_y})', 4326), '${req.body.description}', '${req.body.keyword}')` ;
    //         console.log(sql1);
    //         try {
    //             await conn.beginTransaction();
    //             await conn.query(sql1, (error, rows) => {
    //                 // console.log(rows);
    //                 groupId = rows.insertId;
    //                 sql2 = `INSERT INTO ClubUser (clubId, userId, role) VALUES (${groupId}, ${req.body.userId}, 'leader')`;
    //                 console.log(sql2);
    //                 conn.query(sql2, (error, rows) => {
    //                     // console.log(rows);
    //                     sql3 = `UPDATE Club SET mainImg = '${groupId}${req.file.filename}' WHERE id = ${groupId}`;
    //                     console.log(sql3);
    //                     conn.query(sql3, (error, rows) => {
    //                         sql4 = `SELECT * FROM ClubView WHERE id = ${groupId}`;
    //                         console.log(sql4);
    //                         conn.query(sql4, (error, rows) => {
    //                             console.log(rows[0]);
    //                             conn.commit();
    //                             res.json(rows[0]);
    //                         })
    //                     })


    //                 });

                    
    //             });
    //         } catch (err) {
    //             console.log(err)
    //             await conn.rollback()
    //             res.send({ result: false });
    //         }
    
            
            
    //     } else if (req.params.type == '2') // Spot
    //     {
    //         console.log('Create Spot');

    //         sql1 = `INSERT INTO Spot (name, mainImg, location, location_ll, description, keyword, time) VALUES ('${req.body.name}', 'GroupImg/${req.file.filename}', '${req.body.location}', ST_GeomFromText('POINT(${req.body.location_ll_x} ${req.body.location_ll_y})', 4326), '${req.body.description}', '${req.body.keyword}', '${req.body.dateTime}')`;
    //         console.log(sql1);
    //         try {
    //             await conn.beginTransaction();
    //             await conn.query(sql1, (error, rows) => {
    //                 if (error) console.log('query error : ' + err);
    //                 console.log(rows);
    //                 groupId = rows.insertId;
    //                 sql2 = `INSERT INTO SpotUser (spotId, userId, role) VALUES (${groupId}, ${req.body.userId}, 'leader')`;
    //                 console.log(sql2);
    //                 conn.query(sql2, (error, rows) => {
    //                     sql3 = `SELECT * FROM Spot WHERE id = ${groupId}`;
    //                     console.log(sql3);
    //                     conn.query(sql3, (error, rows) => {
    //                         console.log(rows[0]);
    //                         conn.commit();
    //                         res.json(rows[0]);
    //                     })
    //                 });
    //             });
    //         } catch (err) {
    //             console.log(err);
    //             await conn.rollback()
    //             res.send({ result: false});
    //         }
    //     }

    // });

})

// Update
// router.put('/type/:type/id/:id', async (req, res) => {
router.put('/:type/:id', async (req, res) => {
    let imgSrc = '';
    let sql1 = ``;
    let sql2 = ``;
    let sql3 = ``;
    uploadGroupImg(req, res, async (err) => {
        if (err) {
            res.send({fileName : null});
        }

        if (req.file) console.log(req.file.filename);
        console.log(req.body);

        if (req.params.type == '1') // Club
        {
            console.log('Create Club');
            sql1 = `SELECT mainImg from Club WHERE id=${req.params.id}`;
            console.log(sql1);
            try {
                await conn.beginTransaction();
                await conn.query(sql1, async (error, rows) => {
                    imgSrc = rows[0].mainImg;
                    if (req.file) {
                        fs.unlink(`./public/${imgSrc}`, (err) => {
                            err ? console.log(imgSrc) : console.log(`${imgSrc}ï¿?? ?ï¿½ï¿½?ï¿½ï¿½?ï¿½ï¿½?ï¿½ï¿½ï¿?? ?ï¿½ï¿½?ï¿½ï¿½?ï¿½ï¿½?ï¿½ï¿½?ï¿½ï¿½?ï¿½ï¿½`);
                        });
                        imgSrc = 'GroupImg/' + req.file.filename;
                    }

                    sql2 = `UPDATE Club SET name = '${req.body.name}', mainImg = '${imgSrc}', location = '${req.body.location}', location_ll = ST_GeomFromText('POINT(${req.body.location_ll_x} ${req.body.location_ll_y})', 4326), description = '${req.body.description}', keyword = '${req.body.keyword}' WHERE id = ${req.params.id}`;
                    console.log(sql2);
                    await conn.query(sql2, (error, rows) => {
                        sql3 = `SELECT * FROM ClubView WHERE id = ${req.params.id}`;
                        console.log(sql3);
                        conn.query(sql3, (error, rows) => {
                            // console.log(rows);
                            console.log(rows[0]);
                            conn.commit();
                            res.json(rows[0]);
                        });                    
                    });
                })

            } catch (err) {
                console.log(err)
                await conn.rollback()
                res.send({ result: false });
            }
               
            
        } else if (req.params.type == '2') // Spot
        {
            console.log('Create Spot');
        }

    });

});

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
                    fs.unlink(`./public/${imgSrc}`, (err) => {
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


router.get('/Search/:searchKey/:long/:lat', (req, res) => {

    let long = req.params.long ? Number(req.params.long) : 127;
    let lat = req.params.lat ? Number(req.params.lat) : 37;

    // Ref : [ST_Distance_Sphere ?ï¿½ï¿½?ï¿½ï¿½|https://tzara.tistory.com/45]
    let sql1 = `SELECT * FROM ClubView WHERE (name LIKE '%${req.params.searchKey}%' OR location LIKE '%${req.params.searchKey}%' OR description LIKE '%${req.params.searchKey}%' OR keyword LIKE '%${req.params.searchKey}%') ORDER BY ST_Distance_Sphere(location_ll, point(${long}, ${lat})), numMember`;

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
    let sql = `INSERT INTO ${req.params.type}User (${req.params.type}Id, userId, role) VALUES (${req.params.groupId}, ${req.params.userId}, 'user')`;
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
var express = require('express');
var router = express.Router();
const multer = require('multer');
const fs = require('fs');
const util = require('util');




////////////////////////////////////////////////////////////Setings
// sql connection
const conn = require('../../config/database');
const path = require('path');

// Create group
const uploadGroupImg = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/GroupImg');
        },
        async filename(req, file, cb) {
            console.log(file.originalname);
            cb(null, Date.now() + path.extname(file.originalname));
        },
    }),
}).single('file');

router.post('/:type', async (req, res) => {
    let sql1 = ``;
    let sql2 = ``;
    let sql3 = ``;
    let clubId;
    uploadGroupImg(req, res, async (err) => {
        if (err) {
            res.send({fileName : null});
        }

        console.log(req.file.filename);
        console.log(req.body);

        if (req.params.type == '1') // Club
        {
            console.log('Create Club');
            // sql = `INSERT INTO Club (name, mainImg, location, description) VALUES ('${req.body.name}', '${req.file.filename}', '${req.body.location}', '${req.body.description}')` ;
            sql1 = `INSERT INTO Club (name, mainImg, location, location_ll, description, keyword) VALUES ('${req.body.name}', 'GroupImg/${req.file.filename}', '군포시 수리산로', ST_GeomFromText('POINT(${req.body.location_ll_y} ${req.body.location_ll_x})', 4326), '${req.body.description}', '${req.body.keyword}')` ;
            console.log(sql1);
            try {
                await conn.beginTransaction();
                await conn.query(sql1, (error, rows) => {
                    // console.log(rows);
                    clubId = rows.insertId;
                    sql2 = `INSERT INTO ClubUser (clubId, userId, role) VALUES (${clubId}, ${req.body.userId}, 'leader')`;
                    console.log(sql2);
                    conn.query(sql2, (error, rows) => {
                        // console.log(rows);
                        sql3 = `SELECT * FROM ClubView WHERE id = ${clubId}`;
                        console.log(sql3);
                        conn.query(sql3, (error, rows) => {
                            console.log(rows[0]);
                            conn.commit();
                            res.json(rows[0]);
                        })

                    });
                    
                });
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
                            err ? console.log(imgSrc) : console.log(`${imgSrc}를 정상적으로 삭제했습니다`);
                        });
                        imgSrc = 'GroupImg/' + req.file.filename;
                    }

                    sql2 = `UPDATE Club SET name = '${req.body.name}', mainImg = '${imgSrc}', location = '군포시 수리산로', location_ll = ST_GeomFromText('POINT(${req.body.location_ll_y} ${req.body.location_ll_x})', 4326), description = '${req.body.description}', keyword = '${req.body.keyword}' WHERE id = ${req.params.id}`;
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
                        err ? console.log(imgSrc) : console.log(`${imgSrc}를 정상적으로 삭제했습니다`);
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




module.exports = router;
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
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 ?��?��
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
            console.log(sql2);
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

router.post('New/:name/:long/:lat/:pastorName', async (req, res) => {
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

// Join Church
router.get('/Join/:churchId/:userId', (req, res) => {
    let sql = `INSERT INTO ChurchUser (churchId, userId, role) VALUES (${req.params.churchId}, ${req.params.userId}, 0)`;
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

// Exit Church
router.get('/Exit/:churchId/:userId', (req, res) => {
    let sql = `DELETE FROM ChurchUser
        WHERE ChurchUser.churchId = ${req.params.churchId}
        AND ChurchUser.userId = ${req.params.userId}`;
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

// const getEditChurchFormData = multer({
//             sql1 = `UPDATE Church SET name = '${req.body.name}' pastor = '${req.body.pastor}', location = '${req.body.location}', description = '${req.body.description}', location_ll = ST_GeomFromText('POINT(${req.body.location_ll_x} ${req.body.location_ll_y})', 4326), WHERE id = ${req.params.id}`;
          
// }).single('file')

const formData = multer({dest: 'uploads/'});

// router.put('/:id', (req, res) => {
//     res.json({hello: 2});
// })

router.put('/:id', formData.single('file'), async (req, res) => {
    let imgSrc = '';
    let sql1 = ``;
    let sql2 = ``;
    let sql3 = ``;
    sql1 = `UPDATE Church SET name = '${req.body.name}', pastor = '${req.body.pastor}', location = '${req.body.location}', description = '${req.body.description}', location_ll = ST_GeomFromText('POINT(${req.body.location_ll_x} ${req.body.location_ll_y})', 4326) WHERE id = ${req.params.id}`;
    console.log(sql1);
    try {
        await conn.beginTransaction();
        await conn.query(sql1, (error, rows) => {
            if (error) console.log(error);
            console.log(rows);
            sql2 = `SELECT * FROM ChurchView WHERE id = ${req.params.id}`;
            console.log(sql2);
            conn.query(sql2, (error, rows) => {
                console.log(rows[0]);
                conn.commit();
                res.json(rows[0]);
                // res.send({hello : "OK"})
            })
        })
    } catch (err) {
        console.log(err);
        await conn.rollback();
    }

});

//////////////////////////////////////////////////////////////////
// Feed
router.get('/:churchId/Feeds', (req, res) => {
    let sql = `SELECT * FROM ChurchFeed WHERE churchId = ${req.params.churchId} ORDER BY time DESC`;
    console.log(sql);
    conn.query(sql, function (error, rows, fields) { // sql ���� ����
        if (!error) {
            console.log(rows);
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
})


// Get Feed Comments
router.get('/:churchId/Feed/:feedId/Comments', (req, res) => {
    let sql = `SELECT * FROM ChurchComment WHERE feedId = ${req.params.feedId} ORDER BY time DESC`;
    console.log(sql);
    conn.query(sql, function (error, rows, fields) { // sql ���� ����
        if (!error) {
            // console.log(rows);
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
})

// Upload(Post) Feed Img
const uploadFeedImg = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/ChurchFeedImg');
        },
        filename(req, file, cb) {
            console.log(file.originalname);
            let maxId = -1;
            let sql = 'SELECT MAX(id) FROM ChurchFeed';
            conn.query(sql, function (error, rows, fields) {
                if (!error) {
                    var result = rows[0];
                    maxId = result['MAX(id)'];
                } else {
                    console.log('query error : ' + error);
                    maxId = -1;
                    return;
                }                
                console.log(maxId);
                var temp = file.originalname.split('.');
                var fileExt = temp[temp.length - 1];
                fileName = 'FeedId' + (maxId + 1) + '.' + fileExt;         
                cb(null, fileName);
            })
        },
    }),
});

router.post('/Feed/Img', uploadFeedImg.single('file'), async (req, res, next) => {
    console.log(req.file.filename);
    imgUpload = true;       
    res.send(true);
})

// Upload(Post) Feed Info 
router.post('/Feed', (req, res) => {
    console.log(req.body);
    let sql = ``;
    if (imgUpload)
    {
        sql = `INSERT INTO ChurchFeed (churchId, authorId, location, time, contentImg, contentText, notice) VALUES ('${req.body.groupId}', '${req.body.authorId}', "${req.body.location}", '${req.body.time}', '/ChurchFeedImg/${fileName}', "${req.body.contentText}", "${req.body.notice}")`;
        imgUpload = false;
    }
    else
    {
        sql = `INSERT INTO ChurchFeed (churchId, authorId, location, time, contentText, notice) VALUES ('${req.body.groupId}', '${req.body.authorId}', "${req.body.location}", '${req.body.time}', "${req.body.contentText}", "${req.body.notice}")`;
    }
    console.log(sql);
    conn.query(sql, function (error, rows, fields) { // sql ���� ����
        if (!error) {
            // console.log(rows);
            // console.log('query success')
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
})    

// Upload(Post) Feed Comment
router.post('/:churchId/Feed/:feedId/Comment', (req, res) => {
    let sql = `INSERT INTO ChurchComment (churchId, feedId, authorId, text) VALUES (${req.params.churchId}, ${req.params.feedId}, ${req.body.authorId}, '${req.body.text}')`;
    console.log(sql);
    conn.query(sql, function (error, rows, fields) { // sql ���� ����
        if (!error) {
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
})

// Get Feed Images
router.get('/:churchId/Imgs', (req, res) => {
    let sql = `SELECT contentImg FROM ChurchFeed WHERE churchId = ${req.params.churchId} AND contentImg != 'NULL' ORDER BY time DESC`
    console.log(sql);
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            // console.log(rows);
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
})


module.exports = router;
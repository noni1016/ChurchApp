var express = require('express');
var router = express.Router();
const multer = require('multer');
const fs = require('fs');

////////////////////////////////////////////////////////////Setings
// sql connection
const conn = require('../../config/database');
const path = require('path');
var fileName = '';
var imgUpload = false;

////////////////////////////////////////////////////////////Churmmunity Page
// All Club
router.get('/', (req, res) => {
    let sql = 'SELECT * FROM ClubView'; // Club 테이블에서 모든 값을 가져옴
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
    let sql = `SELECT * FROM ClubView ORDER BY ${req.params.method} LIMIT 0, ${req.params.num}`; // Club 테이블에서 Sorting 해서 num 개 까지의 값을 가져옴
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
    let sql = `SELECT User.id, User.name, User.photo, ClubUser.role
    FROM ClubView, ClubUser, User
    WHERE ClubUser.clubId = ${req.params.clubId}
        AND ClubUser.userId = User.id
        AND ClubUser.clubId = ClubView.id`;
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
    let sql = `SELECT numMember FROM ClubView WHERE id = ${req.params.clubId}`;
    // let sql = `SELECT COUNT(*) FROM ClubView, ClubUser, User
    // WHERE ClubUser.clubId = ${req.params.clubId}
    //     AND ClubUser.userId = User.id
    //     AND ClubUser.clubId = Club.id`;
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
router.get('/:clubId/Join/:userId', (req, res) => {
    let cnt = 0;
    let sql = `INSERT INTO ClubUser (clubId, userId, role) VALUES (${req.params.clubId}, ${req.params.userId}, 'user')`;
    console.log(sql);
    conn.query(sql, function (error, rows, fields) {
        if (!error) {
            console.log(rows);
            res.send('OK');
        } else {
            console.log('query error : ' + error);
        }
    });
})



// Exit club
router.get('/:clubId/Exit/:userId', async (req, res) => {
    let cnt = 0;
    let sql = `DELETE FROM ClubUser 
        WHERE ClubUser.clubId = ${req.params.clubId}
        AND ClubUser.userId = ${req.params.userId}`;
    console.log(sql);
    conn.query(sql, function (error, rows, fields) {
        if (!error) {
            console.log(rows);
            res.send('OK');
        } else {
            console.log('query error : ' + error);
        }
    });
})

// Get Feeds
router.get('/:clubId/Feeds', (req, res) => {
    let sql = `SELECT * FROM Feed WHERE clubId = ${req.params.clubId} ORDER BY time DESC`
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

// Get Feed Comments
router.get('/:clubId/Feed/:feedId/Comments', (req, res) => {
    let sql = `SELECT * FROM Comment WHERE feedId = ${req.params.feedId} ORDER BY time DESC`
    console.log(sql);
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
})

// Get Feed Images
router.get('/:clubId/Imgs', (req, res) => {
    let sql = `SELECT contentImg FROM Feed WHERE clubId = ${req.params.clubId} AND contentImg != 'NULL' ORDER BY time DESC`
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

// Upload(Post) Feed Img
const uploadFeedImg = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/FeedImg');
        },
        filename(req, file, cb) {
            console.log(file.originalname);
            let maxId = -1;
            let sql = 'SELECT MAX(id) FROM Feed';
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
})

router.post('/Feed/Img', uploadFeedImg.single('file'), async (req, res, next) => {
    console.log(req.file.filename);
    imgUpload = true;       
    res.send(true);
})

// Update(Put) Feed Img
const putFeedImg = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/FeedImg');
        },
        filename(req, file, cb) {
            console.log(file.originalname);
                var temp = file.originalname.split('.');
                var fileExt = temp[temp.length - 1];
                fileName = 'FeedId' + req.params.id + '.' + fileExt;         
                cb(null, fileName);
        },
    }),
})

router.put('/Feed/Img/:id', putFeedImg.single('file'), async (req, res, next) => {
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
        sql = `INSERT INTO Feed (clubId, authorId, location, time, contentImg, contentText, notice) VALUES ('${req.body.groupId}', '${req.body.authorId}', "${req.body.location}", '${req.body.time}', '/FeedImg/${fileName}', "${req.body.contentText}", "${req.body.notice}")`;
        imgUpload = false;
    }
    else
    {
        sql = `INSERT INTO Feed (clubId, authorId, location, time, contentText, notice) VALUES ('${req.body.groupId}', '${req.body.authorId}', "${req.body.location}", '${req.body.time}', "${req.body.contentText}", "${req.body.notice}")`;
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

// Update(Put) Feed Text 
router.put('/Feed/:id', (req, res) => {
    console.log(req.body);
    let sql = ``;
    if (imgUpload)
    {
        sql = `UPDATE Feed SET clubId = '${req.body.groupId}', location = "${req.body.location}", contentImg = "/FeedImg/${fileName}", contentText = "${req.body.contentText}" WHERE id = ${req.params.id}`;
        imgUpload = false;
    }
    else
    {
        sql = `UPDATE Feed SET clubId = '${req.body.groupId}', location = "${req.body.location}", contentText = "${req.body.contentText}" WHERE id = ${req.params.id}`;
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
});

// Upload(Post) Feed Comment
router.post('/:clubId/Feed/:feedId/Comment', (req, res) => {
    let sql = `INSERT INTO Comment (clubId, feedId, authorId, text) VALUES (${req.params.clubId}, ${req.params.feedId}, ${req.body.authorId}, '${req.body.text}')`;
    console.log(sql);
    conn.query(sql, function (error, rows, fields) { // sql ���� ����
        if (!error) {
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
})

router.delete('/:clubId/Feed/:feedId', async (req, res) => {
    let imgSrc = '';
    let sql1 = `SELECT contentImg from Feed WHERE id=${req.params.feedId}`;
    let sql2 = `DELETE FROM Feed WHERE id=${req.params.feedId}`;
    console.log(sql1);
    console.log(sql2);
    try {
        await conn.beginTransaction();
        await conn.query(sql1, (error, rows) => {
            imgSrc = rows[0];
        });
        await conn.query(sql2, (error, rows) => {
            if (req.params.imgSrc == '-1')
            {
                fs.unlink(`./public/${imgSrc}`, (err) => {
                    err ? console.log(imgSrc) : console.log(`${imgSrc}를 정상적으로 삭제했습니다`);
                  })
            }
        });
        await conn.commit();
        res.send({ result: true });
    } catch (err) {
        console.log(err)
        await conn.rollback()
        res.send({ result: false });
    }
    
})


// Get Notices
router.get('/:clubId/Notices', (req, res) => {
    let sql = `SELECT * FROM Feed WHERE clubId = ${req.params.clubId} AND notice = true ORDER BY time DESC`
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


// Member
router.put('/Leader/:clubId/:memberId', async (req, res) => {
    // 1. Change Group table's leader number
    let sql0 = `UPDATE Club Set leader = ${req.params.memberId} WHERE clubId = ${req.params.clubId}`;
    
    // 2. Change Group-User table's role of past leader
    let sql1 = `UPDATE ClubUser SET role = 0 WHERE clubId = ${req.params.clubId} AND role = 1`;

    // 3. Change Group-User table's role of current leader
    let sql2 = `UPDATE ClubUser SET role = 1 WHERE clubId = ${req.params.clubId} AND userId = ${req.params.memberId}`;

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

router.delete('/Member/:clubId/:memberId', (req, res) => {
    let sql = `DELETE FROM ClubUser WHERE clubId = ${req.params.clubId} AND userId = ${req.params.memberId}`;
    console.log(sql);

    conn.query(sql, (err, rows) => {
        if (!err) {
            res.json({result: true});
        } else {
            console.log(err);
            res.json({result: false});
        }
    })
})

module.exports = router;
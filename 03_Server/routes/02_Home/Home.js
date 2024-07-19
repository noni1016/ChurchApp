var express = require('express');
var router = express.Router();
const multer = require('multer');
const fs = require('fs');
const domain = 'http://121.139.124.10:7009';

////////////////////////////////////////////////////////////sql connection
const conn = require('../../config/database');
const path = require('path');


// MainFeed
router.get('/Feeds', (req, res) => {
    let sql = `SELECT * FROM Feed ORDER BY time DESC LIMIT 0, 100`;
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

// MainFeed Comment
router.get('/0/Feed/:feedId/Comments', (req, res) => {
    let sql = `SELECT * FROM Comment WHERE feedId = ${req.params.feedId} ORDER BY time DESC`;
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

// Upload(Post) Feed Info
// Image
let fileName = '';
const uploadFeedImg = multer({
    storage: multer.diskStorage({
        destination: 'public/FeedImg',
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
        }
    })
})


router.post('/Feed/Img', uploadFeedImg.single('file'), async (req, res) => {
    console.log(req.file.filename);
    imgUpload = true;
    res.send(true);
})

router.post('/Feed', (req, res) => {
    console.log(req.body);
    let sql = ``;
    if (imgUpload)
    {
        sql = `INSERT INTO Feed (authorId, location, time, contentImg, contentText) VALUES ('${req.body.authorId}', '${req.body.location}', '${req.body.time}', '/FeedImg/${fileName}', '${req.body.contentText}')`;
        imgUpload = false;
    }
    else
    {
        sql = `INSERT INTO Feed (authorId, location, time, contentText) VALUES ('${req.body.authorId}', '${req.body.location}', '${req.body.time}', '${req.body.contentText}')`;
    }
    console.log(sql);
    conn.query(sql, function (error, rows, fields) {
        if (!error) {
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    })
})

// Upload(Post) Feed Comment
router.post('/0/Feed/:feedId/Comment', (req, res) => {
    let sql = `INSERT INTO Comment (feedId, authorId, text) VALUES (${req.params.feedId}, ${req.body.authorId}, '${req.body.text}')`;
    console.log(sql);
    conn.query(sql, function (error, rows, fields) { // sql ���� ����
        if (!error) {
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
})


module.exports = router;
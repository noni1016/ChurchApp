var express = require('express');
var router = express.Router();
const multer = require('multer');
const fs = require('fs');
const util = require('util');




////////////////////////////////////////////////////////////Setings
// sql connection
const conn = require('../../config/database');
const path = require('path');

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

// router.post('/Group/Img', uploadGroupImg.single('file'), async (req, res, next) => {
//     console.log(req.file.filename);
//     imgUpload = true;       
//     res.send({fileName: `${req.file.filename}`});
// })

router.post('/:type', (req, res) => {
    let sql = ``;
    uploadGroupImg(req, res, (err) => {
        if (err) {
            res.send({fileName : null});
        }

        console.log(req.file.filename);
        console.log(req.body);

        if (req.params.type == '1') // Club
        {
            console.log('Create Club');
            // sql = `INSERT INTO Club (name, mainImg, location, description) VALUES ('${req.body.name}', '${req.file.filename}', '${req.body.location}', '${req.body.description}')` ;
            sql = `INSERT INTO Club (name, mainImg, location, description) VALUES ('${req.body.name}', 'GroupImg/${req.file.filename}', '군포시 수리산로', '${req.body.description}')` ;
        } else if (req.params.type == '2') // Spot
        {
            console.log('Create Spot');
        }

        console.log(sql);
        conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
            if (!error) {
                // console.log(rows);
                // console.log('query success')
                res.send({fileName: `${req.file.filename}`});
            } else {
                console.log('query error : ' + error);
            }
        });

    });

})

module.exports = router;
var express = require('express');
var router = express.Router();
const multer = require('multer');
const fs = require('fs');
const util = require('util');
const bodyParser = require('body-parser');



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

        if (req.params.type == '1') // Club
        {
            console.log('Create Club');
        } else if (req.params.type == '2') // Spot
        {
            console.log('Create Spot');
        }

        res.send({fileName: `${req.file.filename}`});
        
    });

})

module.exports = router;
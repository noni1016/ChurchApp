var express = require('express');
var router = express.Router();
const multer = require('multer');
const fs = require('fs');
const domain = 'http://121.139.124.10:7009';

////////////////////////////////////////////////////////////sql connection
const conn = require('../../config/database');

////////////////////////////////////////////////////////////Churmmunity
// User's Club
router.get('/:userId/Club', (req, res) => {
    let sql = `SELECT ClubView.*
    FROM ClubView, ClubUser, User
    WHERE ClubUser.userId = ${req.params.userId}
        AND ClubUser.userId = User.id
        AND ClubUser.clubId = ClubView.id`;
    console.log(sql)
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
});

// Get User Data
router.get('/:userId', (req, res) => {
    let sql = `SELECT * FROM User WHERE id = ${req.params.userId}`;
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

// Get User Data from domain id
router.get('/Domain/:domain/:id_domain', (req, res) => {
    let sql = `SELECT * FROM User WHERE id_${req.params.domain} = ${req.params.id_domain}`;
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

// Join(Upload) User
router.post('/Domain/:domain', async (req, res) => {
    let queryResult;
    let sql1 = `INSERT INTO User (name, photo, church, age, level, role, id_${req.params.domain}) VALUES ('${req.body.name}', '${req.body.photo}', '${req.body.church}', '${req.body.age}', '${req.body.level}', '${req.body.role}', '${req.body.id_domain}')`;
    let sql2 = `SELECT * FROM User WHERE id_${req.params.domain} = ${req.body.id_domain}`;
    console.log(sql1);
    console.log(sql2);
    try {
        await conn.beginTransaction();
        await conn.query(sql1);
        await conn.query(sql2, async (error, rows) => {
            queryResult = rows;
            console.log(queryResult);
            await conn.commit();
            res.send(queryResult);
        });
    } catch (err) {
        console.log(err)
        await conn.rollback()
        res.status(500).json(err)
    }
})

// Update(Put) User Information
// Update(Put) User Img
let fileName = '';
var queryRes;
const putUserImg = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/Profile');
        },
        async filename(req, file, cb) {
            console.log(file.originalname);
                var temp = file.originalname.split('.');
                var fileExt = temp[temp.length - 1];
                fileName = 'UserImg' + req.params.userId + '.' + fileExt;         
                cb(null, fileName);

                
                let sql1 = `UPDATE User SET photo = '${fileName}' WHERE id = ${req.params.userId}`;
                let sql2 = `SELECT * FROM User WHERE id = ${req.params.userId}`;
                console.log(sql1);
                
                try {
                    await conn.beginTransaction();
                    await conn.query(sql1);
                    console.log(sql2);
                    await conn.query(sql2, async (error, rows) => {
                        queryRes = rows[0];
                        await conn.commit();
                    });
                } catch (err) {
                    console.log(err);
                    await conn.rollback();                    
                }
        },
    }),
}).single('file');

router.put('/:userId/photo', async (req, res, next) => {
    // console.log(req.file.filename);
    console.log('Photo change');

    putUserImg(req, res, async (err) => {
        if (err) {
            res.status(500).json(err);
        }
        else {            
            console.log(queryRes);
            res.json(queryRes);
        }
    })

    // let queryRes = false;
    // let sql = `UPDATE User SET photo = '${domain}/Profile/${fileName}' WHERE id = ${req.params.userId}`;
    // console.log(sql);
    // conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
    //     if (!error) {
    //         console.log(rows.affectedRows);
    //         if (rows.affectedRows === 1) queryRes = true;
    //         // console.log('query success')
    //         res.send(queryRes);
    //     } else {
    //         console.log('query error : ' + error);
    //         res.send(queryRes);
    //     }
    // });

})



router.put('/:userId/:column', async (req, res) => {
    let queryRes;
    let sql1 = `UPDATE User SET ${req.params.column} = '${req.body.data}' WHERE id = ${req.params.userId}`;
    let sql2 = `SELECT * FROM User WHERE id = ${req.params.userId}`;
    console.log(sql1);



    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            console.log(rows.affectedRows);
            if (rows.affectedRows === 1) queryRes = true;
            // console.log('query success')
            res.send(queryRes);
        } else {
            console.log('query error : ' + error);
        }
    });
});


module.exports = router;
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
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 ?��?��
        if (!error) {
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
});

// User's Spot
router.get('/:userId/Spot', (req, res) => {
    let sql = `SELECT SpotView.*
    FROM SpotView, SpotUser, User
    WHERE SpotUser.userId = ${req.params.userId}
        AND SpotUser.userId = User.id
        AND SpotUser.spotId = SpotView.id
    ORDER BY SpotView.past, SpotView.time`;
    console.log(sql)
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 ?��?��
        if (!error) {
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
});

// User's Church
router.get('/:userId/Church', (req, res) => {
    let sql = `SELECT ChurchView.*
    FROM ChurchView, ChurchUser, User
    WHERE ChurchUser.userId = ${req.params.userId}
        AND ChurchUser.userId = User.id
        AND ChurchUser.churchId = ChurchView.id`;
    console.log(sql)
    conn.query(sql, function (error, rows, fields) { 
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
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 ?��?��
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
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 ?��?��
        if (!error) {
            console.log(rows);
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
});


const convertAgeRangeToEnum = (ageRange) => {
    if (ageRange == "AGE_0_9") return "어린이";
    else if (ageRange == "AGE_10_14") return "14세 이하"
    else if (ageRange == "AGE_15_19") return "청소년"
    else if (ageRange == "AGE_20_29") return "20 대"
    else if (ageRange == "AGE_30_39") return "30 대"
    else if (ageRange == "AGE_40_49") return "40 대"
    else if (ageRange == "AGE_50_59") return "50 대"
    else if (ageRange == "AGE_60_69") return "60 대"
    else if (ageRange == "AGE_70_79") return "70 대"
    else if (ageRange == "AGE_80_89") return "80 대"
    else if (ageRange == "AGE_90_ABOVE") return "90 대 이상"
    else return 11;
}

// Join(Upload) User
router.post('/Domain/:domain', async (req, res) => {
    let queryResult;
    let age = convertAgeRangeToEnum(req.body.age);
    let sql1 = `INSERT INTO User (name, photo, church, age, level, role, id_${req.params.domain}) VALUES ('${req.body.name}', '${req.body.photo}', '${req.body.church}', '${age}', '${req.body.level}', '${req.body.role}', '${req.body.id_domain}')`;
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
            // queryResult[0].age = convertAgeRangeEnumToAgeRange(rows[0].age);
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

router.get('/:userId/photo/default', (req, res) => {
    let sql1 = `UPDATE User SET photo = 'Jesus.png'`;
    let sql2 = `SELECT * FROM User WHERE id = ${req.params.userId}`;

    console.log(sql1);
    conn.query(sql1, function (err, rows, fields) {
        if (!err) {
            console.log(sql2)
            conn.query(sql2, function (err, rows, fields) {
                if (!err) {
                    console.log(rows)
                    res.send(rows[0]);
                } else {
                    console.log('query error' + err);
                }
            })
        } else {
            console.log('query error' + err);
        }
    })
})

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
})


router.put('/:userId', async (req, res) => {
    console.log(req.body);
    let sql1 = `UPDATE User SET name = '${req.body.name}', church = '${req.body.church}', location = '${req.body.location}', location_ll = ST_GeomFromText('POINT(${req.body.location_ll_x} ${req.body.location_ll_y})', 4326), description = '${req.body.description}' WHERE id = ${req.params.userId}`;
    let sql2 = `SELECT * FROM User WHERE id = ${req.params.userId}`;

    try {
        await conn.beginTransaction();
        console.log(sql1);
        await conn.query(sql1, async (error, rows) => {
            console.log(sql2);
            await conn.query(sql2, async (error, rows) => {
                console.log(rows[0]);
                conn.commit();
                res.json(rows[0]);
            });
        });
    } catch (err) {
        console.log(err);
        await conn.rollback()
        res.json({res: false});
    }
})


router.put('/:userId/:column', async (req, res) => {
    let queryRes;
    let sql1 = `UPDATE User SET ${req.params.column} = '${req.body.data}' WHERE id = ${req.params.userId}`;
    let sql2 = `SELECT * FROM User WHERE id = ${req.params.userId}`;
    console.log(sql1);



    conn.query(sql, function (error, rows, fields) { // sql 쿼리 ?��?��
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

// User delete
router.delete('/:userId', (req, res) => {
    let sql = `DELETE FROM User WHERE id=${req.params.userId}`;
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


module.exports = router;
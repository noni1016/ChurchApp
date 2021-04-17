var express = require('express');
var router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();

// sql connection
const conn = require('../config/database');

router.get('/', function (req, res, next) {
    res.json('BoardCrud route / ');
});

router.get('/getBoard', (req, res) => {
  let sql = 'SELECT * FROM board'; // board 테이블에서 모든 값을 가져옴
  conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
    if (!error) {
      // console.log(rows);
      res.send(rows);
    } else {
      console.log('query error : ' + error);
    }
  });
});

// Response to Post requests --> url post 요청에 응답. post 는 페이지에 데이터 입력을 요청하는 http 프로토콜
router.post('/pushBoardData', (req, res) => {
  console.log('request on');
  console.log(req.body);
  date = getToday();
  let sql = ``;
  if (req.body.image) {
    sql = `INSERT INTO board (title, writer, date, imgSrc) VALUES ('${req.body.title}', '${req.body.writer}', '${date}', '${req.body.image}')`;
  } else {
    sql = `INSERT INTO board (title, writer, date) VALUES ('${req.body.title}', '${req.body.writer}', '${date}')`;
  }

  console.log(sql);

  conn.query(sql, function (error, rows, fields) {
    if (!error) {
      // console.log(rows);
      res.send(rows);
    } else {
      console.log('query error : ' + error);
    }
  });
});

function getToday() {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0"+date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
} // 날짜를 YYYY-MM-DD 형태로 가져옴

router.get('/UpdateView/:num', function (req, res) {
    let sql = `UPDATE board SET view=view+1 WHERE num=${req.params.num}`;
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

router.get('/deleteBoardData/:num/:imgSrc', function (req, res) {
  
  fs.unlink(`./public/${req.params.imgSrc}`, (err) => {
    err ? console.log(req.params.imgSrc) : console.log(`${req.params.imgSrc}를 정상적으로 삭제했습니다`);
  })

  let sql = `DELETE FROM board WHERE num=${req.params.num}`;
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

const upload = multer({
  storage: multer.diskStorage({
      destination: function(req, file, cb) {
          cb(null, 'public/');
      },
      filename(req, file, cb) {
          // const ext = math.extname(file.originalname);
          cb(null, Date.now() + path.extname(file.originalname));
      },
  }),
  // limits: { fileSize: 5 * 1024 * 1024 },
})

router.post('/img', upload.single('file'), (req, res, next) => {
  console.log(req.file.filename);
  res.send({ fileName: `${req.file.filename}` })
})


module.exports = router;
//////////////////////////////////////////////////////////////////////////////
// imports
const express = require('express'); //require == import 인듯? express 웹프레임워크를 이용해 서버를 만든다.
const app = express();
const port = 7009; // localhost:7009 포트에 서버를 열어둠
app.use(express.json()); // express 에서 json 을 받아오려면 express.json() 모듈을 사용해야 함 (안될경우 BodyParser 를 추가로 사용)
//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////
// sql connection
var mysql = require('mysql'); // mysql javascript library 가져옴
var db_info = {
    host: '175.212.209.93', // mysql host 주소 입력. http 빼야함 wwwproject.iptime.org
    //host: '172.30.1.27',
    port: '3306', // mysql port 입력
    user: 'sjaCoders',
    password: 'Matthew28:19', // 비밀번호
    database: 'www' //사용할 database 이름
}

var conn = mysql.createConnection(db_info); // 연결 만들기

conn.connect(function(err) {
    if(err) console.error('mysql connection error : ' + err); // 에러 있으면 에러 띄움
    else console.log('mysql is connected successfully!');
});
//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////
// Run Server
app.listen(port, () => console.log(`Listening on port ${port}`));
//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////
// Response to Get requests --> url get 요청에 응답. get 은 페이지 정보만을 요청하는 http 프로토콜
app.get('/', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
}); // HomePage

app.get('/getBoard', (req, res) => {
    let sql = 'SELECT * FROM board'; // board 테이블에서 모든 값을 가져옴
    conn.query(sql, function (error, rows, fields) { // sql 쿼리 수행
        if (!error) {
            // console.log(rows);
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
}); // /getBoard page. 
//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////
// Response to Post requests --> url post 요청에 응답. post 는 페이지에 데이터 입력을 요청하는 http 프로토콜
app.post('/pushBoardData', (req, res) => {
    console.log('request on');
    console.log(req.body);
    date = getToday();
    let sql = `INSERT INTO board (title, writer, date) VALUES ('${req.body.title}', '${req.body.writer}', '${date}')`;
    conn.query(sql, function (error, rows, fields) {
        if (!error) {
            // console.log(rows);
            res.send(rows);
        } else {
            console.log('query error : ' + error);
        }
    });
});
//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////
// 기타 함수
function getToday() { 
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
}; // 날짜를 YYYY-MM-DD 형태로 가져옴
//////////////////////////////////////////////////////////////////////////////
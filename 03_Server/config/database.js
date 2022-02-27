
var mysql = require('mysql'); // mysql javascript library 가져옴
var db_info = {
    host: '175.212.209.93', // mysql host 주소 입력. http 빼야함 test : wwwproject.iptime.org
    //host: '172.30.1.27', // 내부망
    port: '3306', // mysql port 입력
    user: 'sjaCoders',
    password: 'Matthew28:19', // 비밀번호
    //database: 'www' // 사용할 database 이름. web test 시 www 사용
    database: 'churmmunity', // app test 시 churmmunity 사용 
    timezone: "Asia/Seoul",
    multipleStatements: true, // 새롭게 추가된 조건
}

var conn = mysql.createConnection(db_info); // 연결 만들기

conn.connect(function(err) {
    if (err) console.error('mysql connection error : ' + err); // 에러 있으면 에러 띄움
    else console.log('mysql is connected successfully!');
});

module.exports = conn;
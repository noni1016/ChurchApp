/*
    How to use?
        1. database 설정 : ./config/database.js 수정
        2. pm2 설치 (npm install pm2 -g)
        3. 서버 구동 (pm2 start index.js --watch) --> 서버 코드 변경시 자동으로 서버 재시작
            pm2 로 안돌릴거면 그냥 node index.js 하면 된다.
        4. 로그보기 (pm2 log)
        5. 서버 중단 (pm2 stop index.js)
*/

// imports
const express = require('express'); //require == import 인듯? express 웹프레임워크를 이용해 서버를 만든다.
const app = express();
const port = 7009; // localhost:7009 포트에 서버를 열어둠
app.use(express.json()); // express 에서 json 을 받아오려면 express.json() 모듈을 사용해야 함 (안될경우 BodyParser 를 추가로 사용)


// sql connection
const conn = require('./config/database');


// Run Server
app.listen(port, () => console.log(`Listening on port ${port}`));


// Response to Get requests --> url get 요청에 응답. get 은 페이지 정보만을 요청하는 http 프로토콜
app.get('/', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
}); // HomePage


// web test 용 routes
app.use('/BoardCrud', require('./routes_www/BoardCrud')); // /BoardCrud/ 로 접근하는 url 요청 처리


// app test 용 routes
app.use('/churmmunity', require('./routes_churmmunity/churmmunity')); // /churmmunity/ 로 접근하는 url 요청 처리

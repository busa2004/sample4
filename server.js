const compression = require('compression');
const cors = require('cors');
const express = require('express');
const app = express();
const route = require('./route.js');
const  createProxyMiddleware  = require("http-proxy-middleware");
app.use(compression());

app.use(
    "/finance",
    createProxyMiddleware({
      // proxy할 주소, 즉, 백단의 주소를 적어줍니다.
      target: "https://www.google.com",
      changeOrigin: true,
    })
);

app.use(
    "/rss",
    createProxyMiddleware({
      // proxy할 주소, 즉, 백단의 주소를 적어줍니다.
      target: "https://news.google.com",
      changeOrigin: true,
    })
);



app.use(express.static(__dirname+'/dist')) // 1번 미들웨어
app.use(express.static(__dirname+'/src')) // 1번 미들웨어

app.use('/', route);

app.use((req, res, next) => { // 404 처리 부분
  res.status(404).send('일치하는 주소가 없습니다!');
});

app.use((err, req, res, next) => { // 에러 처리 부분
  console.error(err.stack); // 에러 메시지 표시
  res.status(500).send('서버 에러!'); // 500 상태 표시 후 에러 메시지 전송
});

app.listen(3000, () => {
    console.log('서버 시작')
});
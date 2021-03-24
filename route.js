const express = require('express');
const path = require('path');
const router = express.Router(); // 라우터 분리
router.get('/', (req, res) => { // app 대신 router에 연결
//   res.sendFile(path.join(__dirname, 'src', 'index.html'));
    res.sendFile(path,'dist/index.html')
});
module.exports = router; // 모듈로 만드는 부분
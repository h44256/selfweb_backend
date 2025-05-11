var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/hell', function(req, res, next) {
  res.send('哈囉地域！我是 Express 練習生！');
});

module.exports = router;

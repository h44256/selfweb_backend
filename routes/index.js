var express = require('express');
const router = express.Router();
const db = require('../db');  // 引入你剛剛寫的 db.js

router.get('/test-db', function(req, res, next) {
  db.query('SELECT 1 + 1 AS result', function(err, results) {
    if (err) {
      console.error('資料庫連線失敗', err);
      return res.status(500).send('資料庫連線失敗');
    }
    console.log(results);
    res.send(`資料庫連線成功！1+1=${results[0].result}`);
  });
});

router.post('/users', function(req, res, next) {
  const { name, age } = req.body; // 從 body 抓資料

  // 先檢查資料有沒有傳
  if (!name || !age) {
    return res.status(400).send('請提供名字和年齡');
  }

  // 把資料插入到 users 表
  db.query(
    'INSERT INTO users (name, age) VALUES (?, ?)',
    [name, age],
    function(err, results) {
      if (err) {
        console.error('新增資料失敗', err);
        return res.status(500).send('資料庫錯誤');
      }
      console.log('新增成功', results);
      res.send('使用者新增成功！');
    }
  );
});

//把資料讀取出來
router.get('/api/users', function(req, res) {
  db.query('SELECT * FROM users', function(err, results) {
    if (err) {
      return res.status(500).json({ error: '資料庫錯誤' });
    }
    res.json(results); // 直接回傳 JSON 陣列
  });
});




/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.send('歡迎來到我的第一個Express網站!!！');
// });
router.get('/hello', function(req, res, next) {
  res.send('哈囉世界！我是 Express 練習生！');
});
router.post('/hello', function(req, res, next) {
  res.send('收到一個 POST??請求！');
});
router.get('/hello/:name/:id', function(req, res, next) {
  const userName = req.params.name; // 從路徑讀出來
  const userId = req.params.id;
  res.send(`哈囉，${userName}！${userId}`);
});
router.get('/search', function(req, res, next) {
  const keyword = req.query.keyword; // 從查詢字串讀出來
  res.send(`你搜尋的關鍵字是：${keyword}`);
});
router.post('/post-test', function(req, res) {
  console.log('收到的資料:', req.body);
  res.send(`收到你送來的資料了！內容是：${JSON.stringify(req.body)}`);
});




module.exports = router;

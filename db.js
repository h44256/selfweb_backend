require('dotenv').config();  // 要放在最上面

const mysql = require('mysql2');

// 建立連線池（連線池比較穩定，適合真實伺服器用）
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password:  process.env.DB_PASSWORD,  // 換成你剛剛設定的 root 密碼！
  database:  process.env.DB_NAME, // 剛剛建立的資料庫名稱
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 把 pool 這個連線池丟出去，其他檔案可以引入用
module.exports = pool;

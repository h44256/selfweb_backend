// 一載入頁面就發送 GET 請求
fetch('/api/users')
  .then(res => res.json()) // 把 response 的 JSON 拿出來
  .then(users => {
    const ul = document.getElementById('user-list');
    users.forEach(user => {
      const li = document.createElement('li');
      li.textContent = `${user.name}（${user.age} 歲）`;
      ul.appendChild(li);
    });
  })
  .catch(err => {
    console.error('載入失敗', err);
    alert('發生錯誤，無法載入資料');
  });

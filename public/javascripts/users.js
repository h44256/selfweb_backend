
document.getElementById("submit").addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const age = parseInt(document.getElementById("age").value);

  fetch("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, age }),
  })
    .then((res) => res.text())
    .then((msg) => alert(msg))
    .catch((err) => console.error("錯誤", err));
});


  
  

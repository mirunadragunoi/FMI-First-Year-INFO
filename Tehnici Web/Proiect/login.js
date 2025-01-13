const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

document.querySelector(".sign-up-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = e.target.querySelector("input[placeholder='Username']").value;
  const password = e.target.querySelector("input[placeholder='Password']").value;

  alert(`Username introdus: ${username}`);

  const data = { username, password };

  // AJAX request for sign-up
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8000", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function () {
      if (xhr.status === 200) {
          localStorage.setItem("username", username);
          alert(`Username salvat în LocalStorage: ${localStorage.getItem("username")}`);
          alert("User registered successfully!");
          window.location.href = 'index.html';
      } else if (xhr.status === 409) {
          alert("Acest utilizator este deja inregistrat!");
      } else {
          alert("Eroare la înregistrare!");
      }
  };

  xhr.send(JSON.stringify(data));
});

document.querySelector(".sign-in-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = e.target.querySelector("input[placeholder='Username']").value;
  const password = e.target.querySelector("input[placeholder='Password']").value;

  alert(`Username introdus: ${username}`);

  const data = { username, password };

  // AJAX request for sign-in
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", "http://localhost:8000", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function () {
      if (xhr.status === 200) {
          localStorage.setItem("username", username);
          alert(`Username salvat în LocalStorage: ${localStorage.getItem("username")}`);
          alert("Autentificare reușită!");
          window.location.href = 'index.html';
      } else if (xhr.status === 401) {
          alert("Prima oara inregistreaza-te, si dupa conecteaza te!");
      } else {
          alert("Eroare la autentificare!");
      }
  };

  xhr.send(JSON.stringify(data));
});
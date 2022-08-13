document.getElementById("login").innerHTML = `<form class="signin" method="">
<img class="mb-4" src="img/login.png" alt="logo" width="300px">
<h1 class="h3 mb-3 fw-normal text-center">Inicio de sesión</h1>

<div class="form-floating">
  <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" style="margin: 0 0 1em;" required>
  <label for="floatingInput">Email</label>
</div>
<div class="form-floating">
  <input type="password" class="form-control" id="floatingPassword" placeholder="Password" style="margin: 0 0 1em;" required>
  <label for="floatingPassword">Contraseña</label>
</div>

<button class="w-100 btn btn-lg btn-primary" type="submit" >Ingresar</button>
</form>`

document.querySelector('form').addEventListener('submit', submitform);

function submitform(e){
  e.preventDefault();
  sessionStorage.setItem('user',"user");
  window.location.href = "index.html";
}


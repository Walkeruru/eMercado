function redireccionarPagina(pagina){
    if(pagina === "login.html"){
        sessionStorage.removeItem("user")
        window.location.href = "login.html";
    } else window.location.href = pagina;
}
function userEmail(){
        let email= document.getElementById("userEmail");
        email.innerHTML= `
        <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle nav-link" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
  <a> ${localStorage.getItem("userLogin")}</a>
  </button>
  <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
    <li class="dropdown-item" onclick=redireccionarPagina("cart.html")>Mi carrito</li>
    <li class="dropdown-item" onclick=redireccionarPagina("my-profile.html")>Mi perfil</li>
    <li class="dropdown-item" onclick=redireccionarPagina("login.html")>Cerrar sesión</li>
  </ul>
</div>`
    };
    
userEmail();

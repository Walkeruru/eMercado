const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
function redireccionarPagina(pagina){
  if(pagina === "login.html"){
      sessionStorage.removeItem("user");
      localStorage.removeItem("userLogin");
      localStorage.removeItem("imagen");
      window.location.href = "login.html";
  } else window.location.href = pagina;
}
function userEmail(){
      let email= document.getElementById("userEmail");
      email.innerHTML= `
      <div class="dropdown">
<button class="btn btn-secondary dropdown-toggle nav-link" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
${perfilpic()}<a> ${localStorage.getItem("userLogin")}</a>
</button>
<ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
  <li class="dropdown-item" onclick=redireccionarPagina("cart.html")>Mi carrito</li>
  <li class="dropdown-item" onclick=redireccionarPagina("my-profile.html")>Mi perfil</li>
  <li class="dropdown-item" onclick=redireccionarPagina("login.html")>Cerrar sesión</li>
</ul>
</div>`
  };

function perfilpic(){
  if(localStorage.getItem("imagen")){
    return `<img src="${localStorage.getItem("imagen")}" id="perfilPic">`
  }else return `<span></span>`
}
getJSONData(CART_INFO_URL+'25801.json')
  .then(datos => {
    console.log(datos);
    datos = datos.data.articles[0]
    let contenedor = document.getElementById('container');
    contenedor.innerHTML=`
    <h2 class="text-center mt-4">Carrito de compras</h2>
    <h4>Articulos a comprar</h4>
    <table class="table">
  <thead>
    <tr>
      <th scope="col"> </th>
      <th scope="col">Nombre</th>
      <th scope="col">Costo</th>
      <th scope="col">Cantidad</th>
      <th scope="col">Subtotal</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row"><img src="${datos.image}" alt="Producto" width="70px"></th>
      <td>${datos.name}</td>
      <td>${datos.currency+" "+datos.unitCost}</td>
      <td><input type="number" value="1" class="form-control" id="cantidad" min="1"></td>
      <td class="fw-bold" id="subtotal">${datos.currency+" "+datos.unitCost}</td>
    </tr>
  </tbody>
</table>
<hr>
<h4 class="mt-4">Tipo de envío</h4>
<div class="form-check mt-3">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked>
  <label class="form-check-label" for="flexRadioDefault1">
    Premium 2 a 5 dias (15%)
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
  <label class="form-check-label" for="flexRadioDefault2">
    Express 5 a 8 dias (7%)
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3">
  <label class="form-check-label" for="flexRadioDefault3">
    Standard 12 a 15 dias (5%)
  </label>
</div>
<h4 class="mt-4">Dirección de envío</h4>
<div class="mb-3 row">
  <div class="col-6">
  <label for="calle" class="form-label">Calle  </label>
  <input type="text" class="form-control col" id="calle">
  </div>
  <div class="col-3">
  <label for="numero" class="form-label">Numero </label>
  <input type="text" class="form-control col" id="numero">
  </div>
</div>
<div class="row">
  <div class="col">
  <label for="esquina" class="form-label">Esquina </label>
  <input type="text" class="form-control" id="esquina">
  </div>
  <div class="col">
  </div>
</div>
<hr>
    `
    document.getElementById("cantidad").addEventListener("change",()=>{
      if(document.getElementById("cantidad").value>0)
      {document.getElementById("subtotal").innerHTML=`${datos.currency+" "+datos.unitCost*document.getElementById("cantidad").value}`}
      else alert("ingrese una cantidad Valida");
    })
  })
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
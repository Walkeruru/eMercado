userEmail();
getJSONData(CART_INFO_URL+'25801.json')
  .then(datos => {
    datos = datos.data.articles[0]
    let contenedor = document.getElementById('container');
    contenedor.innerHTML=`
    <h2 class="text-center mt-4"><svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-cart-check-fill" viewBox="0 0 16 16">
    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708z"/>
  </svg>Carrito de compras</h2>
    <hr>
    <h4>Articulos a comprar</h4>
    <form method="post" action="http://localhost:3000/compra" class=" needs-validation" novalidate>
    <input class="d-none" name="user" value=${localStorage.getItem('displayName') ||localStorage.getItem('userLogin')}>
    <div class="row" id="productoListado">
    </div>
<hr>
<h4 class="mt-4">Tipo de envío</h4>
<div class="form-check mt-3">
  <input class="form-check-input porcentajes" type="radio" name="radioPorcentaje" id="flexRadioDefault1" value="0.15" checked required>
  <label class="form-check-label" for="flexRadioDefault1">
    Premium 2 a 5 dias (15%)
  </label>
</div>
<div class="form-check">
  <input class="form-check-input porcentajes" type="radio" name="radioPorcentaje" id="flexRadioDefault2" value="0.07" required>
  <label class="form-check-label" for="flexRadioDefault2">
    Express 5 a 8 dias (7%)
  </label>
</div>
<div class="form-check">
  <input class="form-check-input porcentajes" type="radio" name="radioPorcentaje" id="flexRadioDefault3" value="0.05" required>
  <label class="form-check-label" for="flexRadioDefault3">
    Standard 12 a 15 dias (5%)
  </label>
  <div class="invalid-feedback">
Selecciona un tipo de envío
</div>
</div>
<h4 class="mt-4">Dirección de envío</h4>
<div class="mb-3 row">
  <div class="col-6">
  <label for="calle" class="form-label">Calle  </label>
  <input type="text" class="form-control col" id="calle" name="calle" required>
      <div class="invalid-feedback">
        Ingresa una calle
      </div>
  </div>
  <div class="col-3 col-lg-3 col-5">
  <label for="numero" class="form-label">Numero </label>
  <input type="text" class="form-control col" id="numero" name="numero" required>
  <div class="invalid-feedback">
        Ingresa un número
      </div>
  </div>
</div>
<div class="row">
  <div class="col">
  <label for="esquina" class="form-label">Esquina </label>
  <input type="text" class="form-control" id="esquina" name="esquina" required>
      <div class="invalid-feedback">
        Ingresa una esquina
      </div>
  </div>
  <div class="col">
  </div>
</div>
<hr>
<h4 class="mt-4">Costos</h4>
<div class="list-group-item list-group-item-action mt-3">
  <div class="row">
    <div class="col">
        <div class="d-flex w-100 justify-content-between">
            <h6>Subtotal</h6>
            <h6 class="text-muted" id="costoTotal"></h6>
        </div>
        <p class="mb-1 text-muted">Costo unitario del producto por cantidad</p>
    </div>
  </div>
</div>
<div class="list-group-item list-group-item-action">
  <div class="row">
    <div class="col">
        <div class="d-flex w-100 justify-content-between">
            <h6>Costo de envío</h6>
            <h6 class="text-muted" id="envioTotal"></h6>
        </div>
        <p class="mb-1 text-muted">Según el tipo de envío</p>
    </div>
  </div>
</div>
<div class="list-group-item list-group-item-action">
  <div class="row">
    <div class="col">
        <div class="d-flex w-100 justify-content-between">
            <h6>Total($)</h6>
            <h6 class="fw-bold" id="pagoTotal"></h6>
        </div>
    </div>
  </div>
</div>
<hr>
<h4>Forma de pago</h4>
<p><span id="metodoPago">No se ha seleccionado</span>
 <button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#modalPago">
    Seleccionar
  </button> </p>
  <div id="pagoNoSeleccionado">
    
  </div>
  <button class="btn btn-primary w-100" type="submit" id="finalizar">Finalizar compra</button>
  <div class="alert alert-success alert-dismissible fade " role="alert">
        ¡Has comprado con éxito!
  </div>
<!-- Modal -->
<div class="modal fade" id="modalPago" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title fw-bold" id="modalPago">Forma de pago</h5>
      </div>
      <div class="modal-body">
      <div class="container">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="formaDePago" id="credito" value="credito" required>  
          <label class="form-check-label" for="credito">
          Tarjeta de crédito
          </label>     
        </div>
        <hr>
        <div class="row">
          <div class="col-6">
            <label for="nroTarjeta" class="form-label">Número de tarjeta</label>
            <input type="text" class="form-control" id="nroTarjeta" name="nroTarjeta" required>
          </div>
          <div class="col-5">
            <label for="codTarjeta" class="form-label">Código de seg.</label>
            <input type="text" class="form-control" id="codTarjeta" name="codTarjeta" required>
          </div>
        </div>
        <div class="row">
          <div class="col-6 mt-3">
            <label for="vencimiento" class="form-label">Vencimiento (MM/AA)</label>
            <input type="text" class="form-control" id="vencimiento" name="vencimiento" required>
          </div>
        </div>
        <div class="form-check mt-4">
          <input class="form-check-input" type="radio" name="formaDePago" id="banco" value="banco" required>
          <label class="form-check-label" for="banco">
            Transferencia Bancaria
          </label>
        </div>
        <hr>
        <div class="row">
          <div class="col-6">
            <label for="nmoBanco" class="form-label">Número de cuenta</label>
            <input type="text" class="form-control" id="nmoBanco" name="nroBanco" required>
          </div>
        </div>
      </div>
    </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
</form>
    `;
    display();
    //evento para cambiar el subtotal al aumentar o disminuir la cantidad
    let inputs = document.querySelectorAll(".cantidad");
    let subtotal = document.querySelectorAll(".subtotal");
    let costo = document.querySelectorAll(".costo");
    for(let i=0; i<inputs.length; i++){
      inputs[i].addEventListener("change",()=>{
        if(inputs[i].value>0){
          inputs[i].setAttribute("value",inputs[i].value);
          subtotal[i].innerHTML=`Subtotal: ${costo[i].innerHTML.split(" ")[1]+" "+Number(costo[i].innerHTML.split(" ")[2])*inputs[i].value}`
          calcularCosto();
          costoEnvio();
          pagoTotal();
        }
        else {
          alert("ingrese una cantidad Valida");
          inputs[i].setAttribute("value",inputs[i].value);
        }
      })
    }
    //evento a los radios de envio que cambia el total y envio respecto al porcentaje seleccionado 
    let inputsPorcentajes = document.querySelectorAll(".porcentajes");
    for(let porcentaje of inputsPorcentajes){
      porcentaje.addEventListener("click",()=>{
        costoEnvio();
        pagoTotal();
      })
    }
    botonesForm();
    document.getElementById("finalizar").addEventListener("click",(e)=>{
      let form = document.querySelector("form");
      let avisoPago= document.getElementById("pagoNoSeleccionado");
      let alerta = document.querySelector(".alert");
      if (form.checkValidity()) {
        //pausa el post al servidor;
        e.preventDefault();
        e.stopPropagation();
        form.classList.remove('was-validated');
        avisoPago.innerHTML=' ';
        alerta.classList.add('show');
        inputs.forEach(input=>{
          input.style.borderColor = '#ced4da';
        })
      }else {
        e.preventDefault();
        e.stopPropagation();
        form.classList.add('was-validated');
        if(!document.getElementById('banco').checkValidity() && !document.getElementById('credito').checkValidity()){
          avisoPago.innerHTML='Debe seleccionar una forma de pago'
        }
        alerta.classList.remove('show');
      }
    })
     calcularCosto();
     costoEnvio();
     pagoTotal();
  });
function botonesForm(){
  let avisoPago= document.getElementById("pagoNoSeleccionado");
  //inhabilita los campos del radio no seleccionado en el modal
  document.getElementById("credito").addEventListener("click",()=>{
    avisoPago.innerHTML='';
    document.getElementById("vencimiento").disabled = false;
    document.getElementById("codTarjeta").disabled = false;
    document.getElementById("nroTarjeta").disabled = false;
    document.getElementById("nmoBanco").disabled = true;
    document.getElementById("metodoPago").innerHTML='Tarjeta de crédito';
  });
  document.getElementById("banco").addEventListener("click",()=>{
    avisoPago.innerHTML='';
    document.getElementById("nmoBanco").disabled = false;
    document.getElementById("vencimiento").disabled = true;
    document.getElementById("codTarjeta").disabled = true;
    document.getElementById("nroTarjeta").disabled = true;
    document.getElementById("metodoPago").innerHTML='Transferencia bancaria';
  });
}
function calcularCosto(){
  let subtotal = document.querySelectorAll(".subtotal");
  let total=0;
  for(let producto of subtotal){
    if(producto.innerHTML.split(" ")[1] != 'USD'){
     total += Number(producto.innerHTML.split(" ")[2]/42)
    }else total += Number(producto.innerHTML.split(" ")[2])
  }
  return document.getElementById("costoTotal").innerHTML = `USD ${total.toFixed(2)}`;
}
function costoEnvio(){
  let envio = 0;
  let subtotal = calcularCosto().split(" ")[1];
  let porcentajes = document.querySelectorAll(".porcentajes");
  for(let porcentaje of porcentajes){
    if(porcentaje.checked){
      envio = subtotal*porcentaje.value;
    }
  }
  return document.getElementById("envioTotal").innerHTML = `USD ${envio.toFixed(2)}`;
}
function pagoTotal(){
  let subtotal = calcularCosto().split(" ")[1];
  let envio = costoEnvio().split(" ")[1];
  let total = Number(subtotal)+Number(envio);
  return document.getElementById("pagoTotal").innerHTML = `USD ${total.toFixed(2)}`;
}

function display(){

  if(localStorage.getItem("carrito")){
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    let listado = document.getElementById("productoListado");
    listado.innerHTML='';
    for(let producto of carrito){
      listado.innerHTML += `
      <div class="col col-md-6">
      <div class="card mb-3" style="max-width: 540px;" data-producto =${carrito.indexOf(producto)+1}>
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${producto.image}" class="card-img-top mt-4 ms-md-2 rounded-3 border border-dark" alt="producto">
          </div>
    <div class="col-md-8">
      <div class="card-body">
        <h4 class="card-title fw-bold">${producto.name}</h4>
        <p class="card-text costo">Costo: ${producto.currency+" "+producto.unitCost}</p>
        <input type="number" value="1" class="form-control cantidad" name="cantidadItem" min="1">
        <p class="fw-bold subtotal mt-2">Subtotal: ${producto.currency+" "+producto.unitCost} </p>
        <button type="button" class="btn btn-outline-danger borrar" data-boton =${carrito.indexOf(producto)+1}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
  </svg>
      </button>
        <input class="d-none" name="producto" value=${producto.name.split(" ").join("-")}
      </div>
      </div>
      </div>
    </div>
      `;
    }
    let botones=document.querySelectorAll('button[data-boton]');
    botones.forEach(boton=>{
      boton.addEventListener("click",()=>{
        carrito.splice(boton.dataset.boton-1,1);
        localStorage.setItem("carrito",JSON.stringify(carrito));
        display();
      })
      })
      calcularCosto();
      costoEnvio();
      pagoTotal();
  }else{
    let auto = [{id: 50924, currency: "USD", image: "img/prod50924_1.jpg", name: "Peugeot 208", unitCost: 15200}]
    localStorage.setItem("carrito",JSON.stringify(auto));
    display();
  }
};
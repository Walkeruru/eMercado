fetch(`https://japceibal.github.io/emercado-api/products/${localStorage.getItem("producto")}.json`)
    .then(response => response.json())
    .then(data =>{ datosRecibidos = data;
        console.log(datosRecibidos);
        showProductInfo();
        showComentarios();
    })

    function showProductInfo(){
        let contenedor = document.getElementById("container");
        contenedor.innerHTML =`
        <div class="row">
        <h1 class="py-2 mt-3 fw-bold col-lg-10 align-self-center">${datosRecibidos.name}</h1>
        </div>
        <div class="row">
        <div id="carouselExampleControls" class="carousel slide mt-lg-2 col-lg-6" data-bs-ride="carousel">
            <div class="carousel-inner rounded-3">
                <div class="carousel-item active">
                    <img src="${datosRecibidos.images[0]}" class="d-block w-100" alt="...">
                </div>
            <div class="carousel-item">
                <img src="${datosRecibidos.images[1]}"  class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="${datosRecibidos.images[2]}" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="${datosRecibidos.images[3]}" class="d-block w-100" alt="...">
            </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        <div class="col-lg-6">
        <hr class="d-block d-md-none">
        <p class="fs-2">${datosRecibidos.currency} ${datosRecibidos.cost}</p>
        <div class="d-flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16">
                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
            </svg><p class="ms-2">Envío a todo el país</p>
        </div>
        <div class="d-flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#198754" class="bi bi-arrow-return-left align-self-center" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
            </svg> <p class="ms-2"><span class="text-success">Devolución gratis</span><br>
                <span class="text-muted">Tienes 30 días desde que lo recibes.</span>
            </p>
        </div>
        <h6 class="fw-bold mt-2">Cantidad de vendidos</h6>
        <div class="cantidadVendidos mt-3 shadow-sm" ><p>${datosRecibidos.soldCount}</p>
        </div>
        <div class="row">
            <button class="btn btn-success shadow col-lg-12 col-11 ms-lg-0 ms-3 p-2 align-self-center mt-3" id="btnComprar" onclick="carritoBtn()">Comprar ahora</button>
            <button class="btn btn-primary shadow col-lg-12 col-11 p-2 ms-lg-0 ms-3 align-self-center mt-lg-2 mt-2" id="btnagregarCarrito" onclick="comprar()">Agregar al carrito</button>
        </div>
        </div>
        </div>
        <hr>
        <h2>Descripción</h2>
        <p class="p-1">${datosRecibidos.description}</p>
        <h6 class="fw-bold">Categoría</h6>
        <p class="p-1">${datosRecibidos.category}</p>
        <hr>
        <div>
            <h4 class="mb-2">Medios de pago</h4>
            <div class="bg-success d-flex p-3 rounded align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFFFFF" class="bi bi-credit-card" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
                    <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
                  </svg> <span class="ms-2 text-white">¡Paga en hasta 12 cuotas sin interés!</span>
            </div>
            <p class="mt-4">Tarjetas de crédito <br>
            <span class="text-muted">¡Cuotas sin interés con bancos seleccionados!</span></p>
            <div class="d-flex">
                <img src="https://http2.mlstatic.com/storage/logos-api-admin/a5f047d0-9be0-11ec-aad4-c3381f368aaf-m.svg" alt="Visa">
                <img class="ms-4" src="https://http2.mlstatic.com/storage/logos-api-admin/b2c93a40-f3be-11eb-9984-b7076edb0bb7-m.svg" alt="American Express">
                <img class="ms-4" src="https://http2.mlstatic.com/storage/logos-api-admin/d7e372a0-f39b-11eb-8e0d-6f4af49bf82e-m.svg" alt="Oca">
                <img class="ms-4" src="https://http2.mlstatic.com/storage/logos-api-admin/aa2b8f70-5c85-11ec-ae75-df2bef173be2-m.svg"  alt="Mastercard"> 
            </div>
            <p class="mt-4">Efectivo</p>
            <div class="d-flex">
                <img src="https://http2.mlstatic.com/storage/logos-api-admin/8c527760-f39a-11eb-826e-6db365b9e0dd-m.svg" alt="Abitab">
                <img class="ms-4" src="https://http2.mlstatic.com/storage/logos-api-admin/c2d9dbb0-f39b-11eb-9984-b7076edb0bb7-m.svg" alt="Redpagos">
            </div>
        </div>
        <span id="alerta"></span>`;
}
function carritoBtn(){
    comprar();
    window.location.href = "cart.html";
}
//Evento que agrega el producto al carrito de compra usando el localstorage
function comprar(){
    document.getElementById("alerta").innerHTML=`
    <div class="alert alert-success alert-dismissible fade show" role="alert">
   El producto ha sido agregado al carrito!
   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-check" viewBox="0 0 16 16">
  <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
</svg>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `
    let produtoCarrito = {id:datosRecibidos.id,
        currency:datosRecibidos.currency,
        image:datosRecibidos.images[0],
        name:datosRecibidos.name,
        unitCost:datosRecibidos.cost
    };
    console.log(produtoCarrito);
    if(localStorage.getItem("carrito")){
        let carrito = JSON.parse(localStorage.getItem("carrito"));
        carrito.push(produtoCarrito);
        localStorage.setItem("carrito",JSON.stringify(carrito));
    }else{
        let carrito = [];
        carrito.push(produtoCarrito);
        localStorage.setItem("carrito",JSON.stringify(carrito));
    }
}
function showComentarios(){
        let contenedor = document.getElementById("container");
        fetch(`https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("producto")}.json`)
            .then(response => response.json())
            .then(data =>{
                comentarios = data
                contenedor.innerHTML +=`
                <hr>
        <h5 class="pt-4">Comentarios</h5>`
                for (let i=0; i<comentarios.length; i++){
                contenedor.innerHTML +=`
    <div class="border">
        <div class="pt-2 ps-2 d-flex flex-row" id="comentario${i}">
            <p class="fw-bold">${comentarios[i].user}</p> 
            <p class="me-2">-${comentarios[i].dateTime}</p>
        </div>
        <p class="ps-2">${comentarios[i].description}</p>
    </div>
        `
        estrellas(i,comentarios[i].score);}
        contenedor.innerHTML += `<div id="contenedorComentarios"></div>`
        contenedor.innerHTML += `
        <h5 class="pt-4">Comentar</h5>
        <form>
        <label for="texto">Tu opinón:
        <textarea id="texto" name="texto" class="form-control mt-2" cols="80" rows="3"></textarea>
        </label>
        <div>
        <label for="puntacion" >Tu puntación:
        <select id="puntacion" class="form-select pl-5 mt-2" name="puntacion">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        </select>
        </label>
        </div>
        <button class="btn btn-primary mt-2" id="boton">Enviar</button>
        </form>
        `
        productosRelacionados();
        addComentario();
            })
}
function estrellas(i,cantidadEstrellas){
        for(let j=1; j<6;j++){
            if(j<=cantidadEstrellas){
                document.getElementById(`comentario${i}`).innerHTML+=`<span class="fa fa-star checked"></span>`
            }
            else  document.getElementById(`comentario${i}`).innerHTML+=`<span class="fa fa-star"></span>`
        }
}

function addComentario(){
    document.getElementById("boton").addEventListener("click",(e)=>{
        e.preventDefault();
        let listadecomentarios = document.querySelectorAll("div.border");
        let textarea = document.getElementsByTagName("textarea");
        let puntaje = document.getElementsByTagName("select");
        let fecha = new Date();
        fecha =`${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
        document.getElementById("contenedorComentarios").innerHTML+=`
        <div class="border">
        <div class="pt-2 ps-4 d-flex flex-row" id="comentario${listadecomentarios.length}">
            <p class="fw-bold">${localStorage.getItem("userLogin")}</p> 
            <p>- ${fecha} -</p>
        </div>
        <p class="ps-4">${textarea[0].value}</p>
    </div>
        `;
        let i = document.querySelectorAll("div.border").length-1;
        estrellas(i,puntaje[0].value);
        textarea[0].value="";
        puntaje[0].value="1";
    })
}
function productosRelacionados(){
    let contenedor = document.getElementById("container");
    contenedor.innerHTML +=`
    <hr>
    <h6 class="fw-bold">Productos Relacionados</h6>
    <div class="row row-cols-md-4 g-4 d-none d-md-flex">
        <div class="col pt-4 pointer" onclick="redireccionar(${datosRecibidos.relatedProducts[0].id})">
            <img src="${datosRecibidos.relatedProducts[0].image}" class="card-img-top border" alt="...">
            <p>${datosRecibidos.relatedProducts[0].name}</p>
        </div>
        <div class="col pt-4 pointer" onclick="redireccionar(${datosRecibidos.relatedProducts[1].id})">
            <img src="${datosRecibidos.relatedProducts[1].image}" class="card-img-top border" alt="...">
            <p>${datosRecibidos.relatedProducts[1].name}</p>
        </div>
    </div>
    <!-----Carousel para celulares ----!>
    <div class="row d-block d-md-none">
        <div id="carouselProductos" class="carousel slide col-lg-4" data-bs-ride="carousel">
            <div class="carousel-inner pointer">
                <div class="carousel-item active" onclick="redireccionar(${datosRecibidos.relatedProducts[0].id})">
                    <img src="${datosRecibidos.relatedProducts[0].image}" class="card-img-top border" alt="...">
                    <p>${datosRecibidos.relatedProducts[0].name}</p>
                </div>
                <div class="carousel-item" onclick="redireccionar(${datosRecibidos.relatedProducts[1].id})">
                    <img src="${datosRecibidos.relatedProducts[1].image}" class="card-img-top border" alt="...">
                    <p>${datosRecibidos.relatedProducts[1].name}</p>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselProductos" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselProductos" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
            </div>
        </div>
    </div>
    `
}
function redireccionar(producto){
    localStorage.setItem("producto",producto);
    window.location.href = "product-info.html";
}
userEmail();
    

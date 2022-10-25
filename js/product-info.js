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
        <h2 class="py-4 col-lg-10 align-self-center">${datosRecibidos.name}</h2>
        <button class="btn btn-success col-lg-1 col-4 align-self-center" id="btnComprar" onclick="comprar()">Comprar</button>
        </div>
        <hr>
        <h6 class="fw-bold">Precio</h6>
        <p>${datosRecibidos.currency} ${datosRecibidos.cost}</p>
        <h6 class="fw-bold">Descripción</h6>
        <p>${datosRecibidos.description}</p>
        <h6 class="fw-bold">Categoría</h6>
        <p>${datosRecibidos.category}</p>
        <h6 class="fw-bold">Cantidad de vendidos</h6>
        <p>${datosRecibidos.soldCount}</p>
        <h6 class="fw-bold">Imágenes ilustrativas</h6>
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
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
        <span id="alerta"></span>`;
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
        <div class="pt-2 ps-4 d-flex flex-row" id="comentario${i}">
            <p class="fw-bold">${comentarios[i].user}</p> 
            <p>- ${comentarios[i].dateTime} -</p>
        </div>
        <p class="ps-4">${comentarios[i].description}</p>
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
    <div class="row row-cols-1 row-cols-md-4 g-4 pointer">
        <div class=" pt-4" onclick="redireccionar(${datosRecibidos.relatedProducts[0].id})">
            <img src="${datosRecibidos.relatedProducts[0].image}" class="card-img-top border" alt="...">
            <p>${datosRecibidos.relatedProducts[0].name}</p>
        </div>
        <div class="col pt-4" onclick="redireccionar(${datosRecibidos.relatedProducts[1].id})">
            <img src="${datosRecibidos.relatedProducts[1].image}" class="card-img-top border" alt="...">
            <p>${datosRecibidos.relatedProducts[1].name}</p>
        </div>
    `
}
function redireccionar(producto){
    localStorage.setItem("producto",producto);
    window.location.href = "product-info.html";
}
userEmail();
    
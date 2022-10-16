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
        <h2 class="py-4">${datosRecibidos.name}</h2>
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
        </div>`
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
    
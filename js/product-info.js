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
        <div class="row row-cols-1 row-cols-md-4 g-4">
        <div class="col">
        <img src="${datosRecibidos.images[0]}" class="card-img-top border" alt="...">
        </div>
        <div class="col">
        <img src="${datosRecibidos.images[1]}" class="card-img-top border" alt="...">
        </div>
        <div class="col">
        <img src="${datosRecibidos.images[2]}" class="card-img-top border" alt="...">
        </div>
        <div class="col">
        <img src="${datosRecibidos.images[3]}" class="card-img-top border" alt="...">
        </div>
        </div>
        `
    }
    function showComentarios(){
        let contenedor = document.getElementById("container");
        fetch(`https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("producto")}.json`)
            .then(response => response.json())
            .then(data =>{
                comentarios = data
                contenedor.innerHTML +=`
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
        console.log(contenedor);
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
        document.getElementById("contenedorComentarios").innerHTML+=`
        <div class="border">
        <div class="pt-2 ps-4 d-flex flex-row" id="comentario${listadecomentarios.length}">
            <p class="fw-bold">${localStorage.getItem("userLogin")}</p> 
            <p>- ${new Date()} -</p>
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

function userEmail(){
        let email= document.getElementById("userEmail");
        email.innerHTML= `<a class="nav-link"> ${localStorage.getItem("userLogin")}</a>`
    };
    
userEmail();
    
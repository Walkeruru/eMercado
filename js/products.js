const PRODUCTOS_URL = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`;
const ORDER_ASC_BY_PRECIO = "AZ";
const ORDER_DESC_BY_PRECIO = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
let busqueda = undefined;

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRECIO)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRECIO){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost){ return -1; }
            if ( a.cost < b.cost){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }
    return result;
}

function redireccionar(producto){
    localStorage.setItem("producto",producto);
    window.location.href = "product-info.html";
}

function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.products.length; i++){
        let category = currentCategoriesArray.products[i];
        console.log(category);
        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))){
                if(busqueda==undefined ||category.name.toLowerCase().includes(busqueda) || category.description.toLowerCase().includes(busqueda))
           { htmlContentToAppend += `
            <div onclick="redireccionar(${category.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${category.image}" alt="Auto ${category.id}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${category.name} - ${category.currency} ${category.cost}</h4>
                            <small class="text-muted">${category.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${category.description}</p>
                    </div>
                </div>
            </div>
            `}
        }
    }

        document.getElementById("listado").innerHTML =` <h4 style="text-align:center; padding:1em">Productos 
      <br>veras aqui todos los productos de la categoria ${currentCategoriesArray.catName}</h4>
        ${htmlContentToAppend}`;
}

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray.products = sortCategories(currentSortCriteria, currentCategoriesArray.products);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

document.addEventListener("DOMContentLoaded", function(e){
   fetch(PRODUCTOS_URL)
    .then(response => response.json())
  .then(data => {currentCategoriesArray = data;
    console.log(currentCategoriesArray);
    showCategoriesList();
    });
    
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_PRECIO);
    });
    
    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_PRECIO);
    });
    
    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });
    
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
    
        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });
    
document.getElementById("rangeFilterCount").addEventListener("click", function(){
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
        minCount = parseInt(minCount);
    }
    else{
        minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
        maxCount = parseInt(maxCount);
    }
    else{
        maxCount = undefined;
    }

    showCategoriesList();
});
document.getElementById("buscador").addEventListener("input",()=>{
    busqueda = document.getElementById("buscador").value.toLowerCase();
    showCategoriesList();
})

});

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
    
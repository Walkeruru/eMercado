const AUTOS_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

let currentCategoriesArray = [];

function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.products.length; i++){
        let category = currentCategoriesArray.products[i];

            htmlContentToAppend += `
            <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active">
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
            `
        }

        document.getElementById("listado").innerHTML =` <h4 style="text-align:center; padding:1em">Productos 
      <br>veras aqui todos los productos de la categoria ${currentCategoriesArray.catName}</h4>
        ${htmlContentToAppend}`;
}

document.addEventListener("DOMContentLoaded", function(e){
   fetch(AUTOS_URL)
    .then(response => response.json())
  .then(data => {currentCategoriesArray = data;
    console.log(currentCategoriesArray);
    showCategoriesList();
    });
});
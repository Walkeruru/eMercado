if(sessionStorage.getItem("user")!=="user"){
    window.location.href = "login.html"
}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

function userEmail(){
    let email= document.getElementById("userEmail");
    email.innerHTML= `<a class="nav-link"> ${localStorage.getItem("userLogin")}</a>`
};

userEmail();

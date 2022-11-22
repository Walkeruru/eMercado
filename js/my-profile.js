userEmail();
if(sessionStorage.getItem("user")!=="user"){
    window.location.href = "login.html"
}

document.getElementById("perfil").innerHTML = `
    <div class="row">
        <h2 class="py-4 col-md-10 col-8  align-self-center">Perfil</h2>
        <img class="col-2 mt-2 align-self-center" src="${localStorage.getItem("imagen") || "./img/img_perfil.png"}" alt="imagen de perfil predeterminada" id="fotoPerfil">
    </div>
    <hr>
    <div id="alert"></div>
    <div class="container">
    <form class="row g-3 mt-4 needs-validation" novalidate id="form">
    <div class="row">
        <div class="col-6"><label class="form-label"  for="nombre">Primer Nombre*</label><input class="form-control" type="text" name="nombre" id="nombre" value="${localStorage.getItem("nombre") || ""}" required><div class="invalid-feedback">
            Ingresa un nombre.
        </div></div>
        <div class="col-6"><label class="form-label" for="nombreDos">Segundo Nombre</label><input class="form-control" type="text" name="nombreDos" id="nombreDos" value="${localStorage.getItem("segundoNombre") || ""}"></div>
    </div>
    <div class="row mt-2">
        <div class="col-6"><label class="form-label"  for="apellido">Primer Apellido*</label><input class="form-control" type="text" name="apellido" id="apellido" value="${localStorage.getItem("apellido") || ""}" required><div class="invalid-feedback">
            Ingresa un apellido.
        </div></div>
        <div class="col-6"><label class="form-label"  for="apellidoDos">Segundo Apellido</label><input class="form-control" type="text" name="apellidoDos" id="apellidoDos" value="${localStorage.getItem("segundoApellido") || ""}"></div>
    </div>
    <div class="row mt-2">
        <div class="col-6"><label class="form-label"  for="email">Email*</label><input class="form-control" type="email" name="email" id="email" required value="${localStorage.getItem("userLogin") || ""}"><div class="invalid-feedback">
            Ingresa un Email.
        </div></div>
        <div class="col-6"><label class="form-label" for="perfilFoto">Imagen de perfil</label><input class="form-control" type="file" name="foto" id="perfilFoto" ></div>
    </div>
    <div class="row mb-4 mt-2">
        <div class="col-6"><label class="form-label" for="tel">Teléfono de contacto*</label><input class="form-control" type="text" name="tel" id="tel" value="${localStorage.getItem("telefono") || ""}" min-length="6" required><div class="invalid-feedback">
            Ingresa un numero de teléfono.
        </div></div>
    </div>
    <hr>
    <button class="btn btn-primary col-lg-2 col-4" id="btnForm">Guardar cambios</button>
    </form>
    </div>
`
//convierte la imagen introducida en el input[type=File] en Base64 code;
document.getElementById("perfilFoto").addEventListener("change", ()=>{
    const reader = new FileReader();

    reader.addEventListener("load", ()=>{
        localStorage.setItem("imagen", reader.result);
        document.getElementById("fotoPerfil").src = localStorage.getItem("imagen");
        userEmail();
    });
    reader.readAsDataURL(document.getElementById("perfilFoto").files[0]);
});

//Guarda los datos ingresados en el local Storage para ser agregados a los inputs al momento de cargar la pagina;
const form = document.getElementById("form");
form.addEventListener('submit', function (event) {
    event.preventDefault()
    event.stopPropagation()
    if (form.checkValidity()) {
        localStorage.setItem("nombre", document.getElementById("nombre").value);
        localStorage.setItem("segundoNombre", document.getElementById("nombreDos").value);
        localStorage.setItem("apellido", document.getElementById("apellido").value);
        localStorage.setItem("segundoApellido", document.getElementById("apellidoDos").value);
        localStorage.setItem("userLogin", document.getElementById("email").value);
        localStorage.setItem("telefono", document.getElementById("tel").value);
        document.getElementById("alert").innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            Los datos fueron guardados correctamente!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
}
    form.classList.add('was-validated')
});
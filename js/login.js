document.getElementById("login").innerHTML = `<form class="signin" method="">
<img class="mb-4" src="img/login.png" alt="logo" width="300px">
<h1 class="h3 mb-3 fw-normal text-center">Inicio de sesión</h1>

<div class="form-floating">
  <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" style="margin: 0 0 1em;" required>
  <label for="floatingInput">Email</label>
</div>
<div class="form-floating">
  <input type="password" class="form-control" id="floatingPassword" placeholder="Password" style="margin: 0 0 1em;" required>
  <label for="floatingPassword">Contraseña</label>
</div>

<button class="w-100 btn btn-lg btn-primary" type="submit" >Ingresar</button>
<button type="button" class="login-with-google-btn w-100 mt-2" id="google">
Sign in with Google
</button>
</form>
`

document.querySelector('form').addEventListener('submit', submitform);

function submitform(e){
  e.preventDefault();
  localStorage.setItem("userLogin",document.getElementById("floatingInput").value);
  sessionStorage.setItem('user',"user");
  window.location.href = "index.html";
}
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
    import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";

    const firebaseConfig = {
      apiKey: "AIzaSyA_neboiENtrlzS-DJgZqAdoxKct0AuLW4",
      authDomain: "emercadojap-551b7.firebaseapp.com",
      projectId: "emercadojap-551b7",
      storageBucket: "emercadojap-551b7.appspot.com",
      messagingSenderId: "63543806482",
      appId: "1:63543806482:web:35ba60af9f1f343456a6cb"
    };

    const app = initializeApp(firebaseConfig);
    console.log(app);

    export const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    export const inicio = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user);
            console.log(user.displayName);
            localStorage.setItem("userLogin",user.email);
            localStorage.setItem("imagen",user.photoURL);
            localStorage.setItem("displayName", user.displayName);
            sessionStorage.setItem('user',"user");
            window.location.href = "index.html";
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            });
  }

document.getElementById("google").addEventListener("click",inicio);
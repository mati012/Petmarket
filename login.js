document.addEventListener("DOMContentLoaded", () => {
  const registerButton = document.getElementById("registerButton");
  const loginButton = document.getElementById("loginButton");
  const logoutButton = document.getElementById("logoutButton");
  const userNameDisplay = document.getElementById("userNameDisplay");
  const adminOptions = document.getElementById("adminOptions");
  const carritoButton = document.getElementById("carrito"); 
  const editarUsuario = document.getElementById("editarUsuario")

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {

    registerButton.style.display = "none";
    loginButton.style.display = "none";
    editarUsuario.style.display= "none";    

    logoutButton.style.display = "inline-block";
    carritoButton.style.display = "inline-block";
    editarUsuario.style.display= "inline-block"; 

   
    userNameDisplay.textContent = `Bienvenido, ${currentUser.nombre}`;
    userNameDisplay.style.display = "inline";

   
    if (currentUser.correo === "admin@gmail.com" && currentUser.contrasena === "Mascostas123") {
      adminOptions.style.display = "block";
    }
  }

  const form = document.getElementById("form-validation");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const correo = document.getElementById("correo").value.trim();
      const contrasena = document.getElementById("contrasena").value.trim();

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (user) => user.correo === correo && user.contrasena === contrasena
      );

      if (user || (correo === "admin@gmail.com" && contrasena === "Mascostas123")) {
        const currentUser = user || { nombre: "Admin", correo, contrasena };
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        alert("Login exitoso");
        window.location.href = "index.html";
      } else {
        alert("Correo o contraseña incorrecta");
      }
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.reload();
    });
  }
});

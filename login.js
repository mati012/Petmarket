

document.addEventListener("DOMContentLoaded", () => {
   
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      window.location.href = "index.html"; 
      return; 
  
    }
    const form = document.getElementById("form-validation");
    const clearButton = document.getElementById("limpiarForm");
  


    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const correo = document.getElementById("correo").value.trim();
      const contrasena = document.getElementById("contrasena").value.trim();
  
      
      const users = JSON.parse(localStorage.getItem("users")) || [];
      
     
      const user = users.find(user => user.correo === correo && user.contrasena === contrasena);
  
      if (user) {
       
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("Login exitoso");
        window.location.href = "index.html";  
      } else {
        
        alert("Correo o contraseña incorrecta");
      }
    });
  });
  
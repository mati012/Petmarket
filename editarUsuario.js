document.addEventListener("DOMContentLoaded", () => {
    const registerButton = document.getElementById("registerButton");
    const loginButton = document.getElementById("loginButton");
    const logoutButton = document.getElementById("logoutButton");
    const userNameDisplay = document.getElementById("userNameDisplay");
    const adminOptions = document.getElementById("adminOptions");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    
  
    if (currentUser) {
      registerButton.style.display = "none";
      loginButton.style.display = "none";
      logoutButton.style.display = "inline-block";
      userNameDisplay.textContent = `Bienvenido, ${currentUser.nombre}`;
      userNameDisplay.style.display = "inline";
  
      if (currentUser.correo === "admin@gmail.com" && currentUser.contrasena === "Mascostas123") {
        adminOptions.style.display = "block";
      }

      document.getElementById("nombre").value = currentUser.nombre;
      document.getElementById("nombreUsuario").value = currentUser.nombreUsuario;
      document.getElementById("correo").value = currentUser.correo;
      document.getElementById("direccion").value = currentUser.direccion;

    }
  
    const form = document.getElementById("form-validation");
 
    if (form  ) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
  
        const nombre = document.getElementById("nombre").value.trim();
        const nombreUsuario = document.getElementById("nombreUsuario").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const direccion = document.getElementById("direccion").value.trim();
   

       
  
        let valid = true;
  
    
      
  
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
          alert("Correo inválido");
          valid = false;
        }

        if (valid) {
       
          const updatedUser = {
            ...currentUser,
            nombre,
            nombreUsuario,
            correo,
            direccion,
           
          };
  
          const users = JSON.parse(localStorage.getItem("users")) || [];
          const userIndex = users.findIndex((user) => user.correo === currentUser.correo);
  
          if (userIndex !== -1) {
            users[userIndex] = updatedUser;
          }
          localStorage.setItem("users", JSON.stringify(users));
          localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  
          alert("Datos actualizados correctamente");
          window.location.href = "index.html";
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
  
  const validatePassword = (password) => {
    const hasNumber = /\d/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const validLength = password.length >= 6 && password.length <= 18;
  
    return {
      isValid: hasNumber && hasUpperCase && validLength,
      errors: [
        !hasNumber && "La contraseña debe contener al menos un número",
        !hasUpperCase && "La contraseña debe contener al menos una letra mayúscula",
        !validLength && "La contraseña debe tener entre 6 y 18 caracteres",
      ].filter(Boolean),
    };
  };
  
  const validateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
  
    return age >= 13;
  };
  
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-validation");
  const clearButton = document.createElement("button");
  
  clearButton.type = "button";
  clearButton.className = "btn btn-secondary mt-3";
  clearButton.textContent = "Limpiar Formulario";
  form.appendChild(clearButton);

  
  const validatePassword = (password) => {
    const hasNumber = /\d/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const validLength = password.length >= 6 && password.length <= 18;
    
    return {
      isValid: hasNumber && hasUpperCase && validLength,
      errors: [
        !hasNumber && "La contraseña debe contener al menos un número",
        !hasUpperCase && "La contraseña debe contener al menos una letra mayúscula",
        !validLength && "La contraseña debe tener entre 6 y 18 caracteres"
      ].filter(Boolean)
    };
  };

 
  const validateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age >= 13;
  };

  const mostrarError = (input, message) => {
    const formGroup = input.parentElement;
    input.classList.add("is-invalid");
    formGroup.classList.add("was-validated");
    const small = formGroup.querySelector("small");
    if (small) {
      small.innerHTML = message;
    }
  };

  const limpiarError = (input) => {
    if (input) {
      const formGroup = input.parentElement;
      input.classList.remove("is-invalid");
      formGroup.classList.remove("was-validated");
      const small = formGroup.querySelector("small");
      if (small) {
        small.innerText = "";
      }
    }
  };

 
  const limpiarFormulario = () => {
    form.reset();
    const inputs = form.querySelectorAll("input");
    inputs.forEach(input => limpiarError(input));
  };

  clearButton.addEventListener("click", limpiarFormulario);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
  
      const nombre = document.getElementById("nombre");
      const nombreUsuario = document.getElementById("nombreUsuario");
      const correo = document.getElementById("correo");
      const repetirCorreo = document.getElementById("correovalid");
      const contrasena = document.getElementById("contrasena");
      const repetirContrasena = document.getElementById("contrasenavalid");
      const direccion = document.getElementById("direccion");
      const fechaNac = document.getElementById("fechaNac");
  
     
      [nombre, nombreUsuario, correo, repetirCorreo, contrasena, repetirContrasena, fechaNac].forEach(input => {
        if (input.value.trim() === "") {
          mostrarError(input, `El campo ${input.placeholder || input.name} es obligatorio`);
          valid = false;
        } else {
          limpiarError(input);
        }
      });
  
     
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (correo.value.trim() !== "" && !emailRegex.test(correo.value.trim())) {
        mostrarError(correo, "El formato del correo electrónico es incorrecto");
        valid = false;
      }
  
    
      if (correo.value.trim() !== repetirCorreo.value.trim()) {
        mostrarError(repetirCorreo, "Los correos electrónicos no coinciden");
        valid = false;
      }
  
    
      if (contrasena.value.trim() !== "") {
        const passwordValidation = validatePassword(contrasena.value.trim());
        if (!passwordValidation.isValid) {
          mostrarError(contrasena, passwordValidation.errors.join("<br>"));
          valid = false;
        }
      }
  
      
      if (contrasena.value.trim() !== repetirContrasena.value.trim()) {
        mostrarError(repetirContrasena, "Las contraseñas no coinciden");
        valid = false;
      }
  

      if (fechaNac.value && !validateAge(fechaNac.value)) {
        mostrarError(fechaNac, "Debes tener al menos 13 años para registrarte");
        valid = false;
      }
  
      if (valid) {
        window.alert("Cuenta Creada exitosamente ")
        window.location.href = "index.html";
      }
    });
  
   
    const inputs = form.querySelectorAll("input");
    inputs.forEach(input => {
      input.addEventListener("input", () => {
        limpiarError(input);
      });
    });
  });
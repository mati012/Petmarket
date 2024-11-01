const form= document.getElementById("form-validation")

if(form){
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const correo = document.getElementById("correo").value.trim();
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(
            (user) => user.correo === correo 
          );

        if(user){
            alert(" se ha enviado un correo electronico para confirmacion")
            window.location.href = "index.html";
        }
        else{
            alert("correo incorrecto")
        }

    })



}
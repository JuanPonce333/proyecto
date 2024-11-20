const boton = document.getElementById("boton").addEventListener("click", function(event){
    event.preventDefault();    

    const nombre = document.getElementById("name").value;
    const email = document.getElementById("correo").value;
    const contraseña = document.getElementById("password").value;

    const usuario = {
        nombre: nombre,
        email: email,
        contraseña: contraseña
    };

    fetch('http://127.0.0.1:5000/usuarios',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.mensaje);
        if (data.mensaje === "Usuario registrado"){
            window.location.href = "login.html"
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Ocurrió un error durante el registro")
    })
})
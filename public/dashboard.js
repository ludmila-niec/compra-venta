const nombreDelUsuario = document.getElementById("nombreUsuario")


window.onload = function() {
    fetch("/usuarios", {
            credentials: "include",
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            nombreUsuario(data);
        });
};
// funcion que muestra los datos del usuario en el form
function nombreUsuario(datos) {
    let dataUsuario = datos.data;
    let nombre = dataUsuario.nombre
    let nombreMayuscula = nombre[0].toUpperCase() + nombre.slice(1)
    nombreDelUsuario.innerText = nombreMayuscula
}
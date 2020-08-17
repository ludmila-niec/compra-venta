// constantes de los input del formulario
const nombreRegistrado = document.getElementById("nombreRegistrado");
const apellidoRegistrado = document.getElementById("apellidoRegistrado");
const emailRegistrado = document.getElementById("emailRegistrado");


// funcion que hace el get para traer la data del usuario ni bien carga la pagina de datos-usuario
window.onload = function () {
    fetch("/usuarios", {
        credentials: "include",
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            muestraDatos(data);
        });
};
// funcion que muestra los datos del usuario en el form
function muestraDatos(datos) {
    let dataUsuario = datos.data;
        let nombre = dataUsuario.nombre;
        let apellido = dataUsuario.apellido;
        let email = dataUsuario.email;
        nombreRegistrado.value = nombre;
        apellidoRegistrado.value = apellido;
        emailRegistrado.value = email;
    ;
}

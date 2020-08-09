// constantes de los input del formulario
const nombreRegistrado = document.getElementById("nombreRegistrado")
const apellidoRegistrado = document.getElementById("apellidoRegistrado")
const emailRegistrado = document.getElementById("emailRegistrado")
    // boton de crear Producto
const btnCrearProducto = document.getElementById("btnCrearProducto")

// funcion que hace el get para traer la data del usuario ni bien carga la pagina de datos-usuario
window.onload = function() {
        fetch("/usuarios")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                muestraDatos(data)
            })
    }
    // funcion que muestra los datos del usuario en el form
function muestraDatos(datos) {
    datos.forEach(element => {
        let nombre = element.nombre
        let apellido = element.apellido
        let email = element.email
        let id = element.id
        console.log(element)
        nombreRegistrado.value = nombre
        apellidoRegistrado.value = apellido
        emailRegistrado.value = email

    });

}
// onclick que me lleva al html Crear Producto
btnCrearProducto.onclick = () => {
    window.open("/crear-producto.html")
}
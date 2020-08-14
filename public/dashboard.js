const nombreDelUsuario = document.getElementById("nombreUsuario")
const contenedorCard = document.getElementById("contenedorCard")
const faltaProducto = document.getElementById("faltaProducto")
    // const btnCrearProducto
const btnCrearProducto = document.getElementById("crearProducto");

// funcion que trae los datos del usuario
window.onload = function() {
    fetch("/usuarios", {
            credentials: "include",
        })
        .then((response) => response.json())
        .then((resultado) => {
            console.log(resultado);
            // variable que contiene array mis productos
            var productoUsuario = resultado.data.misProductos
            nombreUsuario(resultado);
            card(productoUsuario)
        });
};

// funcion que muestra el nombre del usuario
function nombreUsuario(datos) {
    let dataUsuario = datos.data;
    let nombre = dataUsuario.nombre
    let nombreMayuscula = nombre[0].toUpperCase() + nombre.slice(1)
    nombreDelUsuario.innerText = nombreMayuscula
}

// onclick que me lleva al html Crear Producto
btnCrearProducto.onclick = () => {
    window.open("/crear-producto.html");
};

// funcion que va completar los datos de la card
function card(datosProdu) {
    var datos = ""
    if (datosProdu.length != 0) {
        datosProdu.forEach(element => {
            let nombreProducto = element.nombreProducto.toUpperCase()
            let descripcion = element.descripcion
            let estado = element.estado
            let precio = element.precio
            datos += ` <div class="card bg-light mb-3 mr-2 col-sm" style="max-width: 18rem;">
           <div class="card-header">Mis Productos</div>
           <div class="card-body">
           <h5 class="card-title">${nombreProducto}</h5>
           <h5 class="card-title">Estado:${estado}</h5>
           <h5 class="card-title">Precio: ${precio}</h5>
           <p class="card-text">${descripcion}</p>
           </div>
           </div>`
        });
        faltaProducto.style.display = "none"
        contenedorCard.innerHTML = datos;
    } else {
        faltaProducto.style.display = "flex"
    }

}
const nombreDelUsuario = document.getElementById("nombreUsuario");
const contenedorCard = document.getElementById("contenedorCard");
const faltaProducto = document.getElementById("faltaProducto");

const inputBuscar = document.getElementById("form-buscador-producto");
const btnBuscarDash = document.getElementById("btn-buscar-producto");
const seccionMisProductos = document.getElementById("seccion-mis-productos");

//cuando se hace un busqueda la seccion de mis productos se oculta
inputBuscar.addEventListener("submit", () => {
    seccionMisProductos.classList.replace("visible", "oculto");
});
btnBuscarDash.addEventListener("click", () => {
    seccionMisProductos.classList.replace("visible", "oculto");
});

//ACCESOS NAV
// boton crear publicacion
const btnCrearProducto = document.getElementById("crearProducto");
btnCrearProducto.onclick = () => {
    window.location.href = "/crear-producto.html";
};

// mis datos
const btnMisDatos = document.getElementById("btn-mis-datos");
btnMisDatos.onclick = () => {
    window.location.href = "/datos-usuario.html";
};

//mis compras
const btnMisCompras = document.getElementById("btn-mis-compras");
btnMisCompras.onclick = () => {
    window.location.href = "/mis-compras.html";
};
//cerrar sesion
const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");

//btn crear mi primer producto
const btnPrimerProducto = document.getElementById("crearPrimerProducto");
btnPrimerProducto.onclick = () => {
    window.location.href = "/crear-producto.html";
};

//mis productos
//mostrar mis productos y ocultar busquedas recientes
const btnMisProductos = document.getElementById("btn-mis-productos");
btnMisProductos.onclick = () => {
    console.log("click boton mis productos");
    seccionMisProductos.classList.replace("oculto", "visible");
    //ocultar seccion de resultados de busqueda
    const resultadoDash = document.getElementById(
        "container-busqueda-resultado"
    );
    resultadoDash.classList.replace("visible", "oculto");
};

// funcion que trae los datos del usuario
window.onload = function () {
    fetch("/usuarios", {
        credentials: "include",
    })
        .then((response) => response.json())
        .then((resultado) => {
            console.log(resultado);
            nombreUsuario(resultado);
            let productoUsuario = resultado.data.misProductos;
            card(productoUsuario);
        });
};

// funcion que muestra el nombre del usuario
function nombreUsuario(datos) {
    let dataUsuario = datos.data;
    let nombre = dataUsuario.nombre;
    let nombreMayuscula = nombre[0].toUpperCase() + nombre.slice(1);
    nombreDelUsuario.innerText = nombreMayuscula;

    //agrego el noombre del usuario al boton
    dropdownMenuButton.innerHTML = `<span class="material-icons mr-2">
                            person
                        </span> ${dataUsuario.nombre}`;
}

function card(datosProdu) {
    var datos = "";
    if (datosProdu.length != 0) {
        datosProdu.forEach((element) => {
            let nombreProducto = element.nombreProducto.toUpperCase();
            let descripcion = element.descripcion;
            let estado = element.estado;
            let precio = element.precio;
            datos += `  <div class="card border-main-color card-shadow p-0 col-sm-8 col-md-4 col-lg-3 m-5">
                        <h5 class="card-header bg-main-color text-white text-truncate text-uppercase">
                            ${nombreProducto}
                        </h5>
                        <a href="https://placeholder.com">
                            <img src="https://via.placeholder.com/350" class="card-img-top" alt="img-producto" style="width:100%" />
                        </a>
                        <div class="card-body">
                            <h5 class="card-title">$${precio}</h5>
                            <p class="card-text">
                                <small class="text-muted">Estado: ${estado}</small>
                            </p>
                            <div class="font-weight-light overflow-auto" style="max-height: 120px; max-width: 300px;">
                                ${descripcion}
                            </div>
                        </div>
                    </div> `;
        });
        faltaProducto.classList.replace("d-flex", "oculto");
        // faltaProducto.style.display = "none"
        contenedorCard.innerHTML = datos;
        contenedorCard.classList.replace("oculto", "d-flex");
    } else {
        faltaProducto.classList.replace("oculto", "d-flex");
        // faltaProducto.style.display = "flex"
    }
}

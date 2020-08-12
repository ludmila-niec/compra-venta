//seccion con todos los resultados
const seccionResultadpBusqueda = document.getElementById(
    "container-busqueda-resultado"
);

//contenedor donde se muestran los resultados de la busqueda
let contenedorResultadoProductos = document.getElementById(
    "resultado-busqueda-dinamica"
);

//bonton fires busqueda
const btnBuscarProducto = document.getElementById("btn-buscar-producto");
let busquedaProductoInput = document.getElementById("input-busqueda-producto");

//mostrar busqueda actual
let busquedaActiva = document.getElementById("busqueda-activa-placeholder");

//opciones para filtrar
const filtroNuevo = document.getElementById("query-nuevo");
const queryNuevo = "estado=nuevo";
const filtroUsado = document.getElementById("query-usado");
const queryUsado = "estado=usado";
const filtroTodos = document.getElementById("query-todos");

//boton solo busca la palabra clave ingresada por el usuario
btnBuscarProducto.addEventListener("click", buscarProductoPorPalabra);

async function buscarProductoPorPalabra() {
    try {
        let palabraClave = busquedaProductoInput.value.toLowerCase();
        let pedido = await fetch(`/productos?buscar=${palabraClave}`);
        let respuesta = await pedido.json();
        console.log(respuesta);
        busquedaActiva.innerHTML = `Resultados para: ${palabraClave}`;
        mostrarResultadoBusqueda(respuesta);
    } catch (error) {
        console.log(error);
    }
}

//filtrar busqueda activa por estado 'Nuevo'
filtroNuevo.onclick = async () => {
    try {
        console.log("click en nuevo");
        let palabraClave = busquedaProductoInput.value.toLowerCase();
        let pedido = await fetch(
            `/productos?buscar=${palabraClave}&${queryNuevo}`
        );
        let respuesta = await pedido.json();
        console.log(respuesta);
        busquedaActiva.innerHTML = `Productos: Nuevos`;
        mostrarResultadoBusqueda(respuesta);
    } catch (error) {
        console.log(error);
    }
};

//filtrar busqueda activa por estado 'Usado'
filtroUsado.onclick = async () => {
    try {
        console.log("click en nuevo");
        let palabraClave = busquedaProductoInput.value.toLowerCase();
        let pedido = await fetch(
            `/productos?buscar=${palabraClave}&${queryUsado}`
        );
        let respuesta = await pedido.json();
        console.log(respuesta);
        busquedaActiva.innerHTML = `Productos: Usados`;
        mostrarResultadoBusqueda(respuesta);
    } catch (error) {
        console.log(error);
    }
};

//volver mostrar los productos sin filtro de estado
filtroTodos.onclick = () =>{
    try {
        let palabraClave = busquedaProductoInput.value.toLowerCase();
        let pedido = await fetch(`/productos?buscar=${palabraClave}`);
        let respuesta = await pedido.json();
        console.log(respuesta);
        busquedaActiva.innerHTML = `Resultados para: ${palabraClave}`;
        mostrarResultadoBusqueda(respuesta);
    } catch (error) {
        console.log(error);
    }
}

//funcion para armar html del producto resultado de la busqueda
function mostrarResultadoBusqueda(respuesta) {
    try {
        seccionResultadpBusqueda.classList.replace("oculto", "visible");
        contenedorResultadoProductos.innerHTML = " ";
        if (respuesta.exito == false) {
            contenedorResultadoProductos.innerHTML = `<h3 class="text-muted">${respuesta.data}</h3>`;
            return;
        }
        let productos = respuesta.data;
        productos.forEach((item) => {
            const cardContainer = document.createElement("div");
            cardContainer.classList.add("card", "my-4");
            cardContainer.innerHTML = `<h4 class="card-header bg-secondary text-white">
                                            ${item.nombreProducto.toUpperCase()}
                                        </h4>`;
            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");
            cardBody.innerHTML = ` <h3 class="card-title">$${item.precio}</h3>                      
                                            <p class="card-text text-muted">
                                                Estado: ${item.estado}
                                            </p>
                                            <p class="mb-0 mt-1"><strong>Descripción:</strong></p>
                                            <p class="lead">
                                                ${item.descripcion}
                                            </p>
                                            `;
            const btnComprar = document.createElement("button");
            btnComprar.classList.add("btn", "btn-secondary");
            btnComprar.innerHTML = "Comprar";
            cardBody.appendChild(btnComprar);
            cardContainer.appendChild(cardBody);
            contenedorResultadoProductos.appendChild(cardContainer);

            btnComprar.onclick = () => {
                console.log("click boton comprar");
            };
        });
    } catch (error) {
        console.log(error);
    }
}

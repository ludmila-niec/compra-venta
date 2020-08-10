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
//faltar mostrar leyenda cuando no haya productos para la busqueda
btnBuscarProducto.onclick = async () => {
    let palabraClave = busquedaProductoInput.value;
    let pedido = await fetch(`/productos?buscar=${palabraClave}`);
    let respuesta = await pedido.json();
    console.log(respuesta);
    busquedaActiva.innerHTML = `Resultados para: ${palabraClave}`;
    mostrarResultadoBusqueda(respuesta);
};

//agregar eventos para las opciones de nuevo y usado
///productos/nuevo?buscar=palabraClave
///productos/usado?buscar=palabraClave

//retorna todos los productos disponibles
filtroTodos.onclick = async () => {
    console.log("click en todos");
    let pedido = await fetch(`/productos`);
    let respuesta = await pedido.json();
    console.log(respuesta);
    busquedaActiva.innerHTML = `Productos disponibles`;
    mostrarResultadoBusqueda(respuesta);
};

//funcion para armar html del producto resultado de la busqueda
function mostrarResultadoBusqueda(respuesta) {
    seccionResultadpBusqueda.classList.replace("oculto", "visible");
    let productos = respuesta.data;
    contenedorResultadoProductos.innerHTML = " ";
    productos.forEach((item) => {
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card", "my-4");
        cardContainer.innerHTML = `<h5 class="card-header bg-secondary text-white">
                                    ${item.nombreProducto}
                                </h5>`;
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        cardBody.innerHTML = ` <h5 class="card-title">${item.precio}</h5>
                                    <p class="card-text">
                                        ${item.descripcion}
                                    </p>
                                    <p class="card-text text-muted">
                                        ${item.estado}
                                    </p>`;
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
}

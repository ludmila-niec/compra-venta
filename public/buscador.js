//form contenedor del buscador de producto
const formBuscadorProducto = document.getElementById("form-buscador-producto");

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

//submit enter busca por la palabra clave ingresada por el usuario
formBuscadorProducto.addEventListener("submit", buscarProductoPorPalabra);

async function buscarProductoPorPalabra(e) {
    e.preventDefault();
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
filtroNuevo.onclick = async (e) => {
    e.preventDefault();
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
filtroUsado.onclick = async (e) => {
    e.preventDefault();
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
filtroTodos.onclick = async (e) => {
    e.preventDefault();
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
};

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
            const cardColumn = document.createElement('div')
            cardColumn.classList.add("col-10","m-auto")
            const cardContainer = document.createElement("div");
            cardContainer.classList.add(
                "card",
                "border-main-color",
                "card-shadow",
                "m-4"
            );
            cardContainer.innerHTML = `<h5 class="card-header bg-main-color text-white text-truncate text-uppercase">
                                            ${item.nombreProducto}
                                        </h5>
                                        `;
            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body","d-flex","align-items-center");
            cardBody.innerHTML = `<a href="https://placeholder.com" class="mr-3">
                                        <img src="https://via.placeholder.com/350" class="card-img-top" alt="img-producto"/>
                                        </a>`                                   
            const productInfo = document.createElement('div')
            productInfo.classList.add("m-4")
            productInfo.innerHTML = ` <h3 class="card-title">$${item.precio}</h3>                      
                                           <p class="card-text">
                                                <small class="text-muted">Estado: ${item.estado}</small>
                                            </p>
                                            <p class="font-weight-light text-muted">${item.descripcion}</p>`;
            const btnComprar = document.createElement("button");
            // btnComprar.classList.add("btn", "btn-primary", "mt-2");
            btnComprar.classList.add("btn", "btn-main-color", "mt-2");
            btnComprar.setAttribute("data-toggle", "modal");
            btnComprar.setAttribute("data-target", "#exampleModal");
            btnComprar.innerHTML = "Comprar";
            productInfo.appendChild(btnComprar);
            cardBody.appendChild(productInfo)
            cardContainer.appendChild(cardBody);
            cardColumn.appendChild(cardContainer)
            contenedorResultadoProductos.appendChild(cardColumn);

            btnComprar.onclick = async () => {
                let idProducto = item.id;
                console.log(item.id);
                console.log("click comprar");
                console.log(item);
                try {
                    let pedido = await fetch(`/productos/${idProducto}`, {
                        method: "POST",
                        body: JSON.stringify(item),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    let respuesta = await pedido.json();
                    if (respuesta.exito) {
                        Swal.fire({
                            title: "Producto agregado a Mis Compras!",
                            showClass: {
                                popup: "animate__animated animate__fadeInDown",
                            },
                            hideClass: {
                                popup: "animate__animated animate__fadeOutUp",
                            },
                        });
                    }
                } catch (err) {
                    console.log(err);
                }
            };
        });
    } catch (error) {
        console.log(error);
    }
}

const contenedorMisCompras = document.getElementById("contenedor-mis-compras");

// funcion las compras del usuario
window.onload = function () {
    try {
        fetch("/usuarios", {
            credentials: "include",
        })
            .then((response) => response.json())
            .then((resultado) => {
                console.log(resultado);
                let compras = resultado.data.misCompras;
                mostrarCompras(compras);
            });
    } catch (err) {
        console.log(err);
    }
};

function mostrarCompras(misCompras) {
    var datos = "";
    if (misCompras.length != 0) {
        misCompras.forEach((element) => {
            let nombreProducto = element.nombreProducto.toUpperCase();
            let descripcion = element.descripcion;
            let estado = element.estado;
            let precio = element.precio;
            datos += `<div class="col-10 m-auto">
                <div class="card border-main-color card-shadow m-4">
                    <h5 class="card-header bg-main-color text-white text-truncate text-uppercase">${nombreProducto}</h5>
                    <div class="card-body text-primary d-flex align-items-center">
                        <a href="https://placeholder.com" class="mr-3">
                            <img src="https://via.placeholder.com/350" class="card-img-top" alt="img-producto" />
                        </a>
                        <div class="m-4">
                            <h5 class="card-title">$${precio}</h5>
                            <p class="card-text">
                                <small class="text-muted">Estado: ${estado}</small>
                            </p>
                            <p class="font-weight-light text-muted">${descripcion}</p>
                        </div>
                    </div>
                </div>
            </div>`;
        });
        contenedorMisCompras.innerHTML += datos;
    }
}

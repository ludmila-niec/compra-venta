const formCrearProducto = document.getElementById("formCrearProducto");
const contenedorErrores = document.getElementById("producto-error");

formCrearProducto.onsubmit = async (e) => {
    e.preventDefault();
    let producto = {
        nombreProducto: formCrearProducto.elements[
            "nombreProducto"
        ].value.toLowerCase(),
        precio: formCrearProducto.elements["precio"].value,
        estado: formCrearProducto.elements["estado"].value,
        descripcion: formCrearProducto.elements[
            "descripcion"
        ].value.toLowerCase(),
    };
    console.log(producto);
    try {
        let pedidoProducto = await fetch("/productos", {
            method: "POST",
            body: JSON.stringify(producto),
            headers: {
                "Content-Type": "application/json",
            },
        });
        let dataProducto = await pedidoProducto.json();
        console.log(dataProducto);
        if (dataProducto.exito) {
            await Swal.fire({
                title: "Publicación creada!",
                showClass: {
                    popup: "animate__animated animate__fadeInDown",
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp",
                },
            });
            window.location.href = "/dashboard.html#seccion-mis-productos";
        } else {
            let errores = dataProducto.data;
            errores.forEach((error) => {
                contenedorErrores.innerHTML += `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                        ${error.mensaje}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                         </button>
                        </div>`;
            });
        }
        // return dataProducto;
    } catch (error) {
        console.log(error);
    }
};

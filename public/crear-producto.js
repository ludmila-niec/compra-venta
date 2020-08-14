const formCrearProducto = document.getElementById("formCrearProducto");

formCrearProducto.onsubmit = async(e) => {
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
                // id:
            },
        });
        let dataProducto = await pedidoProducto.json();
        console.log(dataProducto);
        window.location.href = "/dashboard.html"
        return dataProducto;
    } catch (error) {
        console.log(error);
    }
};
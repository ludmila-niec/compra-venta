const formCrearProducto = document.getElementById("formCrearProducto");

formCrearProducto.onsubmit = async(e) => {
    e.preventDefault();
    let producto = {
        nombreProducto: formCrearProducto.elements["nombreProducto"].value,
        precio: formCrearProducto.elements["precio"].value,
        estado: formCrearProducto.elements["estado"].value,
        descripcion: formCrearProducto.elements["descripcion"].value,
    };
    console.log(producto)
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
        return dataProducto;
    } catch (error) {
        console.log(error);
    }
};
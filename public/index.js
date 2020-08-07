//formulario de registro
const formRegister = document.getElementById("formulario-registro");
formRegister.onsubmit = async (e) => {
    e.preventDefault();
    let usuario = {
        nombre: formRegister.elements["nombre"].value,
        apellido: formRegister.elements["apellido"].value,
        email: formRegister.elements["email"].value,
        password: formRegister.elements["password"].value,
    };
    try {
        let pedido = await fetch("/usuarios", {
            method: "POST",
            body: JSON.stringify(usuario),
            headers: {
                "Content-Type": "application/json",
            },
        });
        let data = await pedido.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

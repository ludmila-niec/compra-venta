//secciones
const seccionRegistro = document.getElementById("registo");
const seccionIniciarSesion = document.getElementById("inicio-sesion");
//formularios
const formularioRegistro = document.getElementById("formulario-registro");
const formularioInicioSesion = document.getElementById(
    "formulario-inicio-sesion"
);
//botones para acceder a los formularios
const btnRegistro = document.getElementById("btn-form-registro");
const btnInicioSesion = document.getElementById("btn-form-inicio-sesion");

let errorFormulario = document.getElementById("registro-error");
let errorInicioSesion = document.getElementById("inicioSesion-error");

btnInicioSesion.onclick = () => {
    seccionIniciarSesion.classList.replace("oculto", "visible");
    seccionRegistro.classList.replace("visible", "oculto");
};
btnRegistro.onclick = () => {
    seccionRegistro.classList.replace("oculto", "visible");
    seccionIniciarSesion.classList.replace("visible", "oculto");
};

formularioRegistro.onsubmit = async (e) => {
    e.preventDefault();
    let usuario = {
        nombre: formularioRegistro.elements["nombre"].value,
        apellido: formularioRegistro.elements["apellido"].value,
        email: formularioRegistro.elements["email"].value,
        password: formularioRegistro.elements["password"].value,
    };
    try {
        let pedido = await fetch("/usuarios", {
            method: "POST",
            body: JSON.stringify(usuario),
            headers: {
                "Content-Type": "application/json",
            },
        });
        let contenido = await pedido.json();
        console.log(contenido);

        if (contenido.exito == false) {
            errorFormulario.innerHTML = "";
            let mensajes = contenido.data;
            mensajes.forEach((error) => {
                errorFormulario.innerHTML += `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                        ${error.mensaje}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                         </button>
                        </div>`;
            });
        } else {
            errorFormulario.innerHTML = "";
        }
    } catch (error) {
        console.log(error);
    }
};

// if (respuesta.exito == true) {
//     errorRegistro.innerHTML = "OK!";
// }

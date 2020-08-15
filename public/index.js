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
const btnIniciarSesion = document.getElementById("btnIniciarSesion");

//mensajes informativos
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

formularioRegistro.onsubmit = async(e) => {
    e.preventDefault();
    let usuario = {
        nombre: formularioRegistro.elements["nombre"].value.toLowerCase(),
        apellido: formularioRegistro.elements["apellido"].value.toLowerCase(),
        email: formularioRegistro.elements["email"].value.toLowerCase(),
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
            errorInicioSesion.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                        Usuario creado exitosamente!. Ahora podes iniciar sesión
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                         </button>
                        </div>`;
            seccionRegistro.classList.replace("visible", "oculto");
            seccionIniciarSesion.classList.replace("oculto", "visible");
        }
    } catch (error) {
        console.log(error);
    }
};

formularioInicioSesion.onsubmit = async(e) => {
    e.preventDefault();
    let usuario = {
        email: formularioInicioSesion.elements[
            "email-login"
        ].value.toLowerCase(),
        password: formularioInicioSesion.elements["password-login"].value,
    };
    try {
        let pedido = await fetch("/usuarios/iniciarsesion", {
            method: "POST",
            body: JSON.stringify(usuario),
            headers: {
                "Content-Type": "application/json",
            },
        });
        let contenido = await pedido.json();
        console.log(contenido);
        if (contenido.exito == false) {
            errorInicioSesion.innerHTML = "";
            let mensajes = contenido.data;
            mensajes.forEach((error) => {
                errorInicioSesion.innerHTML += `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                        ${error.mensaje}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                         </button>
                        </div>`;
            });
        } else {
            window.location.href = "/inicio";
        }
    } catch (error) {
        console.log(error);
    }
};
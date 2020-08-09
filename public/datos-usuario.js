// const { get } = require("../routes/user-route");

const datosUsuario = document.getElementById("datosUsuario")
console.log(datosUsuario)
datosUsuario.onsubmit = (e) => {
    e.preventDefault();
    fetch("/usuarios")
        .then(response => {
            console.log(response)
            return response.json()

        })
}

// datosUsuario.onsubmit = async(e) => {
//     e.preventDefault();
//     try {
//         let datosRegistrados = await fetch("/usuarios", {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             })
//             .then(datos => {
//                 return datos,
//                     console.log(datos, "dat")
//             })
//     } catch (error) {
//         console.log(error)
//     }
// }
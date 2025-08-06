const nombre = document.getElementById("nombre");
const contra = document.getElementById("contra");
const btnRegistro = document.getElementById("btnRegistro");
const btnIniciar = document.getElementById("btnIniciar");

let listUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

btnRegistro.addEventListener("click", function () {
    const nuevoNombre = nombre.value.trim();
    const nuevaContra = contra.value;
    if (nuevaContra.length < 6) {
        alert("la contraseña debe tener al menos 6 caracteres");
        return;
    };

    const existe = listUsuarios.some(user => user.nombre === nuevoNombre);
    if (existe) {
        alert("El usuario ya está registrado");
        return;
    };

    const nuevoUsuario = {
        nombre : nuevoNombre,
        contraseña : nuevaContra
    };

    listUsuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(listUsuarios));

    alert("registro exitoso");

    nombre.value = "";
    contra.value = "";

    window.location.replace("login.html")
});

btnIniciar.addEventListener("click", function () {
    window.location.replace("login.html")
})



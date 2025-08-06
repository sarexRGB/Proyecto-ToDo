const usuario = document.getElementById("usuario");
const contra = document.getElementById("contra");
const btnIng = document.getElementById("btnIngresar");
const btnRegistro = document.getElementById("btnRegistro");




btnIng.addEventListener("click", function () {
    let usuarIngres = usuario.value.trim();
    let contraIngres = contra.value;

    
    let listUsuarios = JSON.parse(localStorage.getItem("usuarios"));

    let encontrado = false;

    for (let index = 0; index < listUsuarios.length; index++) {
        if (
            listUsuarios[index].nombre === usuarIngres &&
            listUsuarios[index].contraseña === contraIngres
        ) {
            encontrado = true;
            break;
        }
    }

    if (encontrado) {
        
        window.location.replace("ToDo.html");
    } else {
        alert("Usuario o contraseña incorrectos");
    }
});


btnRegistro.addEventListener("click", function () {
    window.location.replace("singUp.html");
})
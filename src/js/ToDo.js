//Elementos traidos del HTML
const nuevaTarea = document.getElementById("nuevaTarea");
const btnAgregar = document.getElementById("btnAgregar");
const lisTaPend = document.getElementById("lisTaPend");
const lisTaComp = document.getElementById("lisTaComp");
const btnCerrar = document.getElementById("btnCerrar")

//Información extraida del localStorage
let lisTareas = JSON.parse(localStorage.getItem("nTarea")) || [];
let lisComp = JSON.parse(localStorage.getItem("pTarea")) || [];

btnAgregar.addEventListener("click",function () {
    let tarea = {
       nombre: nuevaTarea.value
    }
    let valor = nuevaTarea.value.trim()
   if (valor.length === 0) {
    console.log("El campo está vacio");
   } else{
     lisTareas.push(tarea);
    localStorage.setItem("nTarea", JSON.stringify(lisTareas))

    console.log(localStorage);
    
    location.reload ()
   }

    
})

//Aquí se llaman las funciones de mostrar tareas pendientes y completadas
mostrarPendientes()
mostrarCompletas()

function mostrarPendientes() {
    for (let index = 0; index < lisTareas.length; index++) {
        const tarea1 = lisTareas[index];
        console.log(lisTareas[index]);

        const tareaP = document.createElement("p");
         tareaP.textContent = tarea1.nombre;
         tareaP.className = "nT";
        const tIndiv = document.createElement("div");
         tIndiv.className = "indiv";
        const checkbox = document.createElement("input");
         checkbox.type = "checkbox";
         checkbox.className = "checkB";
        const btnEdit = document.createElement("button");
         btnEdit.textContent = "Editar";
         btnEdit.className = "btnEdit";
        const btnElim = document.createElement("button");
         btnElim.textContent = "X";
         btnElim.className = "btnElim";

        tIndiv.appendChild(checkbox);
        tIndiv.appendChild(tareaP);
        tIndiv.appendChild(btnEdit);
        tIndiv.appendChild(btnElim);
        lisTaPend.appendChild(tIndiv);


        btnEdit.addEventListener("click", function () {
            editarTarea(index)
        })

        btnElim.addEventListener("click",function () {
            lisTaPend.removeChild(tIndiv);
            lisTareas.splice(index,1);
            localStorage.setItem("nTarea", JSON.stringify(lisTareas));
        })
        checkbox.addEventListener("click", function () {
            let tarea = lisTareas.splice(index,1)[0];
            localStorage.setItem("nTarea", JSON.stringify(lisTareas));
            lisComp.push(tarea);
            localStorage.setItem("pTarea", JSON.stringify(lisComp));
            lisTaPend.removeChild(tIndiv);
            location.reload()
            
        })
    }
    
}


//Función asincrona del boton editar 
async function editarTarea(indice) {
    const { value: nuevoNombre } = await Swal.fire({
        title: 'Editar tarea',
        input: 'text',
        inputValue: lisTareas[indice].nombre,
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value || value.trim() === '') {
                return 'Necesitas escribir algo'
            }
        }
    })
    //Verificación de la edición de la tarea
    if (nuevoNombre && nuevoNombre.trim() !== "") {
        lisTareas[indice].nombre = nuevoNombre.trim();
        localStorage.setItem("nTarea", JSON.stringify(lisTareas));
        location.reload();
    }
}



function mostrarCompletas() {
    for (let index = 0; index < lisComp.length; index++) {
        const tarea2 = lisComp[index];
        console.log(lisComp);

        const tareaC = document.createElement("p");
         tareaC.textContent = tarea2.nombre;
         tareaC.className = "tC";
        const tIndivC = document.createElement("div");
         tIndivC.className = "indiv";
        const btnElimC = document.createElement("button");
         btnElimC.textContent = "X";
         btnElimC.className = "btnElim";
        const checkboxC = document.createElement("input");
         checkboxC.type = "checkbox";
         checkboxC.checked = true
         checkboxC.style.accentColor = "darkgreen"
         
        tIndivC.appendChild(checkboxC);
        tIndivC.appendChild(tareaC);
        tIndivC.appendChild(btnElimC);
        lisTaComp.appendChild(tIndivC);

        checkboxC.addEventListener("click", function () {
            let tarea = lisComp.splice(index, 1)[0]
            localStorage.setItem("pTarea", JSON.stringify(lisComp))

            lisTareas.push(tarea)
            localStorage.setItem("nTarea", JSON.stringify(lisTareas))

            location.reload()
        })

        btnElimC.addEventListener("click",function () {
            lisTaComp.removeChild(tIndivC)
            lisComp.splice(index,1);
            localStorage.setItem("pTarea", JSON.stringify(lisComp));
            
        })
       
    }
}

btnCerrar.addEventListener("click", function () {
    localStorage.removeItem("nTarea");
    localStorage.removeItem("pTarea");

    window.location.replace("login.html");
})

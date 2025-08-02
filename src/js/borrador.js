const nuevaTarea = document.getElementById("nuevaTarea");
const btnAgregar = document.getElementById("btnAgregar");
const lisTaPend = document.getElementById("lisTaPend");
const lisTaComp = document.getElementById("lisTaComp");


let lisTareas = JSON.parse(localStorage.getItem("nTarea")) || [];
let lisComp = JSON.parse(localStorage.getItem("pTarea")) || [];

btnAgregar.addEventListener("click",function () {
    let tarea = {
       nombre: nuevaTarea.value
    }

    lisTareas.push(tarea);
    localStorage.setItem("nTarea", JSON.stringify(lisTareas))

    console.log(localStorage);
    
    location.reload ()
})

mostrarTareas()

function mostrarTareas() {
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
            lisTareas.splice(index,1)[0];
            lisComp.push(tarea);
            localStorage.setItem("pTarea", JSON.stringify(lisComp));
            lisTaPend.removeChild(tIndiv);
            location.reload()
            
        })
    }
    
}

mostrarCompletas()

function editarTarea(indice) {
    const nuevoNombre = prompt("Editar tarea:", lisTareas[indice].nombre);
    
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
         tareaC.className = "nT";
        const tIndivC = document.createElement("div");
         tIndivC.className = "indiv";
        const checkboxC = document.createElement("input");
         checkboxC.type = "checkbox";
         checkboxC.className = "checkB";
        const btnElimC = document.createElement("button");
         btnElimC.textContent = "X";
         btnElimC.className = "btnElim";
        

        tIndivC.appendChild(checkboxC);
        tIndivC.appendChild(tareaC);
        tIndivC.appendChild(btnElimC);
        lisTaComp.appendChild(tIndivC);

        

        btnElimC.addEventListener("click",function () {
            lisTaComp.removeChild(tIndivC)
            lisComp.splice(index,1);
            localStorage.setItem("pTarea", JSON.stringify(lisComp));
            
        })
       
    }
}

    

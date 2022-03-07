const seccionTareas = document.querySelector('.seccionTareas')
const btnBorrar = document.querySelector('button')
const btnGuardar = document.getElementById('btnGuardar')
const inputTarea = document.getElementById('inputTarea')
const selector = document.getElementById('selector')
const selectPrioridad = document.getElementById('selectPrioridad')
const inputTexto = document.getElementById('inputTexto')

printTareas(listaTareas, seccionTareas);

//Funcion que pinte todas las tareas

function printTareas(pTareas, pSection) {

    pSection.innerHTML = '';

    for (let tarea of pTareas) {
        let divTarea = printTarea(tarea)
        pSection.appendChild(divTarea)
    }
}


//funcion que pinte solo una tarea

function printTarea(pTarea) {

    const pTitulo = document.createElement('p');
    pTitulo.innerText = pTarea.titulo;

    const btnBorrar = document.createElement('button')
    btnBorrar.innerText = 'Borrar'
    btnBorrar.dataset.id = pTarea.id;
    btnBorrar.addEventListener('click', (event) => {
        listaTareas = borrarElemento(event.target.dataset.id, listaTareas);
        event.target.parentNode.remove();

    })

    const div = document.createElement('div');

    //pintado por prioridad

    if (pTarea.prioridad === 'diaria') {
        div.style.backgroundColor = 'lightblue'

    } else if (pTarea.prioridad === 'mensual') {
        div.style.backgroundColor = 'lightgreen'

    } else if (pTarea.prioridad === 'urgente') {
        div.style.backgroundColor = "tomato"
    }


    div.appendChild(pTitulo)
    div.appendChild(btnBorrar)

    return div;
}

//capturar el click con el boton de guardar 

btnGuardar.addEventListener('click', saveTarea);

function saveTarea(event) {

    const nuevaTarea = {
        idTarea: listaTareas.length + 1,
        titulo: inputTarea.value,
        prioridad: selector.value,
    }
    listaTareas.push(nuevaTarea)

    const divNuevaLista = printTarea(nuevaTarea);
    seccionTareas.appendChild(divNuevaLista)
}


//Borrar tareas

function borrarElemento(pId, pTareas) {
    const nuevoArr = [];
    for (let tarea of pTareas) {
        if (tarea.id !== parseInt(pId)) {
            nuevoArr.push(tarea);
        }
    }
    return nuevoArr;
}

//filtrado desplegable

selectPrioridad.addEventListener('change', (event) => {

    const filtrados = [];
    for (let tarea of listaTareas) {
        if (tarea.prioridad === event.target.value) {
            filtrados.push(tarea);
        }
    }
    printTareas(filtrados, seccionTareas)
});

//filtrado por texto
inputTexto.addEventListener('input', (event) => {

    const arrFiltradoTexto = listaTareas.filter(tarea => {
        return tarea.titulo.toLowerCase().startsWith(event.target.value)
    });

    printTareas(arrFiltradoTexto, seccionTareas);
});













//colores idea









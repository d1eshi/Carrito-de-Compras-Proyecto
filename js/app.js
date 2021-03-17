// Variables
const carrito = document.getElementById('carrito')
const cursos = document.getElementById('lista-cursos')
const listaCursos = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')

// Listeners
cargarEventListeners()

function cargarEventListeners() {
  //  Dispara cuando se presiona "Agregar Carrito"
  cursos.addEventListener('click', comprarCurso)

  // Cuando se elimine un curso del carrito
  carrito.addEventListener('click', eliminarCurso)

  // Al Vaciar Carrito
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito)

  // Al cargar el documento, mostrar localStorage
  document.addEventListener('DOMContentLoaded', leerLocalStorage)

}


// Funciones

// Funcion que añade el cursos al carrito
function comprarCurso(e) {
  e.preventDefault()
  // Delegation para agregar-carrito
  if (e.target.classList.contains('agregar-carrito')) {
    const curso = e.target.parentElement.parentElement
    // Enviamos los datos del curso
    leerDatosCurso(curso)
  }
}

// Leer los datos del curso
function leerDatosCurso(curso) {
  infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id')
  }

  isnertarCarrito(infoCurso)
}


function isnertarCarrito(curso) {
  const row = document.createElement('tr')
  row.innerHTML = `
    <td>
      <img src="${curso.imagen}" width="100">
    </td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>
    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
    </td>
  `

  listaCursos.appendChild(row)
  guardarCursoLocalStorage(curso)
}

// Elimina curso del carrito 
function eliminarCurso(e) {
  e.preventDefault()
  let curso,
    cursoId
  if (e.target.classList.contains('borrar-curso')) {
    e.target.parentElement.parentElement.remove();
    curso = e.target.parentElement.parentElement
    cursoId = curso.querySelector('a').getAttribute('data-id')
  }

  eliminarCursoLocalStorage(cursoId)

}


// Elimina los cursos del carrito en el DOM
function vaciarCarrito(e) {
  e.preventDefault()
  // Forma Lenta
  // listaCursos.innerHTML = ""
  // Forma rápido (recomendada)
  while (listaCursos.firstChild) {
    listaCursos.removeChild(listaCursos.firstChild)
  }

  // Vaciar Local Storage
  vaciarLocalStorage()

  return false

}

// Almacenando cursos de carrito a localStorage
function guardarCursoLocalStorage(curso) {
  let cursos

  // Toma el valor de un array con datos  de LS o vacio
  cursos = obtenerCursosLocalStorage()

  // El curso seleccionado se agrega al array
  cursos.push(curso)

  localStorage.setItem('cursos', JSON.stringify(cursos))
}

// Comprueba que haya elementos en localStorage
function obtenerCursosLocalStorage() {
  let cursosLS

  // Comprobar si hay algo en localStorage
  if (localStorage.getItem('cursos') === null) {
    cursosLS = []
  } else {
    cursosLS = JSON.parse(localStorage.getItem('cursos'))
  }
  return cursosLS
}


// Imprime los cursos de localStorage en el carrito
function leerLocalStorage() {
  let cursosLS

  cursosLS = obtenerCursosLocalStorage()

  cursosLS.forEach(function (curso) {
    const row = document.createElement('tr')
    row.innerHTML = `
    <td>
      <img src="${curso.imagen}" width="100">
    </td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>
    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
    </td>
  `

    listaCursos.appendChild(row)
  });
}

// Elimina el curso por el ID en LocalStorage
function eliminarCursoLocalStorage(curso) {
  let cursosLS
  // Obtenemos el array de cursos
  cursosLS = obtenerCursosLocalStorage()
  // Iteramos comparando el ID del curso borrado con los del localStorage 
  cursosLS.forEach(function (cursoLS, index) {
    if (cursoLS.id === curso) {
      cursosLS.splice(index, 1)
    }
  })
  // Añadimos el array actual a storage
  localStorage.setItem('cursos', JSON.stringify(cursosLS))
}


// Elimina todos los cursos de Local Storage
function vaciarLocalStorage() {
  localStorage.clear()
}
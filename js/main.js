const btnAdd = document.querySelector(".btn-add");
const btnClearAll = document.querySelector(".btn-clear-all");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const modal = document.getElementById("modal-todo-container");

btnAdd.addEventListener("click", () => {
  // Guardamos el JSON en una variable para verificar que se creó correctamente
  const taskJSON = generateTaskJSON();

  // Solo renderizamos y limpiamos si la tarea es válida (no es undefined)
  if (taskJSON) {
    renderTodoItem(taskJSON);

    // --> AGREGADO: Limpiar inputs principales
    clearMainInputs();
  }
});

btnClearAll.addEventListener("click", () => {
  // Va a recorrer el ul y va a eliminar uno por uno
  const taskList = document.querySelectorAll(".todo-item");

  if (taskList.length === 0) alert("No hay tareas para borrar");
  else {
    // Capaz se puede utilizar un modal para preguntarle al usuario si quiere borrar todos los items
    taskList.forEach((item) => {
      // Llamo a al funcion deleteTask que se encarga de borrar el elemento HTML y
      // borrarlo desde localStorage
      deleteTask(item);
    });

    // --> AGREGADO: Limpiar inputs principales por si había algo escrito
    clearMainInputs();
  }
});

// ################################################
// ###      FUNCIONES
// ################################################
function generateId() {
  if (localStorage.length === 0) {
    return 1;
  }

  const JSONItem = JSON.parse(localStorage[localStorage.length]);

  return JSONItem.id + 1;
}

// Esta funcion sirve para generar JSON's y poder utilizar todas las funciones de
// renderizado generando estas estructuras
function generateTaskJSON() {
  // Tomo los values de cada input actual
  const nameInput = document.querySelector("#todo-task-name");
  const descInput = document.querySelector("#todo-task-description");

  // Verifico que no esten vacios
  if (nameInput.value === "" || descInput.value === "") {
    alert("Estas intentando agregar una tarea vacía");
    return;
  }

  // Creo la tarea basandome en los inputs ingresados
  return {
    id: generateId(),
    name: nameInput.value,
    description: descInput.value,
    completed: false,
  };
}

function renderTodoItem(taskJSON) {
  const item = document.createElement("li");
  //  Toma la estructura HTML de un todo-item y lo agrega al document
  item.innerHTML = `<div class='list-item-header'>
    <h1 class="list-item-title">${taskJSON.name}</h1>
    </div>

    <div class="list-item-body">
        <p class="list-item-description">${taskJSON.description}</p>
    </div>

    <div class="acciones">
        <button class="btn-action btn-check">Completar</button>
        <button class="btn-action btn-delete">Borrar🗑️</button>
        <button class="btn-action btn-update">Actualizar🔄</button>
    </div>`;

  // Añado la clase para los estilos
  item.classList.add("todo-item");

  // Le asigno un ID al elemento HTML para poder buscarlo más fácilmente en localStorage
  item.id = taskJSON.id;

  item.querySelector(".btn-check").addEventListener("click", () => {
    completeTask(item);
  });

  item.querySelector(".btn-delete").addEventListener("click", () => {
    deleteTask(item);
  });

  item.querySelector(".btn-update").addEventListener("click", () => {
    updateTask(taskJSON);
  });

  todoList.appendChild(item);

  localStorage.setItem(taskJSON.id, JSON.stringify(taskJSON));
}

// Esta funcion recibe el JSON de la tarea, ya que debe modificar los datos según
// los inputs ingresados y actualizar en el localStorage
function updateTask(taskJSON) {
  // Esto me trae el elemento exacto porque cuando genero la task le asigno un ID
  // igual al ID utilizado para guardarlo en localStorage
  const taskHTML = document.getElementById(taskJSON.id);
  const modal = document.querySelector("#modal-todo-container");
  const taskTitle = taskHTML.querySelector(".list-item-title");
  const taskDescription = taskHTML.querySelector(".list-item-description");

  // Muestro el modal
  modal.classList.add("show");

  // Botones de cerrar (estos pueden quedar con addEventListener o cambiarlos a onclick, da igual porque cerrar no duplica lógica crítica)
  modal.querySelector("#btn-close-modal").onclick = () =>
    modal.classList.remove("show");
  modal.querySelector("#btn-modal-cancel").onclick = () =>
    modal.classList.remove("show");

  // Agrego el evento al boton "Save"
  modal.querySelector("#btn-modal-save").onclick = () => {
    const inputTitle = modal.querySelector("#modal-input-title");
    const inputDescription = modal.querySelector("#modal-input-description");

    if (inputTitle.value !== "" && inputDescription.value !== "") {
      taskTitle.textContent = inputTitle.value;
      taskDescription.textContent = inputDescription.value;

      taskJSON.name = taskTitle.textContent;
      taskJSON.description = taskDescription.textContent;

      modal.classList.remove("show");

      // --> AGREGADO: Limpiar inputs del modal al guardar
      inputTitle.value = "";
      inputDescription.value = "";
    } else if (inputTitle.value === "" && inputDescription.value !== "") {
      taskDescription.textContent = inputDescription.value;

      taskJSON.description = taskDescription.textContent;

      modal.classList.remove("show");

      // --> AGREGADO: Limpiar inputs del modal al guardar
      inputTitle.value = "";
      inputDescription.value = "";
    } else {
      alert("No se ha modificado ningún campo");

      document.querySelector("#btn-modal-save").setAttribute("disabled");
    }

    // Actualizo el JSON en localStorage
    localStorage.setItem(taskJSON.id, JSON.stringify(taskJSON));
  };
}

// Recibe el HTML de la tarea, ya que solamente modifica estilos y agrega una animación
// no manipula los datos de ninguna forma
function completeTask(taskHTML) {
  // Cambiar el color del item
  taskHTML.classList.add("green-container");

  // Cambiar el botón complete a Finished
  taskHTML.querySelector(".btn-check").textContent = "Finished✅";

  // Recorro localStorage en busca del list item correspondiente
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i); // Obtengo la key del elemento en la posicion i
    const value = localStorage.getItem(key); // Obtengo el value relacionado a la key obtenida

    const item = JSON.parse(value); // Obtengo el item con el value obtenido y lo parseo a JSON

    // Cada item de la lista de tareas completadas tiene un id equivalente al identificador generado cuando se creó la tarea en la lista principal
    // Esto lo hice para poder comparar los id's y encontrar el elemento basandome en este valor

    // Si el campo id del item (JSON) es igual al atributo "id" del elemento HTML taskHTML (parseado a entero)...
    if (item.id === parseInt(taskHTML.id)) {
      // Renderizo la tarea completada en la lista de tareas completadas
      renderCompletedTask(item);

      // Genero una espera para eliminar el elemento de la lista principal
      setTimeout(() => {
        taskHTML.remove();
      }, 800);

      // Cambio el campo "completed" del JSON
      item.completed = true;
      // Lo guardo en localStorage
      localStorage.setItem(item.id, JSON.stringify(item));
    }
  }
}

// Recibe el elemento HTML para removerlo del DOM sin tener que buscarlo
function deleteTask(taskHTML) {
  // Busco el JSON de la tarea en localStorage
  localStorage.removeItem(taskHTML.id);

  // Recordemos que cada tarea creada en el HTML tiene asignado un ID que permite
  // identificarlo especificamente

  taskHTML.remove();
}

// Recibe el JSON de la tarea ya que debe obtener los datos para renderizar
function renderCompletedTask(taskJSON) {
  const sidebarList = document.querySelector("#lista-completadas");
  const taskCounter = document.querySelector("#contador-completadas");
  const completedTask = document.createElement("li");

  const currentDate = new Date().toLocaleDateString();

  completedTask.innerHTML = `
  <div class="completed-item-container">
      <div class="completed-item-header">
          <h2 class="completed-item-title">${taskJSON.name}</h2>
      </div>

      <div class="completed-item-body">

          <p class="completed-item-datetime">${currentDate}</p>

      </div>

  </div>
  <div class="completed-item-check">
      <span>✅</span>

  </div>`;

  completedTask.classList.add("completed-list-task");

  // Agrego la clase para ejecutar la animación al completar la tarea
  completedTask.classList.add("slide-in-left");

  sidebarList.prepend(completedTask);
  taskCounter.textContent = Number(taskCounter.textContent) + 1;
  console.log(
    "✅Se ha completado una tarea con éxito, ahora se encuentra almacenada en localStorage"
  );
}

// Se encarga de inicializar la aplicacion y renderizar los JSON que estan en localStorage
function init() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    const taskJSON = JSON.parse(value);

    if (taskJSON.completed) renderCompletedTask(taskJSON);
    else {
      renderTodoItem(taskJSON);
    }
  }
}

// --> AGREGADO: Nueva función para limpiar inputs
function clearMainInputs() {
  document.querySelector("#todo-task-name").value = "";
  document.querySelector("#todo-task-description").value = "";
  // Devolvemos el foco al input de nombre para seguir escribiendo
  document.querySelector("#todo-task-name").focus();
}

init();

// TODO -> Falta agregarle una animación al completar una tarea ✅
// TODO -> Falta agregarle estilos a la card del sidebar ✅
// TODO -> Falta aplicar localStorage para la permanencia de datos ✅
// TODO -> Falta modularizar la aplicacion para una mejor organizacion
// TODO -> Cuando se agrega una tarea, vaciar los inputs ✅

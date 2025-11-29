// ==========================================
// UI.JS - Manejo del DOM e Interfaz
// ==========================================

// Selectores internos del módulo UI
const todoList = document.querySelector("#todo-list");
const sidebarList = document.querySelector("#lista-completadas");
const taskCounter = document.querySelector("#contador-completadas");
const modal = document.querySelector("#modal-todo-container");

// Inputs principales
const nameInput = document.querySelector("#todo-task-name");
const descInput = document.querySelector("#todo-task-description");

/**
 * Limpia los inputs del formulario principal.
 */
export function clearMainInputs() {
  nameInput.value = "";
  descInput.value = "";
  nameInput.focus();
}

/**
 * Renderiza una tarea en la lista de pendientes.
 * RECIBE las funciones de acción (callbacks) como segundo parámetro.
 */
export function renderTodoItem(taskJSON, actions) {
  const item = document.createElement("li");
  item.classList.add("todo-item");
  item.id = taskJSON.id;

  item.innerHTML = `
    <div class='list-item-header'>
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

  // Asignamos los eventos usando las funciones que nos pasan desde main.js
  // actions es un objeto: { onComplete, onDelete, onUpdate }

  item.querySelector(".btn-check").onclick = () => actions.onComplete(item);
  item.querySelector(".btn-delete").onclick = () => actions.onDelete(item);
  item.querySelector(".btn-update").onclick = () => actions.onUpdate(taskJSON);

  todoList.appendChild(item);
}

/**
 * Renderiza una tarea en la sidebar de completadas.
 */
export function renderCompletedTask(taskJSON) {
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

  completedTask.classList.add("completed-list-task", "slide-in-left");

  sidebarList.prepend(completedTask);

  // Actualizamos contador si existe
  if (taskCounter) {
    taskCounter.textContent = Number(taskCounter.textContent) + 1;
  }
}

/**
 * Maneja la lógica visual del Modal de Actualización.
 * Recibe la tarea y una función para guardar los cambios.
 */
export function showUpdateModal(taskJSON, onSave) {
  // onSave sirve para manejar las acciones cuando el usuario modifica
  // los inputs en el modal, esa lógica está en main.js y sirve simplemente
  // para actualizar el JSON que esta en localStorage

  // Obtengo la card de la tarea mediante el id del JSON pasado por parametro
  const taskHTML = document.getElementById(taskJSON.id);

  // Elementos del modal...
  const modalInputTitle = modal.querySelector("#modal-input-title");
  const modalInputDesc = modal.querySelector("#modal-input-description");
  const btnSave = modal.querySelector("#btn-modal-save");

  // Llenar inputs con datos actuales del DOM o del JSON
  modalInputTitle.value = taskJSON.name;
  modalInputDesc.value = taskJSON.description;

  modal.classList.add("show");

  // Configurar cierre
  const closeModal = () => modal.classList.remove("show");
  modal.querySelector("#btn-close-modal").onclick = closeModal;
  modal.querySelector("#btn-modal-cancel").onclick = closeModal;

  // Cuando se clickea en "guardar cambios"...
  btnSave.onclick = () => {
    // Obtengo los inputs
    const newTitle = modalInputTitle.value;
    const newDesc = modalInputDesc.value;

    // Verifico que no esten vacios
    if (newTitle === "" && newDesc === "") {
      alert("Los campos no pueden estar vacíos");
      return;
    }

    // Verificamos que el elemento traido por id sea
    if (taskHTML) {
      // Traemos el titulo y la descripcion de la card y lo modificamos por
      // el que obtuvimos de los inputs del modal
      taskHTML.querySelector(".list-item-title").textContent = newTitle;
      taskHTML.querySelector(".list-item-description").textContent = newDesc;
    }

    // Ahora llamamos a la funcion onSave, ya que en este punto, el usuario
    // ya clickeo el boton "guardar cambios" y lepasamos los inputs del modal
    // para que pueda modificarlos en el JSON
    onSave(newTitle, newDesc);

    closeModal();
  };
}

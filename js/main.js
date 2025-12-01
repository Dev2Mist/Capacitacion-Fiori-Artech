// ===================================================================================================
// ===================================================================================================
//                                    main.js -> CONTROLADOR
// ===================================================================================================
// ===================================================================================================

// ###################################################################################################
//  ==================================================================================================
//  Es el archivo encargado de recibir las acciones del usuario desde la Vista (ui.js) y le indica al
//  Modelo (storage.js) que guarde los datos en localStorage
//  ==================================================================================================
// ###################################################################################################

// ===================================================================================================
//          IMPORTS DE TODO LO NECESARIO PARA FUNCIONAR
// ===================================================================================================

import { generateId } from "./utils.js";
import {
  saveTaskToStorage,
  deleteTaskFromStorage,
  getAllTasksFromStorage,
} from "./storage.js";
import {
  clearMainInputs,
  renderTodoItem,
  showUpdateModal,
  renderCompletedTask,
} from "./ui.js";

const btnAdd = document.querySelector(".btn-add");
const btnClearAll = document.querySelector(".btn-clear-all");

// Se encarga de inicializar la aplicacion y renderizar los JSON que estan en localStorage
function init() {
  const tasks = getAllTasksFromStorage();

  tasks.forEach((taskJSON) => {
    // Si la tarea tiene el campo 'completed' en true, entonces se renderiza en el sidebar
    if (taskJSON.completed) renderCompletedTask(taskJSON);
    // Sino, se renderiza en la todo list principal
    else
      renderTodoItem(taskJSON, {
        onComplete: handleCompleteTask,
        onDelete: handleDeleteTask,
        onUpdate: handleUpdateTask,
      });
  });
}

init();

btnAdd.addEventListener("click", () => {
  // Guardamos el JSON en una variable para verificar que se creó correctamente
  const taskJSON = generateTaskJSON();

  // Guardo el objeto generado en localStorage
  saveTaskToStorage(taskJSON);

  //
  renderTodoItem(taskJSON, {
    onComplete: handleCompleteTask,
    onDelete: handleDeleteTask,
    onUpdate: handleUpdateTask,
  });

  // Limpio los inputs
  clearMainInputs();
});

btnClearAll.addEventListener("click", () => {
  // Obtengo un array con todos los item list
  const taskList = document.querySelectorAll(".todo-item");

  if (taskList.length === 0) alert("No hay tareas para borrar");
  else {
    // Capaz se puede utilizar un modal para preguntarle al usuario si quiere borrar todos los items
    taskList.forEach((item) => {
      deleteTaskFromStorage(item.id);
      item.remove();
    });

    // Limpio los inputs
    clearMainInputs();
  }
});

// ==========================================
// MANEJADORES DE LÓGICA (Handlers)
// ==========================================

/**
 * Se encarga de manejar la eliminacion de cards en la todo list principal
 * Es una de las funciones con las que se renderiza el item
 * @param {*} itemHTML
 */
function handleDeleteTask(itemHTML) {
  deleteTaskFromStorage(itemHTML.id);
  itemHTML.remove();
}

/**
 * Se encarga de manejar el completado de tareas
 * Llama a las funciones saveTaskToStorage y renderCompletedTask
 * para guardar en storage y para renderizar en el sidebar
 * @param {*} itemHTML
 */
function handleCompleteTask(itemHTML) {
  itemHTML.classList.add("green-container");
  itemHTML.querySelector(".btn-check").textContent = "Completado✅";

  // Simplificación usando las funciones de storage
  const allTasks = getAllTasksFromStorage();
  const taskFound = allTasks.find((t) => t.id == itemHTML.id);

  if (taskFound) {
    // Actualizamos datos
    taskFound.completed = true;
    saveTaskToStorage(taskFound);

    // Renderizamos en sidebar
    renderCompletedTask(taskFound);

    // Eliminamos de la lista principal con delay
    setTimeout(() => {
      itemHTML.remove();
    }, 800);
  }
}

/**
 *
 * @param {*} taskJSON: Es el JSON de la tarea que será modificada en el modal
 * Esta sería una función de two-way binding, ya que se actualiza el modelo y la UI
 */
function handleUpdateTask(taskJSON) {
  //! Es importante aclarar que showUpdateModal está definida en el archivon ui.js, donde se explica mucho más claro su funcionamiento

  showUpdateModal(taskJSON, (newTitle, newDesc) => {
    if (newTitle !== "" && newDesc !== "") {
      taskJSON.name = newTitle;
      taskJSON.description = newDesc;
    }

    saveTaskToStorage(taskJSON);
  });
}

// ==========================================
// FUNCIÓN AUXILIAR
// ==========================================
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

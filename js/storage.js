// ===================================================================================================
// ===================================================================================================
//                                    storage.js -> MODELO
// ===================================================================================================
// ===================================================================================================

// ###################################################################################################
//  ==================================================================================================
//  storage.js se encarga de guardar, leer y eliminar datos de localStorage. Delega las tareas de
//  decisión al Controlador (main.js) y de estilado a la Vista (ui.js).
//  ==================================================================================================
// ###################################################################################################
/**
 * Guarda o actualiza una tarea en el almacenamiento.
 * @param {Object} task - El objeto JSON de la tarea.
 */
export function saveTaskToStorage(task) {
  localStorage.setItem(task.id, JSON.stringify(task));
}

/**
 * Elimina una tarea del almacenamiento usando su ID.
 * @param {number|string} id - El ID de la tarea a borrar.
 */
export function deleteTaskFromStorage(id) {
  localStorage.removeItem(id);
}

/**
 * Recupera TODAS las tareas guardadas.
 * Útil para inicializar la aplicación.
 * @returns {Array} Un array con los objetos de las tareas.
 */
export function getAllTasksFromStorage() {
  const tasks = [];

  // Recorremos todo el localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    try {
      const task = JSON.parse(localStorage.getItem(key));
      // Verificamos que sea un objeto válido antes de agregarlo
      if (task && task.id) {
        // Pusheo el JSON al array
        tasks.push(task);
      }
    } catch (error) {
      console.error("Error al leer tarea del storage:", error);
    }
  }

  return tasks;
}

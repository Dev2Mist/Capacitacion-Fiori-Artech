const btnAdd = document.querySelector(".btn-add");
const btnClearAll = document.querySelector(".btn-clear-all");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const modal = document.getElementById("modal-todo-container");

btnAdd.addEventListener("click", () => {
  const inputText = document.querySelector("#todo-task-name");
  const inputDesc = document.querySelector("#todo-task-description");

  if (inputText.value === "" || inputDesc.value === "") {
    alert("Estas intentando agregar una tarea vacía");
    return;
  }

  // Llamar a la funcion de renderizado del todo-item
  renderTodoItem();
});

btnClearAll.addEventListener("click", () => {
  // Va a recorrer el ul y va a eliminar uno por uno
  const taskList = document.querySelectorAll(".todo-item");

  if (taskList.length === 0) alert("No hay tareas para borrar");
  else {
    // Capaz se puede utilizar un modal para preguntarle al usuario si quiere borrar todos los items
    taskList.forEach((item) => {
      item.remove();
    });
  }
});

// ################################################
// ###      FUNCIONES
// ################################################

function generateId() {
  if (localStorage.length === 0) {
    return 1;
  }

  let item = 0;

  // Recorro localStorage en busca del list item correspondiente
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    item = JSON.parse(value);
  }

  return item.id + 1;
}

function renderTodoItem() {
  // Tomo los values de cada input
  const taskName = document.querySelector("#todo-task-name");
  const taskDescription = document.querySelector("#todo-task-description");

  let task = {
    id: generateId(),
    name: taskName.value,
    description: taskDescription.value,
    completed: false,
  };

  const item = document.createElement("li");
  //  Toma la estructura HTML de un todo-item y lo agrega al document
  item.innerHTML = `<div class='list-item-header'>
    <h1 class="list-item-title">${task.name}</h1>
    </div>

    <div class="list-item-body">
        <p class="list-item-description">${task.description}</p>
    </div>

    <div class="acciones">
        <button class="btn-action btn-check">Completar</button>
        <button class="btn-action btn-delete">Borrar🗑️</button>
        <button class="btn-action btn-update">Actualizar🔄</button>
    </div>`;

  // Añado la clase para los estilos
  item.classList.add("todo-item");

  // Le asigno un ID al elemento HTML para poder buscarlo más facilmente al borrarlos todos
  item.id = task.id;

  item.querySelector(".btn-check").addEventListener("click", () => {
    completeTask(item);
  });

  item.querySelector(".btn-delete").addEventListener("click", () => {
    item.remove();
  });

  item.querySelector(".btn-update").addEventListener("click", () => {
    updateTask(item);
  });

  todoList.appendChild(item);

  localStorage.setItem(task.id, JSON.stringify(task));
}

function updateTask(item) {
  const modal = document.querySelector("#modal-todo-container");
  const taskTitle = item.querySelector(".list-item-title");
  const taskDescription = item.querySelector(".list-item-description");

  // Muestro el modal
  modal.classList.add("show");

  // Agrego el evento al boton "close" para cerrar el modal
  modal.querySelector("#btn-close-modal").addEventListener("click", () => {
    modal.classList.remove("show");
  });

  // Agrego el evento al boton "Cancel" para cerrar el modal
  modal.querySelector("#btn-modal-cancel").addEventListener("click", () => {
    modal.classList.remove("show");
  });

  // Agrego el evento al boton "Save"
  modal.querySelector("#btn-modal-save").addEventListener("click", () => {
    const inputTitle = modal.querySelector("#modal-input-title");
    const inputDescription = modal.querySelector("#modal-input-description");

    if (inputTitle.value === "" || inputDescription.value === "") {
      alert("No has ingresado todos los cambios");
    } else {
      taskTitle.textContent = inputTitle.value;
      taskDescription.textContent = inputDescription.value;

      modal.classList.remove("show");
    }
  });
}

function completeTask(taskItem) {
  // Cambiar el color del item
  taskItem.classList.add("green-container");

  // Cambiar el botón complete a Finished
  taskItem.querySelector(".btn-check").textContent = "Finished✅";

  // Recorro localStorage en busca del list item correspondiente
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i); // Obtengo la key del elemento en la posicion i
    const value = localStorage.getItem(key); // Obtengo el value relacionado a la key obtenida

    const item = JSON.parse(value); // Obtengo el item con el value obtenido y lo parseo a JSON

    // Cada item de la lista de tareas completadas tiene un id equivalente al identificador generado cuando se creó la tarea en la lista principal
    // Esto lo hice para poder comparar los id's y encontrar el elemento basandome en este valor

    // Si el campo id del item (JSON) es igual al atributo "id" del elemento HTML taskItem (parseado a entero)...
    if (item.id === parseInt(taskItem.id)) {
      // Renderizo la tarea completada en la lista de tareas completadas
      renderCompletedTask(item);

      // Genero una espera para eliminar el elemento de la lista principal
      setTimeout(() => {
        taskItem.remove();
      }, 800);

      // Cambio el campo "completed" del JSON
      item.completed = true;
      // Lo guardo en localStorage
      localStorage.setItem(item.id, JSON.stringify(item));
    }
  }
}

//! Esta funcion recibe un JSON, no un elemento HTML
function renderCompletedTask(taskItemJSON) {
  const sidebarList = document.querySelector("#lista-completadas");
  const taskCounter = document.querySelector("#contador-completadas");
  const completedTask = document.createElement("li");

  const currentDate = new Date().toLocaleDateString();

  completedTask.innerHTML = `
  <div class="completed-item-container">
      <div class="completed-item-header">
          <h2 class="completed-item-title">${taskItemJSON.name}</h2>
      </div>

      <div class="completed-item-body">

          <p class="completed-item-datetime">${currentDate}</p>

      </div>

  </div>
  <div class="completed-item-check">
      <span>✅</span>

  </div>`;

  completedTask.classList.add("completed-list-task");

  sidebarList.prepend(completedTask);
  taskCounter.textContent = Number(taskCounter.textContent) + 1;
  console.log(
    "✅Se ha completado una tarea con éxito, ahora se encuentra almacenada en localStorage"
  );
}

// renderCompletedTasksInLocalStorage();
// renderPendentTasksInLocalStorage();

// TODO -> Falta agregarle una animación al completar una tarea
// TODO -> Falta agregarle estilos a la card del sidebar
// TODO -> Falta aplicar localStorage para la permanencia de datos
// TODO -> Falta modularizar la aplicacion para una mejor organizacion
// TODO -> Cuando se agrega una tarea, vaciar los inputs

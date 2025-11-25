// Pasos para agregar una tarea
// 1. Se ingresa el input
// 2. Se clickea el boton
// 3. Se genera el item en la lista

// 1. Agregar una tarea
const btnAdd = document.querySelector(".btn-add");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");


function renderTodoItem(taskName){
    const jsonItem = {
        name: "Tarea 1",
        completed : false,
        description : "Esta es la tarea 1"
    }
    const item = document.createElement('li');
    //  Toma la estructura HTML de un todo-item y lo agrega al document
    item.innerHTML = `<li class="todo-item">
        <div class='list-item-header'>
            <h1 class="list-item-title">${jsonItem.name}</h1>
        </div>
        
        <div class="list-item-body">
            <p class="list-item-description">${jsonItem.description}</p>

            <span class="list-item-completed">${jsonItem.completed}</span>
        </div>

        <div class="acciones">
            <button class="btn-action btn-check">Complete✅</button>
            <button class="btn-action btn-delete">Delete🗑️</button>
            <button class="btn-action btn-modify">Update🔄</button>
        </div>
    
    </li>`

    todoList.appendChild(item);
} 


btnAdd.addEventListener("click", () =>{
    // Se genera el item de la tarea
    const inputText = todoInput.value;

    if(inputText === ""){
        alert("Estas intentando agregar una tarea vacia");
        return;
    }

    // Llamar a la funcion de renderizado del todo-item
    renderTodoItem(inputText);

})

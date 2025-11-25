const btnAdd = document.querySelector(".btn-add");
const btnClearAll = document.querySelector(".btn-clear-all");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

function renderTodoItem(){
    // Tomo los values de cada input
    const taskName = document.querySelector("#todo-task-name");
    const taskDescription = document.querySelector("#todo-task-description");

    let task = {
        name : taskName.value,
        description : taskDescription.value,
        completed : false
    }

    const item = document.createElement('li');
    //  Toma la estructura HTML de un todo-item y lo agrega al document
    item.innerHTML = `<li class="todo-item">
        <div class='list-item-header'>
            <h1 class="list-item-title">${task.name}</h1>
        </div>
        
        <div class="list-item-body">
            <p class="list-item-description">${task.description}</p>

            <span class="list-item-completed">${task.completed}</span>
        </div>

        <div class="acciones">
            <button class="btn-action btn-check">Complete✅</button>
            <button class="btn-action btn-delete">Delete🗑️</button>
            <button class="btn-action btn-modify">Update🔄</button>
        </div>
    
    </li>`

    item.querySelector(".btn-check").addEventListener("click", () => {
        item.querySelector(".todo-item").classList.add("green-container");
    })

    item.querySelector(".btn-delete").addEventListener("click", () => {
        item.remove();
    })

    item.querySelector(".btn-modify").addEventListener("click", () => {

    })

    todoList.appendChild(item);
} 


btnAdd.addEventListener("click", () =>{
    const inputText = document.querySelector("#todo-task-name");
    const inputDesc = document.querySelector("#todo-task-description");

    if(inputText === "" || inputDesc === ""){
        alert("Estas intentando agregar una tarea con inputs vacios");
        return;
    }

    // Llamar a la funcion de renderizado del todo-item
    renderTodoItem();
})

btnClearAll.addEventListener("click", () => { 
    
})
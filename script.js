const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let editTodo = null;

// Function to add Todo : create
const addTodo = ()=>{
    const inputText = inputBox.value.trim();
    if(inputText.length <= 0){
        alert("You must write something in Todo");
        return false;
    }

    if(addBtn.value === "Edit"){
        editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
        editTodo.target.previousElementSibling.innerHTML = inputText;
        
        addBtn.value = "Add";
        inputBox.value = "";
    }
    else {
        // creating p tag
        const li = document.createElement('li');
        const p = document.createElement('p');
        p.innerHTML = inputText;
        li.appendChild(p);

        // creating Edit Btn
        const editBtn = document.createElement('button');
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn","editBtn");
        li.appendChild(editBtn);

        // creating delete Btn
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("btn","deleteBtn");
        li.appendChild(deleteBtn);
    

        todoList.appendChild(li);
        inputBox.value = "";  
        saveLocalTodos(inputText);
    }
}

// Function to update Todo  : edit/remove
const updateTodo = (e)=>{
    // Remove Task
    if(e.target.innerHTML === "Remove"){
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
    }
    
    // Edit Task
    if(e.target.innerHTML === "Edit"){
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = e;
    }
    

}

// Function to save local Todo
const saveLocalTodos = (todo)=>{
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos= JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

// Function to get local Todo
const getLocalTodos = ()=>{
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos= JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {
             // creating p tag
        const li = document.createElement('li');
        const p = document.createElement('p');
        p.innerHTML = todo;
        li.appendChild(p);

        // creating Edit Btn
        const editBtn = document.createElement('button');
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn","editBtn");
        li.appendChild(editBtn);

        // creating delete Btn
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("btn","deleteBtn");
        li.appendChild(deleteBtn);
    

        todoList.appendChild(li);
        });
    }
}

// Function to delete local Todo
const deleteLocalTodos = (todo)=>{
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos= JSON.parse(localStorage.getItem("todos"));
    }

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex,1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to Edit local todo
const editLocalTodos = (todo)=>{
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos",JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded',getLocalTodos);
addBtn.addEventListener('click',addTodo);
todoList.addEventListener('click',updateTodo);
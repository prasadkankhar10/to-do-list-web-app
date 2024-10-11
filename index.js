var todoList = JSON.parse(localStorage.getItem('todoList')) || [];
var comdoList = [];
var remList = [];
var addButton = document.getElementById("add-button");
var todoInput = document.getElementById("todo-input");
var deleteAllButton = document.getElementById("delete-all");
var allTodos = document.getElementById("all-todos");
var deleteSButton = document.getElementById("delete-selected");

// Add event listeners for actions
addButton.addEventListener("click", add);
deleteAllButton.addEventListener("click", deleteAll);
deleteSButton.addEventListener("click", deleteSelected);

// Event listener for filter and completion actions
document.addEventListener('click', (e) => {
    if (e.target.closest('.complete')) completeTodoAction(e);
    if (e.target.closest('.delete')) deleteTodoAction(e);
    if (e.target.id == "all") viewAll();
    if (e.target.id == "rem") viewRemaining();
    if (e.target.id == "com") viewCompleted();
});

// Event listener for the 'Enter' key to add tasks
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') add();
});

// Function to update local storage and task counts
function update() {
    comdoList = todoList.filter(ele => ele.complete);
    remList = todoList.filter(ele => !ele.complete);
    document.getElementById("r-count").innerText = todoList.length.toString();
    document.getElementById("c-count").innerText = comdoList.length.toString();
    localStorage.setItem('todoList', JSON.stringify(todoList)); // Persist data
}

// Add a new task to the todo list
function add() {
    var value = todoInput.value.trim();
    if (value === '') {
        alert("😮 Task cannot be empty");
        return;
    }
    todoList.push({
        task: value,
        id: Date.now().toString(),
        complete: false,
    });
    todoInput.value = "";
    update();
    renderTodos(todoList);
}

// Render the todo list
function renderTodos(todoList) {
    allTodos.innerHTML = "";
    todoList.forEach(element => {
        var todoItem = `<li id=${element.id} class="todo-item">
            <p id="task"> ${element.complete ? `<strike>${element.task}</strike>` : element.task} </p>
            <div class="todo-actions">
                <button class="complete btn btn-success" aria-label="Mark as complete">
                    <i class="ci bx bx-check bx-sm"></i>
                </button>
                <button class="delete btn btn-error" aria-label="Delete task">
                    <i class="di bx bx-trash bx-sm"></i>
                </button>
            </div>
        </li>`;
        allTodos.innerHTML += todoItem;
    });
}

// Delete a specific task
function deleteTodoAction(e) {
    var deletedId = e.target.closest('.todo-item').getAttribute('id');
    todoList = todoList.filter(ele => ele.id !== deletedId);
    update();
    renderTodos(todoList);
}

// Mark a specific task as complete/incomplete
function completeTodoAction(e) {
    var completedId = e.target.closest('.todo-item').getAttribute('id');
    todoList.forEach(obj => {
        if (obj.id == completedId) {
            obj.complete = !obj.complete;
        }
    });
    update();
    renderTodos(todoList);
}

// Delete all tasks
function deleteAll() {
    if (confirm("Are you sure you want to delete all tasks?")) {
        todoList = [];
        update();
        renderTodos(todoList);
    }
}

// Delete selected (completed) tasks
function deleteSelected() {
    todoList = todoList.filter(ele => !ele.complete);
    update();
    renderTodos(todoList);
}

// Filter functions to view tasks
function viewCompleted() {
    renderTodos(comdoList);
}

function viewRemaining() {
    renderTodos(remList);
}

function viewAll() {
    renderTodos(todoList);
}

// Initial rendering on page load
renderTodos(todoList);
update();

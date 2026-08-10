const todoInput = document.getElementById("todoInput");
const addTodo = document.getElementById("addTodo");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const todoMessage = document.getElementById("todoMessage");
const clearAll = document.getElementById("clearAll");
const storageMessage = document.getElementById("storageMessage");
const showAll = document.getElementById("showAll");
const showCompleted = document.getElementById("showCompleted");
const showPending = document.getElementById("showPending");

let todos = [];

let currentFilter = "all";

function saveTodos() {

    localStorage.setItem("todos", JSON.stringify(todos));

}

function loadTodos() {

    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {

        todos = JSON.parse(savedTodos);

    }

}
// =========================
// Render Todos
// =========================

function renderTodos() {

    todoList.innerHTML = "";


    const filteredTodos = todos.filter(function(todo) {

        if (currentFilter === "completed") {
            return todo.completed;
        }

        if (currentFilter === "pending") {
            return !todo.completed;
        }

        return true;

    });


    filteredTodos.forEach(function(todo) {

        // Create li

        const li = document.createElement("li");

        li.className = "todo-item";


        // Completed class

        if (todo.completed) {
            li.classList.add("completed");
        }


        // Create text

        const span = document.createElement("span");

        span.className = "todo-text";

        span.textContent = todo.text;


        // Create actions

        const actions = document.createElement("div");

        actions.className = "todo-actions";


        // Complete button

        const completeButton = document.createElement("button");

        completeButton.className = "complete-btn";

completeButton.textContent = todo.completed
    ? "برگرداندن"
    : "انجام شد";

        completeButton.addEventListener("click", function() {

            todo.completed = !todo.completed;

            saveTodos();

            renderTodos();

        });


        // Delete button

        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-btn";

        deleteButton.textContent = "حذف";


        deleteButton.addEventListener("click", function() {

            todos = todos.filter(function(item) {

                return item.id !== todo.id;

            });

            saveTodos();

            renderTodos();

        });


        // Add buttons to actions

        actions.appendChild(completeButton);

        actions.appendChild(deleteButton);


        // Add text and actions to li

        li.appendChild(span);

        li.appendChild(actions);


        // Add li to list

        todoList.appendChild(li);

    });


    // Empty message

    if (filteredTodos.length === 0) {

        todoMessage.textContent = "کاری برای نمایش وجود ندارد.";

    } else {

        todoMessage.textContent = "";

    }


    // Todo count

    todoCount.textContent = `تعداد کارها: ${filteredTodos.length}`;

    clearAll.disabled = todos.length === 0;
}


// =========================
// Add Todo
// =========================

addTodo.addEventListener("click", function() {

    const text = todoInput.value.trim();


    if (text === "") {

        todoMessage.textContent = "لطفاً یک کار وارد کنید.";

        return;

    }


    const newTodo = {

        id: Date.now(),

        text: text,

        completed: false

    };


    todos.push(newTodo);

saveTodos();

    renderTodos();


    todoInput.value = "";

    todoMessage.textContent = "";

});

todoInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        addTodo.click();

    }

});
// =========================
// Show All
// =========================

showAll.addEventListener("click", function() {

    currentFilter = "all";

    renderTodos();

});


// =========================
// Show Completed
// =========================

showCompleted.addEventListener("click", function() {

    currentFilter = "completed";

    renderTodos();

});


// =========================
// Show Pending
// =========================

showPending.addEventListener("click", function() {

    currentFilter = "pending";

    renderTodos();

});


// =========================
// Clear All
// =========================

clearAll.addEventListener("click", function() {

    todos = [];

     saveTodos();

    renderTodos();

});

loadTodos();

renderTodos();


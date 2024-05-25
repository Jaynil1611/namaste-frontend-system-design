document.addEventListener("DOMContentLoaded", () => {
  const db = new Dexie("todoDB");

  db.version(1).stores({ todos: `++id, task` });

  const todoForm = document.getElementById("todoForm");
  const todoInput = document.getElementById("todoInput");
  const todoList = document.getElementById("todoList");

  function addTodo() {
    const task = todoInput.value;
    if (task) {
      db.todos.add({ task }).then(displayTodos);
      todoInput.value = "";
    }
  }

  todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addTodo();
  });

  function displayTodos() {
    db.todos.toArray().then((todos) => {
      while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
      }

      todos.forEach((todo) => {
        const todoElement = document.createElement("li");
        todoElement.textContent = todo.task;
        todoList.appendChild(todoElement);
      });
    });
  }

  displayTodos();
});

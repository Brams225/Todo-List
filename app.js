//SELECTEURS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//ECOUTEURS
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("input", filterTodo);

//FUNCTIONS
function addTodo(event) {
  event.preventDefault();
  //Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Créer le Li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //Ajouter la todo au localstorage
  saveLocalTodos(todoInput.value);
  //Bouton Check
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //Bouton Supprimer
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //AJOUTER NOTRE TODO À TODO-LIST
  todoList.appendChild(todoDiv);
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  //DELETE TODO
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //CHECK MARK
  if (item.classList[0] === "complete-btn") { //if est une instruction qui exécute une instruction si une condition donnée est vraie ou équivalente à vrai
    const todo = item.parentElement;  //const permet de créer une constante nommée accessible uniquement en lecture Une constante ne peut pas être déclarée à nouveau.
    todo.classList.toggle("completed");  //classList est un objet JavaScript qui permet de lister les classes qui sont positionnées sur un élément
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;  //childNodes est un tableau d'éléments de tous les noeuds de l'élément parent
  todos.forEach(function (todo) { //forEach est une commande qui permet d'exécuter une fonction donnée sur chaque élément du tableau.
    switch (e.target.value) {  //switch permet d'evaluer la valeur et si la valeurs corespond il execute les instruction demander 
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) { //la fonction permet de creer une zone memoire qui permet de sauvegarder les element ( todo list ) dans la page
  //Checker si il y a des items existants
  let todos;
  if (localStorage.getItem("todos") === null) {  
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() { //la fonction permet de mettre l'element creer dans la zone memoire
  let todos;
  if (localStorage.getItem("todos") === null) { 
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Créer le Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Bouton Check
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Bouton Supprimer
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //AJOUTER NOTRE TODO À TODO-LIST
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) { //cette fonction permet de supprimer un element deja dans la zone memoire elle est relié autre fonction ( si je clique sur le bouton plus pour creer une nouvelle liste cette liste ( element ) sera sauvegarder dans la zone memoire et si j'aappuis sur le boutton delete l'lement de cette liste sera supprimer de la zone memoire
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

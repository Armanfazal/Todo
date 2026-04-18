let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function saveTasks() {
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
const list = document.getElementById("taskList");
list.innerHTML = "";

let filteredTasks = tasks.filter(task => {
if (filter === "completed") return task.completed;
if (filter === "pending") return !task.completed;
return true;
});

filteredTasks.forEach((task, index) => {
const li = document.createElement("li");
li.className = task.completed ? "completed" : "";

```
li.innerHTML = `
  <span onclick="toggleTask(${index})">${task.text}</span>
  <div>
    <button onclick="editTask(${index})">✏️</button>
    <button onclick="deleteTask(${index})">❌</button>
  </div>
`;

list.appendChild(li);
```

});
}

function addTask() {
const input = document.getElementById("taskInput");
if (input.value.trim() === "") return;

tasks.push({ text: input.value, completed: false });
input.value = "";
saveTasks();
renderTasks();
}

function toggleTask(index) {
tasks[index].completed = !tasks[index].completed;
saveTasks();
renderTasks();
}

function deleteTask(index) {
tasks.splice(index, 1);
saveTasks();
renderTasks();
}

function editTask(index) {
const newTask = prompt("Edit task:", tasks[index].text);
if (newTask !== null) {
tasks[index].text = newTask;
saveTasks();
renderTasks();
}
}

function filterTasks(type) {
filter = type;
renderTasks();
}

renderTasks();

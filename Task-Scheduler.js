let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(title, description, dueDate) {
  const task = { title, description, dueDate, completed: false };
  tasks.push(task);
  saveTasks();
  displayTasks();
}

function addTaskFromForm() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const dueDate = document.getElementById("dueDate").value;

  if (!title || !dueDate) {
    alert("Title and Due Date are required!");
    return;
  }

  addTask(title, description, dueDate);
  clearForm();
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("dueDate").value = "";
}

function displayTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "<h2>Task List</h2>";

  if (tasks.length === 0) {
    taskList.innerHTML += "<p>No tasks available.</p>";
    return;
  }

  tasks.forEach((task, index) => {
    const taskElement = document.createElement("div");
    taskElement.className = "task-item";
    taskElement.innerHTML = `
      <p><strong>${index + 1}. Title:</strong> ${task.title}</p>
      <p><strong>Description:</strong> ${task.description}</p>
      <p><strong>Due Date:</strong> ${task.dueDate}</p>
      <p><strong>Completed:</strong> ${task.completed}</p>
      <button onclick="editTask(${index})">Edit</button>
      <button onclick="completeTask(${index})">Mark as Complete</button>
      <button onclick="deleteTask(${index})">Delete Task</button>
    `;
    taskList.appendChild(taskElement);
  });
}

function completeTask(index) {
  tasks[index].completed = true;
  saveTasks();
  displayTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  displayTasks();
}

function editTask(index) {
  const newTitle = prompt("Enter new title:", tasks[index].title);
  const newDescription = prompt("Enter new description:", tasks[index].description);
  const newDueDate = prompt("Enter new due date:", tasks[index].dueDate);

  if (newTitle) tasks[index].title = newTitle;
  if (newDescription) tasks[index].description = newDescription;
  if (newDueDate) tasks[index].dueDate = newDueDate;

  saveTasks();
  displayTasks();
}

// Initial display of tasks
displayTasks();

const tasks = [];

function addTask(title, description, dueDate) {
  const task = { title, description, dueDate, completed: false };
  tasks.push(task);
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
      <button onclick="completeTask('${task.title}')">Mark as Complete</button>
      <button onclick="deleteTask('${task.title}')">Delete Task</button>
    `;
    taskList.appendChild(taskElement);
  });
}

function completeTask(title) {
  const task = tasks.find(task => task.title === title);
  if (task) {
    task.completed = true;
    alert(`Marked task "${title}" as completed!`);
    displayTasks();
  } else {
    alert("Task not found!");
  }
}

function deleteTask(title) {
  const index = tasks.findIndex(task => task.title === title);
  if (index !== -1) {
    tasks.splice(index, 1);
    alert(`Deleted task "${title}".`);
    displayTasks();
  } else {
    alert("Task not found!");
  }
}

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

//get task from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//Save task to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Display all saved tasks when page load
function loadTasks() {
  taskList.innerHTML = " ";

  tasks.sort(function (a, b) {
    return a.id - b.id;
  });

  tasks.forEach(function (task) {
    createTaskElement(task);
  });
}

//Create task element
function createTaskElement(task) {
  // Create a List li
  const li = document.createElement("li");
  li.className = "list-group-item";
  // li.style.display = "flex";
  // li.style.alignItems = "center";
  // li.style.justifyContent = "space-between";

  //Create checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";
  checkbox.checked = task.completed;

  //Create Task text
  const span = document.createElement("span");
  span.innerText = task.text;

  //Create Edit Button
  const editButton = document.createElement("button");
  editButton.innerHTML = `<i class="bi bi-pencil"></i>`;
  editButton.className = "edit-btn";

  //Create Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="bi bi-trash"></i>`;
  deleteButton.className = "delete-btn";

  //Hide action buttons if task not completed
  if (!task.completed) {
    editButton.style.display = "none";
    deleteButton.style.display = "none";
  }

  //If task was already completed
  if (task.completed) {
    span.classList.add("completed");
  }
  //left side
  const taskContent = document.createElement("div");
  taskContent.className = "taskContent";
  span.className = "taskText";

  taskContent.appendChild(checkbox);
  taskContent.appendChild(span);

  //Right side
  const taskAction = document.createElement("div");
  taskAction.className = "taskAction";

  taskAction.appendChild(editButton);
  taskAction.appendChild(deleteButton);

  //Add content to list (li)
  li.appendChild(taskContent);
  li.appendChild(taskAction);

  //add li to task list
  //   taskList.appendChild(li);
  taskList.prepend(li);

  //checkbox event listener
  checkbox.addEventListener("change", function () {
    task.completed = checkbox.checked;

    if (checkbox.checked) {
      span.classList.add("completed");
      editButton.style.display = "inline";
      deleteButton.style.display = "inline";
    } else {
      span.classList.remove("completed");
      editButton.style.display = "none";
      deleteButton.style.display = "none";
    }
    saveTasks();
  });

  //update event listener
  editButton.addEventListener("click", function () {
    const updateTask = prompt("Update Your Task ", span.innerText);
    if (updateTask !== "" && updateTask !== null) {
      span.innerText = updateTask.trim();
      //update task object
      task.text = updateTask.trim();
      //save update task
      saveTasks();
    }
  });

  // delete event listener
  deleteButton.addEventListener("click", function () {
    const confirmDelete = confirm(
      `Are you sure you want to delete ${span.innerText} task`,
    );
    if (confirmDelete) {
      tasks = tasks.filter(function (item) {
        return item.id !== task.id;
      });
      //save updated array
      saveTasks();

      //remove from page
      li.remove();
    }
  });
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please Enter Task");
    return;
  }

  //Create task object
  const task = { id: Date.now(), text: taskText, completed: false };

  //add task to array
  //   tasks.push(task);
  tasks.unshift(task);

  //save to local storage
  saveTasks();

  //Display task
  createTaskElement(task);

  //clear input
  taskInput.value = "";
}
//Form event listener
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTask();
});
//load saved tasks  when page open
loadTasks();

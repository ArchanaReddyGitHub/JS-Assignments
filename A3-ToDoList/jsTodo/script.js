const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskDate = document.getElementById("taskDate");
//get task from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//Save task to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Display all saved tasks when page load
function loadTasks() {
  taskList.innerHTML = "";

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

  //left side
  const taskContent = document.createElement("div");
  taskContent.className = "taskContent";

  //Create checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";
  checkbox.checked = task.completed;

  //Create Task text
  const span = document.createElement("span");
  span.className = "taskText";
  span.innerText = task.text;

  taskContent.appendChild(checkbox);
  taskContent.appendChild(span);

  //Date column
  const dateSpan = document.createElement("span");
  dateSpan.className = "taskDate";
  if (task.date) {
    const date = new Date(task.date + "T00:00:00");

    dateSpan.innerText = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  //Right side Action Button
  const taskAction = document.createElement("div");
  taskAction.className = "taskAction";

  const editButton = document.createElement("button");
  editButton.innerHTML = `<i class="bi bi-pencil"></i>`;
  editButton.className = "edit-btn";
  editButton.type = "button";

  //Create Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="bi bi-trash"></i>`;
  deleteButton.className = "delete-btn";
  deleteButton.type = "button";

  taskAction.appendChild(editButton);
  taskAction.appendChild(deleteButton);

  //Hide action buttons if task not completed
  if (!task.completed) {
    editButton.style.display = "none";
    deleteButton.style.display = "none";
  }

  //If task was already completed
  if (task.completed) {
    span.classList.add("completed");
  }

  //Add everything to list (li)
  li.appendChild(taskContent);
  li.appendChild(dateSpan);
  li.appendChild(taskAction);

  taskList.prepend(li);

  //checkbox event
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

  //update/edit event
  editButton.addEventListener("click", function () {
    const updateTask = prompt("Update Your Task ", task.text);

    if (updateTask === null) {
      return;
    }

    if (updateTask.trim() === "") {
      alert("Task can't be empty");
      return;
    }
    task.text = updateTask.trim();
    span.innerText = task.text;

    saveTasks();

    //edit/update date
    const dateEditor = document.createElement("input");
    dateEditor.type = "date";
    dateEditor.value = task.date || "";
    dateEditor.className = "dateEditor";

    dateSpan.replaceWith(dateEditor);

    dateEditor.addEventListener("change", function () {
      if (dateEditor.value !== "") {
        task.date = dateEditor.value;

        const date = new Date(task.date + "T00:00:00");
        dateSpan.innerText = date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

        dateEditor.replaceWith(dateSpan);
        saveTasks();
      } else {
        dateEditor.replaceWith(dateSpan);
      }
      // dateEditor.remove();
    });
    //open calender
    if (typeof dateEditor.showPicker == "function") {
      dateEditor.showPicker();
    } else {
      dateEditor.focus();
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

      saveTasks();

      li.remove();
    }
  });
}

function addTask() {
  const taskText = taskInput.value.trim();
  const targetDate = taskDate.value;
  if (taskText === "") {
    alert("Please Enter Task");
    return;
  }
  if (targetDate === "") {
    alert("select target finish date");
    return;
  }

  //Create task object
  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
    date: targetDate,
  };

  //add task to array
  //   tasks.push(task);
  tasks.unshift(task);

  //save to local storage
  saveTasks();

  //Display task
  createTaskElement(task);

  //clear input
  taskInput.value = "";
  taskDate.value = "";
}
//Form event listener
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTask();
});
//load saved tasks  when page open
loadTasks();

var addBtn = document.getElementById("add__btn");
var input = document.getElementById("input");
var list = document.getElementById("mission__list");
var deleteBtn = document.getElementById("delete");
var editBtn = document.getElementById("edit");
var doneBtn = document.getElementById("done");

let tasks = [];

function getTasksFromStorage() {
  let retrivedTasks = JSON.parse(localStorage.getItem("tasks"));
  tasks = retrivedTasks ?? [];
}
getTasksFromStorage();
fillTaskOnThePage();

function fillTaskOnThePage() {
  list.innerHTML = "";
  let index = 0;
  for (task of tasks) {
    let content = `
        <li id="task" class="${task.isDone ? "Done" : ""} ">
                <div id="task__title">
                  <h4>${task.title}</h4>
                  <div id="date">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      enable-background="new 0 0 24 24"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#1f1f1f"
                    >
                      <g><rect fill="none" height="24" width="24" /></g>
                      <g>
                        <path
                          d="M19,4h-1V2h-2v2H8V2H6v2H5C3.89,4,3.01,4.9,3.01,6L3,20c0,1.1,0.89,2,2,2h14c1.1,0,2-0.9,2-2V6C21,4.9,20.1,4,19,4z M19,20 H5V10h14V20z M9,14H7v-2h2V14z M13,14h-2v-2h2V14z M17,14h-2v-2h2V14z M9,18H7v-2h2V18z M13,18h-2v-2h2V18z M17,18h-2v-2h2V18z"
                        />
                      </g>
                    </svg>
                    <p>${task.date}</p>
                  </div>
                </div>
                <div id="task__action">
                  <div onclick="deleteTask(${index})" id="delete" class="icon delete">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="36px"
                      viewBox="0 0 24 24"
                      width="36px"
                      fill="#1f1f1f"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path
                        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                      />
                    </svg>
                  </div>
                  <div onclick="editTask(${index})" id="edit" class="icon edit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="36px"
                      viewBox="0 0 24 24"
                      width="36px"
                      fill="#1f1f1f"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path
                        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                      />
                    </svg>
                  </div>
                  ${
                    task.isDone
                      ? `
                      <div onclick=toggleTaskComplete(${index}) id="done" class="icon delete">
                   <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#1f1f1f"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                  </div>
                      `
                      : `
                    <div onclick=toggleTaskComplete(${index}) id="done" class="icon done">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="36px"
                      viewBox="0 0 24 24"
                      width="36px"
                      fill="#1f1f1f"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path
                        d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                      />
                    </svg>
                  </div>
                    `
                  }
                  
                </div>
              </li>
        `;
    list.innerHTML += content;
    index++;
  }
}
fillTaskOnThePage();
function addTask() {
  let value = input.value.trim();
  if (value === "") return;

  let now = new Date();
  let date =
    now.getDate() +
    "/" +
    (now.getMonth() + 1) +
    "/" +
    now.getFullYear() +
    " | " +
    now.getHours() +
    ":" +
    now.getMinutes();

  if (editingIndex !== null) {
    tasks[editingIndex].title = value;
    editingIndex = null;
    addBtn.innerHTML = "إضافة";
    storeTasks();
  } else {
    let taskObj = {
      title: value,
      date: date,
      isDone: false,
    };
    tasks.push(taskObj);
    storeTasks();
  }

  input.value = "";
  fillTaskOnThePage();
}
addBtn.addEventListener("click", addTask);

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function deleteTask(index) {
  let task = tasks[index];
  let isConfirmed = confirm("هل أنت متأكد من حذف : " + task.title + " ؟");
  if (isConfirmed) {
    tasks.splice(index, 1);
    storeTasks();
    fillTaskOnThePage();
  }
}
let editingIndex = null;

function editTask(index) {
  addBtn.innerHTML = "تعديل";
  input.focus();
  let task = tasks[index];
  input.value = task.title;
  editingIndex = index;
}

function toggleTaskComplete(index) {
  let task = tasks[index];
  task.isDone = !task.isDone;
  storeTasks();

  fillTaskOnThePage();
}

function storeTasks() {
  let tasksString = JSON.stringify(tasks);
  localStorage.setItem("tasks", tasksString);
}

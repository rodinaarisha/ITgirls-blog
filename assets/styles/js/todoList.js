const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const clearButtonTask = document.getElementById('clearButtonTask')
const taskList = document.getElementById("taskList");
const task = taskInput.value;
const errorValidation =document.getElementById('error')


function showTask(){
 let taskItemsResponse = JSON.parse(localStorage.getItem('taskItems'));
 if (taskItemsResponse === null || taskItemsResponse.length === 0) { 
   taskList.classList.toggle("nonexisttask");
   taskList.innerHTML = 'Задачи отсутствуют'; 
   clearButtonTask.disabled = true;
  
 } else {
   taskList.innerHTML = '';
   clearButtonTask.disabled = false;
   taskList.classList.toggle("existtask");

   taskItemsResponse.forEach(task => {
     const newElementli = document.createElement('div');
     //const newElementInput = document.createElement('input');
     //newElementInput.setAttribute('type', 'checkbox');
     //newElementInput.checked = task.completed;
     const newElementLabel = document.createElement('label');
     newElementLabel.textContent = task.name;
     taskList.appendChild(newElementli);
     //newElementli.appendChild(newElementInput);
     newElementli.appendChild(newElementLabel);

     //newElementInput.addEventListener('change', () => {
      // task.completed = newElementInput.checked;
       //localStorage.setItem('taskItems', JSON.stringify(taskItemsResponse));
    // });
   });
 }
}


taskInput.addEventListener('input', function() {
    error.innerHTML = ''; // Очистить поле ошибки при вводе текста
  });
  


function createTask() {
    const task = taskInput.value;
    if (task.trim() !== '') {
      let taskItems = localStorage.getItem('taskItems');
      taskItems = taskItems ? JSON.parse(taskItems) : []; 
      taskItems.push({ name: task, completed: false });
      localStorage.setItem('taskItems', JSON.stringify(taskItems));
      showTask();
      taskList.classList.remove("nonexisttask");
      taskInput.value = '';
      error.innerHTML = ''; // Очистить поле ошибки
    } else {
      if (!taskInput.value.trim()) {
        error.innerHTML = 'Кажется, вы что-то забыли заполнить';
      } else {
        error.innerHTML = '';
      }
    }
  }

addButton.addEventListener("click", createTask);


function clearTasks() {
    let taskItems = JSON.parse(localStorage.getItem('taskItems'));
    if (taskItems !== null) {
        localStorage.removeItem('taskItems');
        showTask();
        taskList.classList.add("nonexisttask");
        clearButtonTask.disabled = true; // Запретить повторное нажатие на кнопку "Очистить"
    } else {
        showTask();
    }
}

clearButtonTask.addEventListener("click", clearTasks);


document.addEventListener("DOMContentLoaded", showTask);
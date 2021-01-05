const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// loading all event listners
loadEventListeners();
// console.log(clearBtn)
function loadEventListeners() {

    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);

    // add task event
    form.addEventListener('submit', addTask);

    // del task through the del icon
    taskList.addEventListener('click', removeTask);

    // clear all task through clear task btn
    clearBtn.addEventListener('click', clearTasks);

    // event listner to filter the task
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks form local storagr
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
    
        // for creating li elements 
    const li = document.createElement('li');

    // add class to li element
    li.className = 'collection-item';

    // create text node and append to li 
    li.appendChild(document.createTextNode(task));

    // create new link element
    const link = document.createElement('a');

    // adding class to the link element
    link.className = 'delete-item secondary-content';

    // adding del icon
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // appending the link to li
    li.appendChild(link);
    
    // Appending li to ul 
    taskList.appendChild(li);
    });
}

// add task function 

function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task');
    }

    // for creating li elements 
    const li = document.createElement('li');

    // add class to li element
    li.className = 'collection-item';

    // create text node and append to li 
    li.appendChild(document.createTextNode(taskInput.value));

    // create new link element
    const link = document.createElement('a');

    // adding class to the link element
    link.className = 'delete-item secondary-content';

    // adding del icon
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // appending the link to li
    li.appendChild(link);
    
    // Appending li to ul 
    taskList.appendChild(li);

    // for storage of data in local storage 
    storeTaskInLocalStorage(taskInput.value);

    // for clearing input
    taskInput.value = '';

    e.preventDefault();
}

// function to store task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}


// function to del list by clicking on del btn (remove tasks)
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();

        // remove from local storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// function to tasks from Local storage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}


// function to clear task through clear task btn
function clearTasks() {
    // 1st simple way
    // taskList.innerHTML = ' ';

    // 2nd way using of while loop
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from local storage(LS)
    clearTasksFromLocalStorage();
}

// clear tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}


// function for filter
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach 
        (function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            } else {
                task.style.display = 'none';

            }
        
        });
}
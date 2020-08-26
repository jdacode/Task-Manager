// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const dateInput = document.querySelector('#start');
const reloadIcon = document.querySelector('.reload');
const jsonTask = {
    task: "",
    endDate: ""
};

// Load all event listeners
loadEventListeners();

// Load all event listener
function loadEventListeners(){
    // clear input
    taskInput.value = '';
    filter.value = '';
    dateInput.value = '';
    // load local storage
    document.addEventListener('DOMContentLoaded', loadTaskLocalStorage);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // remove tasks button
    clearBtn.addEventListener('click', clearTasks);
    // filter task
    filter.addEventListener('keyup', filterTasks);
    // reload icon
    reloadIcon.addEventListener('click', reloadTask);
}

function reloadTask(e){
    location.reload();
}

// load local storage
function loadTaskLocalStorage(){
    let taskArrayItem;
    if(localStorage.getItem('savedTasks') !== null){
        taskArrayItem = JSON.parse(localStorage.getItem('savedTasks'));
        taskArrayItem.forEach(
            function(taskStored){
                createTaskElement(taskStored.task, taskStored.endDate);
                // console.log(taskStored);
            }
        );
    }
}

// Add task
function addTask(e){
    if(taskInput.value !== '' && dateInput.value !== '' && daysRemaining(Date.parse(dateInput.value), Date.now()) >= 0){
        createTaskElement(taskInput.value, Date.parse(dateInput.value));
        // save locally
        saveTaskLocalStorage(taskInput.value, Date.parse(dateInput.value));        
        e.preventDefault();
    }
    taskInput.value = '';
    dateInput.value = '';
}

// create a tasks elements on the page
function createTaskElement(taskInput, taskDate){
    // Create li element
    const li = document.createElement('li');

    const vBolt = document.createElement('b');
    vBolt.innerText = 'Task: ';
    li.appendChild(vBolt);

    // add class
    li.className = 'collection-item orange darken-3 z-depth-5';
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput));  
    
    // ******** X button **********
    // create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // ****************************

    // ******** Line *************
    const vLine = document.createElement('hr');
    vLine.style.color = 'orange';
    // ****************************

    // ******** Date **************
    // create new Date element
    const newDate = document.createElement('p');
    newDate.className = 'newDate';
    var dDate = new Date(taskDate);
    newDate.innerText = 'Task deadline: ' + dDate.getUTCDate() + '/' + (dDate.getUTCMonth() + 1) + '/' + dDate.getUTCFullYear();
    // ****************************

    // ******** Date **************
    // create new Date element
    const newReDate = document.createElement('p');
    newReDate.className = 'remainingDays';
    var daysR = daysRemaining(taskDate, Date.now());
    newReDate.innerText = `Remaining days to complete this task: ${daysR}`;
    // ****************************

    // ******** Preloader **************
    // create new Date element
    const newPreloader = document.createElement('div');
    newPreloader.className = 'progress';
    const newDeterminate = document.createElement('div');    
    newDeterminate.className = 'determinate grey';
    var daysRPorcent = 100 - daysR;
    newDeterminate.style.width = daysRPorcent + '%';
    newPreloader.appendChild(newDeterminate)
    // ****************************

    // append the link to li
    li.appendChild(link);
    li.appendChild(vLine);
    // append Date
    li.appendChild(newDate);
    li.appendChild(newReDate);
    li.appendChild(newPreloader);
    // append li to ul
    taskList.appendChild(li);
}

function daysRemaining(datePlanned, dateNow) {
    var minutes = 1000 * 60;
    var hours = minutes * 60;
    var days = hours * 24;
    var years = days * 365;
    var tdatePlanned = datePlanned;
    var tdateNow = dateNow;
    var ydatePlanned = Math.round(tdatePlanned / days);
    var ydateNow = Math.round(tdateNow / days);
    var yt = ydatePlanned - ydateNow;
    return yt;
}


function saveTaskLocalStorage(saveInput, taskDate){
    // console.log(saveInput);
    let tempKey;
    if(localStorage.getItem('savedTasks') === null){
        tempKey = [];
    } else {
        tempKey = JSON.parse(localStorage.getItem('savedTasks'));
    }
    jsonTask.task = saveInput;
    jsonTask.endDate = taskDate;
    tempKey.push(jsonTask);
    // console.log(tempKey);
    localStorage.setItem('savedTasks', JSON.stringify(tempKey));
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        e.target.parentElement.parentElement.remove();
        // remove from LS
        // console.log(e.target.parentElement.parentElement.firstChild.nextSibling.textContent);
        removeTaskLocalStorage(e.target.parentElement.parentElement.firstChild.nextSibling.textContent);
    }
}

// remove item local storage
function removeTaskLocalStorage(taskItem){
    let taskArrayItem;
    if(localStorage.getItem('savedTasks') === null){
        taskArrayItem = [];
    } else {
        taskArrayItem = JSON.parse(localStorage.getItem('savedTasks'));
    }
    taskArrayItem.forEach(
        function(taskStored, index){
            if(taskStored.task === taskItem){
                taskArrayItem.splice(index, 1);
                // console.log(taskArrayItem);
            }
        }
    );

    localStorage.setItem('savedTasks', JSON.stringify(taskArrayItem));
}

function clearTasks(e){
    // option 1
    // taskList.innerHTML = '';
    // option 2 - faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.removeItem('savedTasks');
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.nextSibling.textContent.toLowerCase();
            // console.log(item);
            if(item.indexOf(text) != -1){
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        });
}
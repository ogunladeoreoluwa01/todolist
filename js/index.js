 // varables 
const forms =document.querySelector('form')
const entry =document.getElementById('todoadd');
const addBtn = document.getElementById('todoaddbtn');
const taskEntered = document.querySelector('.todotask');
const checkBtn = document.querySelector('.takedcomplete');
const delBtn = document.querySelector('.delete');
const taskSec =document.querySelector('.addedtasksection');


// getting data from the user and stornig it
// Get a reference to the form and the input field
const form = document.getElementById('myForm');
const userInputField = document.getElementById('userInput');

// Add an event listener for the form's submit event

// to create a new task and add it
let taskId = 1
const newTask= document.createElement('div')
function addTask(event){
    event.preventDefault();
    const entryValue = entry.value;
   entry.value = '';
   
newTask.setAttribute("data-id", taskId);
newTask.innerHTML = `
    <div class="addedtask" id="${taskId}" >
        <h1 class="todotask">${entryValue}</h1>
        <button class="takedcomplete btn"><i class="fa-solid fa-check"></i></button>
        <button class="delete btn"><i class="fa-solid fa-trash"></i></button>
    </div>
`;
taskId++;
taskSec.appendChild(newTask);
};
forms.addEventListener('submit', addTask);
// Function to delete a task based on its data-id
function deleteTask(taskId) {
    const taskToRemove = document.querySelector(`[data-id="${taskId}"]`);
    if (taskToRemove) {
        taskToRemove.remove();
    }
};



// Function to change the state of a task to done
function changeTaskDone(taskId) {
    const taskDiv = document.querySelector(`[data-id="${taskId}"]`);
    if (taskDiv) {
        const taskTitle = taskDiv.querySelector('.todotask');
        taskTitle.classList.add('done'); // Use classList.add to add a class
    }
}

// Function to remove the "done" style from a task
function removeTaskDone(taskId) {
    const taskNotDone = document.querySelector(`[data-id="${taskId}"]`);
    if (taskNotDone) {
        const taskTitle = taskNotDone.querySelector('.todotask');
        taskTitle.classList.remove('done'); // Use classList.remove to remove a class
    }
}

// Add an event listener to the document to handle task deletion and style change
delBtn.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete')) {
        const taskDel = event.target.closest('.addedtask');
        if (taskDel) {
            const taskIdToDelete = taskDel.getAttribute('data-id'); // Use taskDel, not taskDiv
            deleteTask(taskIdToDelete);
        }
    }
});

addBtn.addEventListener('click', function (event) {
    if (event.target.classList.contains('takedcomplete')) {
        const taskdone = event.target.closest('.addedtask');
        if (taskdone) {
            const takendoneID = taskdone.getAttribute('data-id');
            changeTaskDone(takendoneID);
        } else {
            removeTaskDone(takendoneID);
        }
    }
});


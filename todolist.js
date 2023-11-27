// Variables
const forms = document.querySelector("form");
const entry = document.getElementById("todoadd");
const taskSec = document.querySelector(".addedtasksection");
const errorMsg = document.querySelector(".error");

let taskId = 1;

// Hide error message by default
errorMsg.classList.add("dis");

// Event listener for form submission
forms.addEventListener("submit", function (event) {
	event.preventDefault();
	const entryValue = entry.value;
	forms.reset();
	if (entryValue.trim() === "") {
		// Show error message if input is empty
		errorMsg.classList.remove("dis");
	} else {
		errorMsg.classList.add("dis");
		addTask(entryValue);
		entry.value = "";
	}
});

// Event listener for editing a task
document.getElementById("editForm").addEventListener("submit", function (event) {
	event.preventDefault();
	const entryValue2 = document.getElementById("toEditadd").value;
	document.getElementById("editForm").reset();
	const error2 = document.querySelector(".error-2");

	if (entryValue2.trim() === "") {
		error2.classList.remove("dis");
	} else {
		error2.classList.add("dis");
		const tasktoedit = this.getAttribute("data-id");
		const taskToEdit = document.querySelector(`[data-id="${tasktoedit}"]`);
		editing(taskToEdit, entryValue2);
		document.getElementById("toEditadd").value = "";
		document.getElementById("popup").classList.add("is-hidden");
	}
});

// Event listener for submitting an edit
document.getElementById("toEditbtn").addEventListener("click", function (e) {
	e.target;
	const tasktoedit = document.getElementById("editForm").getAttribute("data-id");
	const taskToEdit = document.querySelector(`[data-id="${tasktoedit}"]`);
	editTask(taskToEdit, document.getElementById("toEditadd").value);
});

// Function to add a new task
function addTask(entryValue) {
	const randomColor = [
		"rancolor1",
		"rancolor2",
		"rancolor3",
		"rancolor4",
		"rancolor5",
		"rancolor6",
		"rancolor7",
		"rancolor8",
	];

	const randomColorIndex =
		randomColor[Math.floor(Math.random() * randomColor.length)];

	const newTask = document.createElement("div");
	const taskId = `task-${Date.now()}`;
	newTask.setAttribute("data-id", taskId);
	newTask.innerHTML = `
    <div class="addedtask" id="${taskId}">
      <span class="colorBlock ${randomColorIndex}" id="colorblock"></span>
      <p class="todotask">${entryValue}</p>

      <div class="button-container">
        <button class="edit-btn btn"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="takedcomplete btn"><i class="fa-solid fa-check"></i></button>
        <button class="delete btn"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>
  `;

	taskSec.appendChild(newTask);

	const deleteButton = newTask.querySelector(".delete");
	const doneButton = newTask.querySelector(".takedcomplete");
	const editButton = newTask.querySelector(".edit-btn");
	const popup = document.getElementById("popup");

	// Event listener for deleting a task
	deleteButton.addEventListener("click", function () {
		const taskIdToDelete = newTask.getAttribute("data-id");
		deleteTask(taskIdToDelete);
	});

	// Event listener for marking a task as done
	doneButton.addEventListener("click", function () {
		const taskIdToChange = newTask.getAttribute("data-id");
		changeTaskDone(taskIdToChange);
	});

	// Event listener for opening the edit popup
	editButton.addEventListener("click", function () {
		popup.classList.toggle("is-hidden");
		document.getElementById("editForm").setAttribute("data-id", taskId);
	});

	// Event listener for closing the edit popup
	document.getElementById("closeModal").addEventListener("click", function () {
		popup.classList.add("is-hidden");
	});
}

// Function to delete a task
function deleteTask(taskId) {
	const taskToRemove = document.querySelector(`[data-id="${taskId}"]`);
	if (taskToRemove) {
		taskToRemove.remove();
	}
}

// Function to mark a task as done
function changeTaskDone(taskId) {
	const taskDiv = document.querySelector(`[data-id="${taskId}"]`);
	if (taskDiv) {
		const taskTitle = taskDiv.querySelector(".todotask");
		taskTitle.classList.toggle("done");
	}
}

// Function for editing a task
function editTask(taskToEdit, newText) {
	if (taskToEdit) {
		const taskTitle = taskToEdit.querySelector(".todotask");
		taskTitle.textContent = newText;
	}
}

// Function for displaying the edited text
function editing(taskToEdit, newText) {
	if (taskToEdit) {
		const text = taskToEdit.querySelector(".todotask");
		text.textContent = newText;
	}
}


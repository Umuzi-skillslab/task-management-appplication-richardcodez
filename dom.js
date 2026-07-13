// DOM Manipulation - Starter Code with Errors

// Missing: proper DOM selectors
function setupEventListeners() {
    // Wrong selector method
    // var addButton = document.getElementById(".add-task-btn");  // Wrong - mixing ID and class
    // var taskInput = document.querySelector("task-input");  // Missing #

    const taskForm = document.getElementById("task-form");
    const taskListContainer = document.getElementById("task-list");

    // null checks for DOM elements
    if (taskForm) {
        taskForm.addEventListener("submit", handleAddTask);
    } else {
        console.error("setupEventListeners: task-form element not found in DOM");
    }
  
    // other event listeners for form submission, etc.
    if (taskListContainer) {
        taskListContainer.addEventListener("click", handleTaskListClick);
    } else {
        console.error("setupEventListeners: task-list element not found in DOM");
    }
}

// Function with DOM manipulation errors
function handleAddTask() {
    var titleInput = document.getElementById("title");
    var descInput = document.getElementById("description");
    
    // No validation
    // Should use event.preventDefault() if form
    
    var title = titleInput.value;
    var description = descInput.value;
    
    // Missing: priority input
    
    addTask(title, description, 1);
    displayTasks();
    
    // Missing: clear inputs after adding
}

// Function that should use better selectors
function displayTasks() {
    var container = document.getElementById("task-list");
    
    // Should clear existing content first
    // Missing: null check
    
    // Inefficient - should use template literals and insertAdjacentHTML
    for (var i = 0; i < taskList.length; i++) {
        var div = document.createElement("div");
        div.innerHTML = "<h3>" + taskList[i].title + "</h3>";
        div.innerHTML = div.innerHTML + "<p>" + taskList[i].description + "</p>";
        container.appendChild(div);
        
        // Missing: task ID, completion status, event handlers for delete/complete
    }
}

// Function with event handling issues
function handleTaskClick(event) {
    // Missing: event.target check
    // Missing: proper event delegation
    
    var taskId = event.target.id;  // Wrong way to get task ID
    
    // Should toggle task completion
    console.log("Task clicked: " + taskId);
}

// Missing: JSON conversion functions
// Missing: functions to save/load tasks from localStorage

// Initialize (wrong placement - should use DOMContentLoaded)
setupEventListeners();

// DOM Manipulation

import { addTask, calculateAveragePriority, taskList } from './app.js';
import { formatTaskName, getPriorityLabel, loadFromStorage, saveToStorage } from './utils.js';

// proper DOM selectors
function setupEventListeners() {

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
        taskListContainer.addEventListener("click", handleTaskClick);
    } else {
        console.error("setupEventListeners: task-list element not found in DOM");
    }
}

// Function with DOM manipulation
function handleAddTask(event) {
    event.preventDefault();  // Prevent form submission

    try {
        const titleInput = document.getElementById("title");
        const descInput = document.getElementById("description");
        const priorityInput = document.getElementById("priority");

        // validation
        if (!titleInput || !descInput || !priorityInput) {
            throw new Error("handleAddTask: One or more input elements not found in DOM");
        }

        const title = formatTaskName(titleInput.value);
        const description = descInput.value;
        const priority = Number(priorityInput.value);

        addTask(title, description, priority);
        saveToStorage(taskList);
        displayTasks();
        updateStatistics();

        // clearing inputs after adding
        document.getElementById("task-form").reset();
    }
    catch (error) {
        console.error(`handleAddTask: Error occurred while adding task: ${error.message}`);
    }
}

// Function that uses better selectors
function displayTasks() {
    const container = document.getElementById("task-list");

    // clear existing content first
    // null check
    if (!container) {
        console.error("displayTasks: task-list container not found in DOM");
        return;
    }
    container.innerHTML = "";  // Clear existing tasks

    for (const task of taskList) {
        const div = document.createElement("div");
        div.classList.add("task-item");
        div.dataset.id = task.id;

        div.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <span class="priority">Priority: ${getPriorityLabel(task.priority)}</span>
            <span class="status">${task.completed ? "Completed" : "Pending"}</span>
            <button class="complete-btn" data-action="complete" data-id=${task.id}>Toggle Complete</button>
            <button class="delete-btn" data-action="delete" data-id=${task.id}>Delete</button>
        `

        container.appendChild(div);
    }
}

// Function with event handling issues
function handleTaskClick(event) {

    const button = event.target.closest("button");
    if (!button) return;

    const taskId = Number(button.dataset.id);  // getting task ID
    const action = button.dataset.action;

    if (!taskId || !action) {
        return
    }

    try {
        if (action === "complete") {
            const task = taskList.find(t => t.id === taskId);
            if (!task) {
                throw new Error(`No task found with the given ID: ${taskId}`);
            }
            task.toggleCompleted();
        } else if (action === "delete") {
            const index = taskList.findIndex(t => t.id === taskId);
            if (index === -1) {
                throw new Error(`No task found with the given ID: ${taskId}`);
            }
            taskList.splice(index, 1);  // Remove task from list
        }

        saveToStorage(taskList);
        displayTasks();
        updateStatistics();
    }
    catch(error) {
        console.error(`handleTaskClick: Error occurred while handling task click: ${error.message}`);
    }

}

// update statistics function
function updateStatistics() {
    const totalEl = document.getElementById("total-tasks");
    const completedEl = document.getElementById("completed-tasks");
    const avgEl = document.getElementById("average-priority");

    if (!totalEl || !completedEl || !avgEl) {
        console.error("updateStatistics: statistic elements not found in DOM");
        return;
    }

    totalEl.textContent = taskList.length;
    completedEl.textContent = taskList.filter(task => task.completed).length;
    avgEl.textContent = calculateAveragePriority();
}

function initializeTasks() {
    // Load tasks from localStorage
    try {
        const savedTasks = loadFromStorage();
        if (Array.isArray(savedTasks) && savedTasks.length > 0) {
            taskList.push(...savedTasks);
        }
        displayTasks();
        updateStatistics();
    }
    catch(error) {
        console.error(`initializeTasks: Error occurred while loading tasks from localStorage: ${error.message}`);
    }
}

// Initializing
document.addEventListener("DOMContentLoaded", () => {
    setupEventListeners();
    initializeTasks();
})


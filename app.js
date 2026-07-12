// Task Management Application

// Global variables
let taskList = [];
let taskCounter = 0;

// Task class
class Task {
    constructor(id, title, description, priority) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.completed = false;
    }

    // Toggle completed status
    toggleCompleted() {
        this.completed = !this.completed;
        return this.completed;
    }

    getInfo() {
        // template literals
        return `Task:  + ${this.title} + " - Priority: " + ${this.priority}`;
    }
}

// Subtask class
class SubTask extends Task {
    constructor(id, title, description, priority, parentTask) {
        super(id, title, description, priority);
        this.parentTask = parentTask;
    }

    // getInfo method overriding
    getInfo() {
        return `${super.getInfo()} [Subtask of: ${this.parentTask}]`;
    }
}

// Functions with errors

// Function with error handling
function addTask(id, title, description, priority) {

    if (typeof title !== "string" || title.trim() === "") {
        throw new Error("addTask: string title must be added");
    }
    if (typeof description !== "string") {
        throw new Error("addTask: description must be added as string");
    }
    if (typeof priority !== "number") {
        throw new Error("addTask: priority must be a number");
    }

    taskCounter++;
    const newTask = new Task(taskCounter, title.trim(), description.trim(), priority);
    taskList.push(newTask);
    return newTask;
}

// Function with for of loop
function displayAllTasks() {
    for (const task of taskList) {
        console.log(task.title);
    }
}

// Function missing parameter
function findTaskByTitle(title) {

    if (title.trim() === "" || (typeof title) !== "string") {
        return undefined;
    }

    // for loop replaced while loop
    for (const task of taskList) {
        if (task.title === title) {
            return task;
        }

    }
    return undefined;
}

// Function with type checking
function updateTaskPriority(taskId, newPriority) {

    // typeof check for parameters
    if (typeof taskId !== "number") {
        throw new Error("updateTaskPriority: taskId must be a number");
    }
    if (typeof newPriority !== "number") {
        throw new Error("updateTaskPriority: newPriority must be a number");
    }

    // null/undefined validation
    if (taskId === null || taskId === undefined) {
        throw new Error("updateTaskPriority: taskId cannot be null or undefined");
    }
    if (newPriority === null || newPriority === undefined) {
        throw new Error("updateTaskPriority: newPriority cannot be null or undefined");
    }

    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === taskId) {
            taskList[i].priority = newPriority;
            return true;
        }
    }
    return false;
}

// Object destructuring with error handling
function getTaskDetails(task) {

    if (!task || typeof task !== "object") {
        throw new Error("getTaskDetails: task must be a valid object");
    }

    // Object destructuring
    const { title, description, priority, completed } = task;

    return {
        title,
        description,
        priority,
        completed
    };
}

// Function with spread/rest operators
function mergeTasks(list1, list2, ...rest) {
    // Should use spread operator
    return [...list1, ...list2, ...rest];
}

// Recursive function
function countCompletedTasks(tasks, index = 0) {
    // base case check
    // null/undefined check
    if (!Array.isArray(tasks)) {
        throw new Error("countCompletedTasks: tasks must be an array");
    }
    if (index >= tasks.length) {
        return 0;
    }
    if (tasks[index] === null || tasks[index] === undefined) {
        throw new Error("countCompletedTasks: task at index " + index + " is null or undefined");
    }

    if (tasks[index].completed) {
        return 1 + countCompletedTasks(tasks, index + 1);
    } else {
        return countCompletedTasks(tasks, index + 1);
    }
}

// Function with Math object issues
function calculateAveragePriority() {
    // checking for empty array
    if (taskList.length === 0) {
        return 0;
    }
    const total = taskList.reduce((sum, task) => sum + task.priority, 0);
    return Math.round(total / taskList.length *100) / 100;
}

// Filter function with errors
function getHighPriorityTasks(minPriority) {

    if (typeof minPriority !== "number") {
        throw new Error("getHighPriorityTasks: minPriority must be a number");
    }

    // Should use array methods (filter)
    return taskList.filter(task => tasks.priority > minPriority);
}

// Object with missing methods
var TaskManager = {
    tasks: taskList,

    // Missing: method to add task using functional approach
    // Missing: method using array methods (map, filter, reduce)

    getTotalTasks: function () {
        return this.tasks.length;
    }
};

// Export issues - should be a module
// Missing: proper module exports

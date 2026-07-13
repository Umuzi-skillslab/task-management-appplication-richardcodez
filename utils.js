// Utilities - Starter Code (WITH ERRORS AND MISSING FEATURES)

// Using proper data structures
const priorities = {
    1: "low",
    2: "medium",
    3: "high"
};

const HIGH_PRIORITY_TASK = 3;

// Bug: Missing JSON operations
function saveToStorage(data) {
    // converts to JSON
    if (!Array.isArray(data)) {
        throw new Error("saveToStorage: data must be an array");
    }

    try {
        const jsonData = JSON.stringify(data);
        localStorage.setItem("tasks", jsonData);
    }
    catch(error) {
        console.log(`saveToStorage failed: ${error.message}`);
    }
}

function loadFromStorage() {
    // parsing JSON
    try {
        const data = localStorage.getItem("tasks");
        return data? JSON.parse(data) : [];
    }
    catch(error) {
        console.log(`loadFromStorage failed: ${error.message}`);
        return [];
    }
}

// Bug: Incorrect Math object usage
function generateRandomId() {
    return Math.floor(Math.random() * 1000000);  // Returns integer
}

// String manipulation
function formatTaskName(name) {
    // Bug: Not using string methods properly
    if (typeof name !== "string") {
        throw new Error("formatTaskName: name must be a string");
    }
    const result = name.trim();
    if (result.length === 0) {
        return "";
    }

    return `${result.charAt(0).toUpperCase()}${result.slice(1)}`;  // capitalize, trim, etc.
}

// returns boolean
function isHighPriority(task) {
    if (!task || typeof task.priority !== "number") {
        throw new Error("isHighPriority: task must be an object with a numeric priority");
    }
    if (task.priority === HIGH_PRIORITY_TASK) {
        return true;  // returns boolean
    }
    return false;
}

function getPriorityLabel(priorityValue) {
    return priorities[priorityValue] || "unknown";  // returns string
}

// Missing: Class definitions
// Missing: Inheritance example
// Missing: Module exports
// Missing: Proper use of operators (logical, comparison)
// Missing: Recursion
// Missing: Functional programming patterns
// Missing: Proper scope demonstration

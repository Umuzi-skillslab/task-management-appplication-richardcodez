// Jest Tests

// proper imports

import {
    taskList,
    Task,
    addTask,
    updateTaskPriority,
    findTaskByTitle,
    calculateAveragePriority,
    mergeTasks,
    getHighPriorityTasks,
    hasHighPriorityTask,
    countCompletedTasks,
    SubTask,
    getTaskDetails,
    TaskManager,
} from './app.js';

beforeEach(() => {
    taskList.length = 0; // Reset taskList before each test
});

describe('Task Class', () => {
    test('should create a task', () => {
        const task = new Task(1, 'Test Task', 'Description', 3);
        expect(task.id).toBe(1);
        expect(task.title).toBe('Test Task');
        expect(task.description).toBe('Description');
        expect(task.priority).toBe(3);
        expect(task.completed).toBe(false);
    });

    // test for getInfo method
    test('getInfo should return correct task info', () => {
        const task = new Task(1, 'Test Task', 'Description', 3);
        expect(task.getInfo()).toBe('Task: Test Task - Priority: 3');
    });

    // test for toggle completion
    test('toggleCompleted should toggle the completed status', () => {
        const task = new Task(1, 'Test Task', 'Description', 3);

        expect(task.completed).toBe(false);
        task.toggleCompleted();
        expect(task.completed).toBe(true);
        task.toggleCompleted();
        expect(task.completed).toBe(false);
    });
});

describe('Task Functions', () => {

    test('should add task', () => {
        const task = addTask('New Task', 'Test', 2);
        // Wrong assertion - should check taskList
        expect(task).toBeDefined();
        expect(taskList).toHaveLength(1);
        expect(taskList[0].title).toBe('New Task');
    });

    test('findTaskByTitle finds an existing task by exact title', () => {
        addTask('Task 1', 'Description 1', 1);
        addTask('Walk dog', 'Description 2', 2);

        const found = findTaskByTitle('Walk dog');
        expect(found).toBeDefined();
        expect(found.title).toBe('Walk dog');
    });

    test('updateTaskPriority updates the priority of an existing task', () => {
        const task = addTask('Task 1', 'Description 1', 1);
        const updated = updateTaskPriority(task.id, 5);

        expect(updated).toBe(true);

        const updatedTask = taskList.find(t => t.id === task.id);
        expect(updatedTask.priority).toBe(5);
    });

    test('calculateAveragePriority calculates the correct average', () => {
        addTask('Task 1', 'Description 1', 1);
        addTask('Task 2', 'Description 2', 3);

        expect(calculateAveragePriority()).toBe(2);
    })

    // error handling tests
    describe('Error Handling', () => {
        test('addTask throws error for invalid title', () => {
            expect(() => addTask('', 'Description', 1)).toThrow('addTask: string title must be added');
        });

        test('addTask throws when priority is not a number', () => {
            expect( () => {
                addTask('Task', 'Description', 'high').toThrow('addTask: priority must be a number');
            });
        });

        test('updateTaskPriority throws error for invalid taskId', () => {
            expect( () => {
                updateTaskPriority('abc', 2).toThrow('updateTaskPriority: taskId must be a number');
            });
        });

        // edge cases
        describe( 'Edge cases', () => {
            test('findTaskByTitle returns undefined when no match exists', () => {
                addTask('Buy mil', 'description', 1);
                expect(findTaskByTitle('does not exist')).toBeUndefined();
            });

            test('updateTaskPriority return false when task Id does not exist', () => {
                addTask('Task 1', 'description', 1);
                expect(updateTaskPriority(99, 3)).toBe(false);
            });

            test('calculateAveragePriority returns 0 for an empty task list', () => {
                expect(calculateAveragePriority()).toBe(0);
            });
        });
    });

});

describe('Array Operations', () => {
    test('mergeTasks combines multiple arrays using spread and rest parameters', () => {
        const list1 = [new Task(1, 'A', 'description A', 1)];
        const list2 = [new Task(1, 'B', 'description B', 2)];
        const extra = new Task(1, 'C', 'description C', 3);

        const merged = mergeTasks(list1, list2, extra);

        expect(merged).toHaveLength(3);
        expect(merged[2].title).toBe('C');
    });

    test('getHighPriorityTasks filters tasks above a threshold', () => {
        addTask('Low task', 'description', 1);
        addTask('High task', 'description', 3);

        const result = getHighPriorityTasks(2);

        expect(result).toHaveLength(1);
        expect(result[0].title).toBe('High task');
    });

    test('hasHighPriorityTask (pure function) correctly checks without mutating', () => {
        addTask('Task 1', 'description 1', 1);
        addTask('Task 2', 'description 2', 3);

        const before = [...taskList];
        const result = hasHighPriorityTask(taskList, 3);

        expect(result).toBe(true);
        expect(taskList).toEqual(before);
    });

    // recursive
    test('countCompletedTasks counts completed tasks recursively', () => {
        const task1 = addTask('Task 1', 'description 1', 1);
        const task2 = addTask('Task 2', 'description 2', 2);
        addTask('Task 3', 'description 3', 3);

        task1.toggleCompleted();
        task2.toggleCompleted();

        expect(countCompletedTasks(taskList)).toBe(2);
    });

    // error handling
    describe('Error handling', () => {
        test('countCompletedTasks throws when given a non-array', () => {
            expect(() => {
                countCompletedTasks(null)
            }).toThrow('countCompletedTasks: tasks must be an array');
        });

        test('countCompletedTasks throws when array contains a null/undefined task', () => {
            expect(() => {
                countCompletedTasks([null])
            }).toThrow('countCompletedTasks: task at index 0 is null or undefined');
        });
    });

    // edge cases
    describe('Edge cases', () => {
        test('countCompletedTasks base case returns 0 for an empty array', () => {
            expect(countCompletedTasks([])).toBe(0);
        });
    });

});

// SubTask class and inheritance
describe('SubTask class and inheritance', () => {
    test('SubTask inherits from Task and includes parent task info', () => {
        const subTask = new SubTask(2, 'Add charts', 'Add charts to report', 1, 'Write report');

        expect(subTask.id).toBe(2);
        expect(subTask.title).toBe('Add charts');
        expect(subTask.completed).toBe(false);
        expect(subTask).toBeInstanceOf(Task);

        expect(subTask.getInfo()).toBe(
            'Task: Add charts - Priority: 1 [Subtask of: Write report]'
        );
    });

    test('SubTask inherits toggleCompleted from Task', () => {
        const subTask = new SubTask(2, 'Add charts', 'Add charts to report', 1, 'Write report');
        subTask.toggleCompleted();

        expect(subTask.completed).toBe(true);
    })
});

// Destructuring functions
describe('Destructuring functions', () => {
    test('getTaskDetails destructures the expected fields from a task object', () => {
        const task = addTask('Task 1', 'description', 2);
        const { title, description, priority, completed } = getTaskDetails(task);

        expect(title).toBe('Task 1');
        expect(description).toBe('description');
        expect(priority).toBe(2);
        expect(completed).toBe(false);
    });

    test('findTaskByTitle returns undefined for an empty title', () => {
        expect(findTaskByTitle('')).toBeUndefined();
    });
});

// Task Manager Object
describe('Taskmanager', () => {
    test('getCompletedCount and getAllTitles reflect current tasks', () => {
        const task1 = TaskManager.addNewTask('Task 1', 'description 1', 1);
        TaskManager.addNewTask('Task 2', 'description 2', 2);
        task1.toggleCompleted();

        expect(TaskManager.getCompletedCount()).toBe(1);
        expect(TaskManager.getAllTitles()).toEqual(['Task 1', 'Task 2']);
        expect(TaskManager.getTotalTasks()).toBe(2);
    });
});


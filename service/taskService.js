import Task from '../models/Task.js';// Import the Task model

// Service to get all tasks
export const getAllTasksService = async () => {
    try {
        return await Task.findAll();  // Retrieves all tasks
    } catch (error) {
        throw new Error('Error fetching tasks: ' + error.message);
    }
};

// Service to get a task by ID
export const getTaskByIdService = async (id) => {
    try {
        const task = await Task.findByPk(id);  // Find a task by primary key (ID)
        if (!task) {
            throw new Error('Task not found');
        }
        return task;
    } catch (error) {
        throw new Error('Error fetching task: ' + error.message);
    }
};

// Service to create a new task
export const createTaskService = async (taskData) => {
    try {
        const { userId, title, description, dueDate, priority, category, status } = taskData;
        return await Task.create({  // Create a new task with the provided data
            userId,
            title,
            description,
            dueDate,
            priority,
            category,
            status,
        });
    } catch (error) {
        throw new Error('Error creating task: ' + error.message);
    }
};

// Service to update an existing task
export const updateTaskService = async (id, taskData) => {
    try {
        const task = await Task.findByPk(id);  // Find the task by ID
        if (!task) {
            throw new Error('Task not found');
        }
        // Update task fields if new values are provided
        task.title = taskData.title || task.title;
        task.description = taskData.description || task.description;
        task.dueDate = taskData.dueDate || task.dueDate;
        task.priority = taskData.priority || task.priority;
        task.category = taskData.category || task.category;
        task.status = taskData.status || task.status;

        await task.save();  // Save the updated task
        return task;
    } catch (error) {
        throw new Error('Error updating task: ' + error.message);
    }
};

// Service to delete a task
export const deleteTaskService = async (id) => {
    try {
        const task = await Task.findByPk(id);  // Find the task by ID
        if (!task) {
            throw new Error('Task not found');
        }
        await task.destroy();  // Delete the task
        return { message: 'Task deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting task: ' + error.message);
    }
};

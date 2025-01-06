import {
    getAllTasksService,
    getTaskByIdService,
    createTaskService,
    updateTaskService,
    deleteTaskService
} from '../service/taskService.js'; // Import the task services

// Controller function to get all tasks
export const getAllTasks = async (req, res) => {
    console.log("Fetching all tasks...");
    try {
        const tasks = await getAllTasksService();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};  

// Controller function to get a single task by ID
export const getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await getTaskByIdService(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to create a new task
export const createTask = async (req, res) => {
    const { userId, title, description, dueDate, priority, category, status } = req.body;
    try {
        console.log("Creating task:", { userId, title, description, dueDate, priority, category, status });
        const newTask = await createTaskService({ userId, title, description, dueDate, priority, category, status });
        console.log("Task created:", newTask);
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: error.message });
    }
};

// Controller function to update a task by ID
export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, dueDate, priority, category, status } = req.body;
    try {
        const updatedTask = await updateTaskService(id, { title, description, dueDate, priority, category, status });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to delete a task by ID
export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await deleteTaskService(id);
        if (!response) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

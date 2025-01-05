import express from 'express';
import Task from '../models/Task.js'; // Ensure correct path to Task model

const router = express.Router();

// GET all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching tasks' });
    }
});

// GET task by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching task' });
    }
});

// POST new task
router.post('/', async (req, res) => {
    const { title, description, dueDate, priority, status } = req.body;

    // Validation
    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    try {
        const newTask = await Task.create({
            title,
            description,
            dueDate,
            priority,
            status,
        });
        res.status(201).json(newTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating task' });
    }
});

// PUT update task by taskId
router.put('/:id', async (req, res) => {
    const { id } = req.params; // Get task ID from the URL
    const { title, description, dueDate, priority, status } = req.body;

    if (!title && !description && !dueDate && !priority && !status) {
        return res.status(400).json({ message: 'At least one field is required to update' });
    }

    try {
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.update({
            title: title || task.title,
            description: description || task.description,
            dueDate: dueDate || task.dueDate,
            priority: priority || task.priority,
            status: status || task.status,
        });

        res.status(200).json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating task' });
    }
});

// DELETE task by taskId
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.destroy();

        res.status(204).send(); // No content
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting task' });
    }
});

export default router;



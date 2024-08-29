import Task from '../models/task.model';
import respond from '../utils/respond.util';

import { Router } from 'express';
const router = Router();

// Get all tasks
router.get('/', async (req: any, res) => {
    try {
        const userId = req.user._id;
        const tasks = await Task.find({ user: userId });
        respond({ res, data: tasks, message: 'Tasks Fetched!' });
    } catch (e) {
        respond({ res, status: 500, message: 'Something went wrong!' });
    }
});

// Create a new task
router.post('/', async (req: any, res) => {
    try {
        const userId = req.user._id;
        const task = await Task.create({ ...req.body, user: userId });
        await task.save();
        respond({ res, data: task, message: 'Created Succesfully!' });
    } catch (e) {
        respond({ res, status: 500, message: 'Something went wrong!' });
    }
});

// Update a task
router.put('/:id', async (req: any, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        let task = await Task.findOne({ _id: id, user: userId });

        if (!task) {
            return respond({
                res,
                // data: task,
                status: 404,
                message: 'Task not found!',
            });
        }

        await task.updateOne(req.body, { new: true });
        respond({ res, data: task, message: 'Updated Succesfully!' });
    } catch (e) {
        respond({ res, status: 500, message: 'Something went wrong!' });
    }
});

// Delete a task
router.delete('/:id', async (req: any, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;

        const task = await Task.findOne({ _id: id, user: userId });

        if (!task) {
            return respond({
                res,
                // data: { task },
                status: 404,
                message: 'Task not found!',
            });
        }

        await task.deleteOne();
        respond({ res, message: 'Task deleted' });
    } catch (e) {
        respond({ res, status: 500, message: 'Something went wrong!' });
    }
});

export default router;

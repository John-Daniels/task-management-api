import mongoose, { Model } from 'mongoose';
import { IUserModel } from './user.model';

interface ITask {
    user: mongoose.Types.ObjectId | IUserModel;
    title: string;
    description?: string;
    completed: boolean;
}

export type ITaskModel = Model<ITask>;

const taskSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        title: { type: String, required: true },
        description: { type: String },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model<ITask, ITaskModel>('tasks', taskSchema);
export default Task;

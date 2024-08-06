import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: String,
    status: String,
    content: String,
    timeStart: Date,
    timeEnd: Date,
    createdBy: String,
    membersList: Array,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
}, {
    timestamps: true,
})

const Task = mongoose.model('Task', taskSchema, 'task');

export default Task;
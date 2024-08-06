import { Request, Response } from 'express';
import Task from "../models/task.model";

export const index = async (req: Request, res: Response) => {
    const find = {
        deleted: false,
    }

    if (req.query.status) {
        find['status'] = req.query.status.toLocaleString();
    }

    const sort = {}
    if (req.query.sortKey && req.query.sortValue) {
        const sortKey: string = req.query.sortKey.toLocaleString();
        sort[sortKey] = req.query.sortValue;
    }

    interface pagination {
        currentPage: number,
        totalPage: number,
        limit: number,
        skip: number,
    }
    const pagination: Partial<pagination> = {}
    if (req.query.limit && req.query.page) {
        const totalTask = await Task.countDocuments(find);
        pagination.currentPage = parseInt(req.query.page.toLocaleString());
        pagination.limit = parseInt(req.query.limit.toLocaleString());
        pagination.skip = (pagination.currentPage - 1) * pagination.limit;
        pagination.totalPage = Math.ceil(totalTask / pagination.limit);
    }

    if (req.query.keyword) {
        find['title'] = new RegExp(req.query.keyword.toLocaleString(), 'i');
    }

    const task = await Task.find(find).sort(sort).skip(pagination.skip).limit(pagination.limit)
    res.json(task);
}

export const changeStatus = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        const status: string = req.body.status;

        await Task.updateOne({ _id: id }, { status: status });
        res.json({
            code: 200,
            message: "Update status successfully",
        });
    } catch(error) {
        res.json({
            code: 400,
            message: "Update status failed",
        });
    }
}

export const changeMulti = async (req: Request, res: Response) => {
    try {
        const ids: string[] = req.body.ids;
        const key: string = req.body.key;
        const value: string = req.body.value;

        await Task.updateMany({ _id: { $in: ids } }, { [key]: value});
        res.json({
            code: 200,
            message: "Update status successfully",
        });
    } catch(error) {
        res.json({
            code: 400,
            message: "Update status failed",
        });
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const title: string = req.body.title;
        const status: string = req.body.status;

        const task = new Task({
            title: title,
            status: status,
        });
        await task.save();

        res.json({
            code: 200,
            message: "Create task successfully",
            task: task,
        });
    } catch(error) {
        res.json({
            code: 400,
            message: "Create task failed",
        });
    }
}

export const edit = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        await Task.updateOne({ _id: id }, req.body);
        res.json({
            code: 200,
            message: "Update task successfully",
        });
    } catch(error) {
        res.json({
            code: 400,
            message: "Update task failed",
        });
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        await Task.updateOne({_id: id}, {deleted: true, deletedAt: Date.now()});

        res.json({
            code: 200,
            message: "Delete task successfully",
        });
    } catch(error) {
        res.json({
            code: 400,
            message: "Delete task failed",
        });
    }
}
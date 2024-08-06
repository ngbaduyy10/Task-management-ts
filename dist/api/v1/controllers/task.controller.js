"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.edit = exports.create = exports.changeMulti = exports.changeStatus = exports.index = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        deleted: false,
    };
    if (req.query.status) {
        find['status'] = req.query.status.toLocaleString();
    }
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        const sortKey = req.query.sortKey.toLocaleString();
        sort[sortKey] = req.query.sortValue;
    }
    const pagination = {};
    if (req.query.limit && req.query.page) {
        const totalTask = yield task_model_1.default.countDocuments(find);
        pagination.currentPage = parseInt(req.query.page.toLocaleString());
        pagination.limit = parseInt(req.query.limit.toLocaleString());
        pagination.skip = (pagination.currentPage - 1) * pagination.limit;
        pagination.totalPage = Math.ceil(totalTask / pagination.limit);
    }
    if (req.query.keyword) {
        find['title'] = new RegExp(req.query.keyword.toLocaleString(), 'i');
    }
    const task = yield task_model_1.default.find(find).sort(sort).skip(pagination.skip).limit(pagination.limit);
    res.json(task);
});
exports.index = index;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const status = req.body.status;
        yield task_model_1.default.updateOne({ _id: id }, { status: status });
        res.json({
            code: 200,
            message: "Update status successfully",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Update status failed",
        });
    }
});
exports.changeStatus = changeStatus;
const changeMulti = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = req.body.ids;
        const key = req.body.key;
        const value = req.body.value;
        yield task_model_1.default.updateMany({ _id: { $in: ids } }, { [key]: value });
        res.json({
            code: 200,
            message: "Update status successfully",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Update status failed",
        });
    }
});
exports.changeMulti = changeMulti;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const title = req.body.title;
        const status = req.body.status;
        const task = new task_model_1.default({
            title: title,
            status: status,
        });
        yield task.save();
        res.json({
            code: 200,
            message: "Create task successfully",
            task: task,
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Create task failed",
        });
    }
});
exports.create = create;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield task_model_1.default.updateOne({ _id: id }, req.body);
        res.json({
            code: 200,
            message: "Update task successfully",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Update task failed",
        });
    }
});
exports.edit = edit;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield task_model_1.default.updateOne({ _id: id }, { deleted: true, deletedAt: Date.now() });
        res.json({
            code: 200,
            message: "Delete task successfully",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Delete task failed",
        });
    }
});
exports.deleteTask = deleteTask;

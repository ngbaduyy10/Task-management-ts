"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.login = exports.register = void 0;
const md5_1 = __importDefault(require("md5"));
const generate = __importStar(require("../../../helpers/generate.helper"));
const user_model_1 = __importDefault(require("../models/user.model"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    req.body.password = (0, md5_1.default)(req.body.password);
    req.body.userToken = generate.token(20);
    const emailExist = yield user_model_1.default.findOne({ email: email }, null, { lean: true });
    if (!emailExist) {
        const user = new user_model_1.default(req.body);
        yield user.save();
        res.json({
            code: 200,
            message: 'User registered successfully',
            userToken: user.userToken,
        });
    }
    else {
        res.json({
            code: 400,
            message: 'Email already exists',
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const user = yield user_model_1.default.findOne({ email: email }, null, { lean: true });
    if (user) {
        if (user['password'] === (0, md5_1.default)(req.body.password)) {
            res.json({
                code: 200,
                message: 'Login successfully',
                userToken: user['userToken'],
            });
        }
        else {
            res.json({
                code: 400,
                message: 'Password is incorrect',
            });
        }
    }
    else {
        res.json({
            code: 400,
            message: 'Email not found',
        });
    }
});
exports.login = login;

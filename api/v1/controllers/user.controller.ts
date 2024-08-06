import { Request, Response } from 'express';
import md5 from "md5";
import * as generate from '../../../helpers/generate.helper';
import User from '../models/user.model';

export const register = async (req: Request, res: Response) => {
    const email: string = req.body.email;
    req.body.password = md5(req.body.password);
    req.body.userToken = generate.token(20);

    const emailExist = await User.findOne({ email: email }, null, { lean: true });
    if (!emailExist) {
        const user = new User(req.body);
        await user.save();
        res.json({
            code: 200,
            message: 'User registered successfully',
            userToken: user.userToken,
        });
    } else {
        res.json({
            code: 400,
            message: 'Email already exists',
        })
    }
}

export const login = async (req: Request, res: Response) => {
    const email: string = req.body.email;
    const user = await User.findOne({ email: email }, null, { lean: true });
    if (user) {
        if (user['password'] === md5(req.body.password)) {
            res.json({
                code: 200,
                message: 'Login successfully',
                userToken: user['userToken'],
            });
        } else {
            res.json({
                code: 400,
                message: 'Password is incorrect',
            });
        }
    } else {
        res.json({
            code: 400,
            message: 'Email not found',
        });
    }
}

import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';

export const authRequired = async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        const user = await User.findOne(
            { userToken: token },
            null,
            { lean: true}
        ).select('id fullName email');
        if (user) {
            req['user'] = user;
            next();
        } else {
            res.json({
                code: 400,
                message: 'User does not exist',
            })
        }
    } else {
        res.json({
            code: 400,
            message: 'Please login',
        })
    }
}
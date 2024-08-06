import { Express } from 'express';
import { taskRoutes } from './task.route';
import { userRoutes } from './user.route';
import * as authMiddleware from "../middlewares/auth.middleware";

const routesVer1 = (app: Express) => {
    const version = '/api/v1';
    app.use(version + '/task', authMiddleware.authRequired, taskRoutes);

    app.use(version + '/user', userRoutes)
}

export default routesVer1;
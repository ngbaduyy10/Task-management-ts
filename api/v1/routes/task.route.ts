import {Router} from 'express';
const router: Router = Router();
import * as taskController from '../controllers/task.controller';

router.get('/', taskController.index);

router.patch('/changeStatus/:id', taskController.changeStatus);

router.patch('/changeMulti', taskController.changeMulti);

router.post('/create', taskController.create);

router.patch('/edit/:id', taskController.edit);

router.patch('/delete/:id', taskController.deleteTask);

export const taskRoutes: Router = router;
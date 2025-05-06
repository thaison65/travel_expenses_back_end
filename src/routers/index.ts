import { Application } from 'express';
import userRouter from './user.route';

const route = (app: Application): void => {
	app.use('/api/users', userRouter);
};

export default route;

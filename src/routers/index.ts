import { Application } from 'express';
import homeRouter from './home.route';

const route = (app: Application): void => {
	app.use('/home', homeRouter);
};

export default route;

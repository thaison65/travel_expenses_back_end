import express from 'express';
import homeRouter from './routers/home.route';

const app = express();

app.use(express.json());
app.use('/home', homeRouter);

const BASE_PORT = process.env.PORT || 3000;

app.listen(BASE_PORT, () => {
	console.log(`Server is running on http://localhost:${BASE_PORT}`);
});

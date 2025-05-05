import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
import { config } from './config';

import route from './routers';
import { connect } from './config/db';

const app = express();
app.use(
	session({
		resave: false,
		saveUninitialized: true,
		secret: 'SECRET',
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// parse phần thân của request dưới dạng JSON
app.use(express.json());
app.use(
	cors({
		origin: ['localhost:3000'], // chỉ cho phép truy cập từ nguồn này
		methods: ['GET', 'POST', 'PUT', 'DELETE'], // cho phép các phương thức này
		allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Language'], // cho phép các header này
	})
);

// HTTP logger dùng để không gõ lại lệnh npm start hay vì node index.js
app.use(morgan('combined'));

route(app); // Đường dẫn router đối tác

//Cấu hình serialize/deserialize cho Passport
//Xác định cách Passport lưu trữ người dùng vào session (serialize)
//Và cách lấy lại dữ liệu người dùng từ session (deserialize)
passport.serializeUser(function (user, cb) {
	cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
	cb(null, obj as any);
});

app.listen(config.port, async () => {
	await connect();

	console.log(`Server is running on http://localhost:${config.port}`);
	console.log(`${config.env}`);
});

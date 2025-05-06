// src/controllers/user.controller.ts
import { NextFunction, Request, Response } from 'express';
import { getUsers, getUserById, createUser } from '../services/user.service';
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';

import { ApiError } from '../common/errors/ApiError';
import { ErrorCodes } from '../common/errors/error-codes';
import { validatePassword } from '../helpers';
import { use } from 'passport';

export const getAll = async (req: Request, res: Response) => {
	const users = await getUsers();
	res.json({ data: users, message: 'Get all users', status: 200 });
};

export const getById = async (req: Request, res: Response) => {
	const id = req.params.id;
	const user = await getUserById(id);
	res.json({ data: user, message: 'Get user', status: 200 });
};

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { name, username, password, image_url } = req.body;

		if (!name || !username || !password) {
			return next(
				new ApiError(ErrorCodes.BAD_REQUEST, {
					field: 'Kiểm tra lại thông tin còn nào bị thiếu hoặc có ký tự không cho phép',
				})
			);
		}

		if (username.length < 3 || username.length > 20) {
			return next(
				new ApiError(ErrorCodes.WRONG_USERNAME_FORMAT, { field: 'username sai định dạng' })
			);
		}

		if (username.toLowerCase().includes('admin')) {
			return next(new ApiError(ErrorCodes.NOT_SET_ADMIN, { field: 'username' }));
		}

		if (!validatePassword(password)) {
			return next(new ApiError(ErrorCodes.WRONG_PASSWORD_FORMAT, { field: 'password' }));
		}

		const hashedPassword = await bcrypt.hash(
			password,
			parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '')
		);

		const randomId = v4();

		const data = { id: randomId, name, username, password: hashedPassword, image_url };
		await createUser(data);

		res.status(201).json({ message: 'User created', status: 201 });
	} catch (error) {
		next(error); // Gửi đến error-handling middleware
	}
};

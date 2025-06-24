// src/middleware/authenticateToken.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../common/errors/ApiError';
import { ErrorCodes } from '../common/errors/error-codes';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

	if (!token) return next(new ApiError(ErrorCodes.UNAUTHORIZED)); // Unauthorized

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
		if (err) return next(new ApiError(ErrorCodes.FORBIDDEN)); // Token invalid or expired

		// @ts-ignore
		req.user = user; // Attach user to request
		next();
	});
};

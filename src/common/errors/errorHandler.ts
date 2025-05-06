// errorHandler.ts

import { Request, Response, NextFunction } from 'express';
import { ApiError } from './ApiError';

export const errorHandler = (
	err: Error | ApiError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof ApiError) {
		res.status(err.status).json({
			code: err.code,
			message: err.message,
			details: err.details || null,
			status: err.status,
		});
	} else {
		res.status(500).json({
			code: 'ERR_UNKNOWN',
			message: err.message || 'Internal server error',
			status: 500,
		});	
	}
};

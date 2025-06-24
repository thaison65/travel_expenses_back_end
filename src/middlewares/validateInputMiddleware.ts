import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../common/errors/ApiError';
import { ErrorCodes } from '../common/errors/error-codes';

const forbiddenPattern = /[<>/"'`\\;%(){}\[\]=+]/g; // có thể điều chỉnh

function isString(value: unknown): value is string {
	return typeof value === 'string';
}

function hasInvalidCharacters(value: string): boolean {
	return forbiddenPattern.test(value);
}

export function validateInputMiddleware(req: Request, res: Response, next: NextFunction) {
	const invalidFields: string[] = [];

	// Duyệt qua các key trong req.body
	for (const [key, value] of Object.entries(req.body)) {
		if (isString(value) && hasInvalidCharacters(value)) {
			invalidFields.push(key);
		}
	}

	if (invalidFields.length > 0) {
		return next(
			new ApiError(ErrorCodes.BAD_REQUEST, {
				field: 'Kiểm tra lại thông tin còn nào bị thiếu hoặc có ký tự không cho phép',
			})
		);
	}

	next();
}

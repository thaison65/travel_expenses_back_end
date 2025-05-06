// ApiError.ts

import { ErrorCode } from './error-codes';

export class ApiError extends Error {
	public readonly code: string;
	public readonly status: number;
	public readonly details?: any;

	constructor(errorCode: ErrorCode, details?: any) {
		super(errorCode.message);
		this.code = errorCode.code;
		this.status = errorCode.status;
		this.details = details;

		// Maintains proper stack trace
		Object.setPrototypeOf(this, new.target.prototype);
		Error.captureStackTrace(this, this.constructor);
	}
}

// error-codes.ts

export interface ErrorCode {
	code: string;
	message: string;
	status: number;
}

export const ErrorCodes = {
	BAD_REQUEST: {
		code: 'ERR_400',
		message: 'Yêu cầu không hợp lệ',
		status: 400,
	},
	UNAUTHORIZED: {
		code: 'ERR_401',
		message: 'Chưa xác thực',
		status: 401,
	},
	FORBIDDEN: {
		code: 'ERR_403',
		message: 'Không có quyền truy cập',
		status: 403,
	},
	NOT_FOUND: {
		code: 'ERR_404',
		message: 'Không tìm thấy',
		status: 404,
	},
	NOT_SET_ADMIN: {
		code: 'ERR_NOT_SET_ADMIN',
		message: 'Người dùng không phải là admin',
		status: 405,
	},
	WRONG_PASSWORD_FORMAT: {
		code: 'ERR_WRONG_PASSWORD_FORMAT',
		message: 'Mật khẩu không hợp lệ',
		status: 406,
	},
	WRONG_USERNAME_FORMAT: {
		code: 'ERR_WRONG_USERNAME_FORMAT',
		message: 'Tên tài khoản không hợp lệ',
		status: 407,
	},
	USERNAME_ALREADY_EXISTS: {
		code: 'ERR_USERNAME_ALREADY_EXISTS',
		message: 'Tài khoản đã tồn tại',
		status: 408,
	},
	INTERNAL_SERVER_ERROR: {
		code: 'ERR_500',
		message: 'Lỗi máy chủ nội bộ',
		status: 500,
	},
	// Thêm các lỗi khác tùy dự án của bạn
} as const;

export type ErrorCodeKey = keyof typeof ErrorCodes;

// logger.ts
import { createLogger, transports, format } from 'winston';

export const logger = createLogger({
	level: 'info',
	format: format.combine(format.timestamp(), format.errors({ stack: true }), format.prettyPrint()),
	transports: [
		new transports.Console(),
		new transports.File({ filename: 'logs/error.log', level: 'error' }),
	],
});

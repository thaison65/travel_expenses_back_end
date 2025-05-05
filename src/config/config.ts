import dotenv from 'dotenv';
import path from 'path';

// Xác định file .env theo NODE_ENV
const envFile = `.env.${process.env.NODE_ENV || 'local'}`;

// Nạp đúng file .env.<env>
dotenv.config({ path: path.resolve(__dirname, `../../${envFile}`) });

export const config = {
	port: process.env.BASE_PORT || 3000,
	env: process.env.NODE_ENV || 'local',
	dbUrl: process.env.DATABASE_URL || '',
};

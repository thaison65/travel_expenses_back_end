// src/models/user.model.ts
import { pool } from '../config/db';
import { UserType } from '../types';

export const getAllUsers = async () => {
	const [rows] = await pool.query('SELECT * FROM user');
	return rows;
};

export const getUserById = async (id: string) => {
	const [rows] = await pool.query('SELECT * FROM user WHERE id = ?', [id]);
	return (rows as any[])[0];
};

export const getUserByUsername = async (username: string) => {
	const [rows] = await pool.query('SELECT id, username, password FROM user WHERE username = ?', [
		username,
	]);
	return (rows as any[])[0];
};

export const createUser = async (data: UserType) => {
	const { id, name, username, password, image_url } = data;
	const [result] = await pool.query(
		'INSERT INTO user (id,name, username, password, image_url) VALUES (?, ?, ?, ?, ?)',
		[id, name, username, password, image_url]
	);
	return result;
};

export const updateUser = async (data: { id: string; name: string; image_url: string }) => {
	const { name, id, image_url } = data;

	const [result] = await pool.query('UPDATE user SET name = ?, image_url = ? WHERE id = ?', [
		name,
		image_url,
		id,
	]);
	return result;
};

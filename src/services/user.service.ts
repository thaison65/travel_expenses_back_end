// src/services/user.service.ts
import * as userModel from '../models/user.model';
import { UserType } from '../types';

export const getUsers = () => userModel.getAllUsers();

export const getUserById = (id: string) => userModel.getUserById(id);

export const getUserByUsername = (username: string) => userModel.getUserByUsername(username);

export const createUser = (data: UserType) => userModel.createUser(data);

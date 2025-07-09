import { CreateUserDto } from "../interface/user.interface";
import User, { IUser } from "../model/user.model";

export const createUser = async (userData: CreateUserDto): Promise<IUser> => {
  // Default role to 'user' if not provided
  const userWithRole = { ...userData, role: userData.role || 'user' };
  const user = new User(userWithRole);
  return await user.save();
};

export const getUsers = async (): Promise<IUser[]> => {
  return await User.find().select('+password');
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id).select('-password');
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email });
};
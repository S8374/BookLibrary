import bcrypt from 'bcryptjs'; 
import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import { validationResult } from 'express-validator';
import httpStatus from 'http-status';
import { CreateUserDto } from '../interface/user.interface';
import User from '../model/user.model';

export const registerUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
    }

    try {
        const userData: CreateUserDto = req.body;
        const existingUser = await userService.getUserByEmail(userData.email);

        if (existingUser) {
            return res.status(httpStatus.CONFLICT).json({ message: 'Email already in use' });
        }

        const user = await userService.createUser(userData);
        const { password, ...userWithoutPassword } = user.toObject();
     
        res.status(httpStatus.CREATED).json({
            success: true,
            message: 'User registered successfully',
            data: userWithoutPassword,
        });
    } catch (error: any) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message || 'Registration failed',
        });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getUsers();
        res.status(httpStatus.OK).json({
            success: true,
            data: users,
        });
    } catch (error: any) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message || 'Failed to fetch users',
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const { password: _, ...userWithoutPassword } = user.toObject();

    // Optionally generate JWT here

    return res.status(httpStatus.OK).json({
      success: true,
      message: 'Login successful',
      data: userWithoutPassword,
      
    });
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || 'Login failed',
    });
  }
};
import express from 'express';
import { body } from 'express-validator';
import { getAllUsers, loginUser, registerUser } from '../controller/user.controller';

const router = express.Router();

router.post(
  '/register',
  [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  registerUser
);
router.post('/login', loginUser);
router.get('/', getAllUsers);

export default router;
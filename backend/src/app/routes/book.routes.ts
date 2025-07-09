import express from 'express';
import { body } from 'express-validator';
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from '../controller/book.controller';

const router = express.Router();

router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('price').isNumeric().withMessage('Valid price is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('format').isArray().withMessage('Format must be an array'),
    body('imageUrl').notEmpty().withMessage('Image URL is required'),
  ],
  createBook
);

router.get('/', getBooks);
router.get('/:id', getBookById);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;
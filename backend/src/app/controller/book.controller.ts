import { Request, Response } from 'express';
import * as bookService from '../services/book.service';
import { validationResult } from 'express-validator';
import httpStatus from 'http-status';
import { CreateBookDto } from '../interface/book.interface';

export const createBook = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
  }

  try {
    const bookData: CreateBookDto = req.body;
    const book = await bookService.createBook(bookData);
    
    res.status(httpStatus.CREATED).json({
      success: true,
      message: 'Book created successfully',
      data: book,
    });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || 'Failed to create book',
    });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await bookService.getBooks();
    res.status(httpStatus.OK).json({
      success: true,
      data: books,
    });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || 'Failed to fetch books',
    });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    if (!book) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Book not found',
      });
    }
    res.status(httpStatus.OK).json({
      success: true,
      data: book,
    });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || 'Failed to fetch book',
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await bookService.updateBook(req.params.id, req.body);
    if (!book) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Book not found',
      });
    }
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Book updated successfully',
      data: book,
    });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || 'Failed to update book',
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await bookService.deleteBook(req.params.id);
    if (!book) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Book not found',
      });
    }
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Book deleted successfully',
    });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || 'Failed to delete book',
    });
  }
};
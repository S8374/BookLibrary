// borrow.controller.ts
import { Request, Response } from 'express';
import Book from '../model/book.model';
import Borrow from '../model/borrow.model';

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { bookId, quantity, dueDate, userId, userEmail } = req.body;

    // Validate input
    if (!bookId || !quantity || !dueDate || !userId || !userEmail) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (quantity > book.copies) {
      return res.status(400).json({ 
        message: 'Requested quantity exceeds available copies',
        availableCopies: book.copies
      });
    }

    // Update book copies and availability
    const updatedCopies = book.copies - quantity;
    await Book.findByIdAndUpdate(bookId, {
      copies: updatedCopies,
      available: updatedCopies > 0
    });

    // Create borrow record
    const borrow = new Borrow({
      bookId,
      title: book.title,
      isbn: book.isbn,
      quantity,
      dueDate: new Date(dueDate),
      userId,
      userEmail
    });

    await borrow.save();

    res.status(201).json({
      message: 'Book borrowed successfully',
      borrow,
      remainingCopies: updatedCopies
    });
  } catch (error) {
    console.error('Error borrowing book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getBorrowSummary = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $lookup: {
          from: 'books',
          localField: 'bookId',
          foreignField: '_id',
          as: 'bookDetails'
        }
      },
      {
        $unwind: '$bookDetails'
      },
      {
        $group: {
          _id: '$bookId',
          title: { $first: '$title' },
          isbn: { $first: '$isbn' },
          totalQuantity: { $sum: '$quantity' },
          borrows: {
            $push: {
              userEmail: '$userEmail',
              quantity: '$quantity',
              dueDate: '$dueDate',
              borrowedAt: '$borrowedAt'
            }
          }
        }
      },
      {
        $project: {
          bookId: '$_id',
          title: 1,
          isbn: 1,
          totalQuantity: 1,
          borrows: 1,
          _id: 0
        }
      }
    ]);

    res.status(200).json(summary);
  } catch (error) {
    console.error('Error fetching borrow summary:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
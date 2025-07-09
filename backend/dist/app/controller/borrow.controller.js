"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowSummary = exports.borrowBook = void 0;
const book_model_1 = __importDefault(require("../model/book.model"));
const borrow_model_1 = __importDefault(require("../model/borrow.model"));
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId, quantity, dueDate, userId, userEmail } = req.body;
        // Validate input
        if (!bookId || !quantity || !dueDate || !userId || !userEmail) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        if (quantity <= 0) {
            return res.status(400).json({ message: 'Quantity must be at least 1' });
        }
        const book = yield book_model_1.default.findById(bookId);
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
        yield book_model_1.default.findByIdAndUpdate(bookId, {
            copies: updatedCopies,
            available: updatedCopies > 0
        });
        // Create borrow record
        const borrow = new borrow_model_1.default({
            bookId,
            title: book.title,
            isbn: book.isbn,
            quantity,
            dueDate: new Date(dueDate),
            userId,
            userEmail
        });
        yield borrow.save();
        res.status(201).json({
            message: 'Book borrowed successfully',
            borrow,
            remainingCopies: updatedCopies
        });
    }
    catch (error) {
        console.error('Error borrowing book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.borrowBook = borrowBook;
const getBorrowSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.default.aggregate([
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
    }
    catch (error) {
        console.error('Error fetching borrow summary:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getBorrowSummary = getBorrowSummary;

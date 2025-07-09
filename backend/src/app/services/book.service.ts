import { CreateBookDto, UpdateBookDto } from '../interface/book.interface';
import Book from '../model/book.model';

export const createBook = async (bookData: CreateBookDto) => {
  const book = new Book(bookData);
  console.log('bookdata',book);
  return await book.save();
};

export const getBooks = async () => {
  return await Book.find().sort({ createdAt: -1 });
};

export const getBookById = async (id: string) => {
  return await Book.findById(id);
};

export const updateBook = async (id: string, bookData: UpdateBookDto) => {
  return await Book.findByIdAndUpdate(id, bookData, { new: true });
};

export const deleteBook = async (id: string) => {
  return await Book.findByIdAndDelete(id);
};
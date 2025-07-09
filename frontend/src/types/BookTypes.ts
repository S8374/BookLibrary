export interface Book {
  _id?: string;
  title: string;
  author: string;
  description: string;
  copies:number;
  price: number;
  rating?: number;
  publisher?: string;
  year?: number;
  category: string;
  pages?: number;
  isbn?: string;
  format: string[]; // must be array
  imageUrl: string; // set by imgbb upload
  createdAt?: Date;
  updatedAt?: Date;
}
// borrow.dto.ts
export interface BorrowBookDto {
  bookId: string;
  quantity: number;
  dueDate: Date;
}

export interface BorrowSummaryDto {
  bookId: string;
  title: string;
  isbn?: string;
  totalQuantity: number;
}
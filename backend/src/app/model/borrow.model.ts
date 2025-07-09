// borrow.model.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IBorrow extends Document {
  bookId: mongoose.Types.ObjectId;
  title: string;
  isbn?: string;
  quantity: number;
  dueDate: Date;
  borrowedAt: Date;
  userId: mongoose.Types.ObjectId;
  userEmail: string;
}

const BorrowSchema: Schema = new Schema({
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  title: { type: String, required: true },
  isbn: { type: String },
  quantity: { type: Number, required: true, min: 1 },
  dueDate: { type: Date, required: true },
  borrowedAt: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userEmail: { type: String, required: true }
});

export default mongoose.model<IBorrow>('Borrow', BorrowSchema);
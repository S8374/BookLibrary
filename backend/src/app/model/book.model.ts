import mongoose, { Document, Schema } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  description: string;
  price: number;
  rating?: number;
  publisher?: string;
  year?: number;
  copies?: number;
  category: string;
  pages?: number;
  isbn?: string;
  format: string[];
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const BookSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, min: 0, max: 5 },
    publisher: { type: String },
    year: { type: Number },
    copies: { type: Number, required: true, min: 0, default: 1 },
    category: { type: String, required: true },
    pages: { type: Number },
    isbn: { type: String },
    format: { type: [String], required: true },
    imageUrl: { type: String, required: true },
    available: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model<IBook>('Book', BookSchema);
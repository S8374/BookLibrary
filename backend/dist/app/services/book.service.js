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
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getBooks = exports.createBook = void 0;
const book_model_1 = __importDefault(require("../model/book.model"));
const createBook = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    const book = new book_model_1.default(bookData);
    console.log('bookdata', book);
    return yield book.save();
});
exports.createBook = createBook;
const getBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield book_model_1.default.find().sort({ createdAt: -1 });
});
exports.getBooks = getBooks;
const getBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield book_model_1.default.findById(id);
});
exports.getBookById = getBookById;
const updateBook = (id, bookData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield book_model_1.default.findByIdAndUpdate(id, bookData, { new: true });
});
exports.updateBook = updateBook;
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield book_model_1.default.findByIdAndDelete(id);
});
exports.deleteBook = deleteBook;

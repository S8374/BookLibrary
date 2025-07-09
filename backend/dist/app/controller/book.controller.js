"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const bookService = __importStar(require("../services/book.service"));
const express_validator_1 = require("express-validator");
const http_status_1 = __importDefault(require("http-status"));
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(http_status_1.default.BAD_REQUEST).json({ errors: errors.array() });
    }
    try {
        const bookData = req.body;
        const book = yield bookService.createBook(bookData);
        res.status(http_status_1.default.CREATED).json({
            success: true,
            message: 'Book created successfully',
            data: book,
        });
    }
    catch (error) {
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message || 'Failed to create book',
        });
    }
});
exports.createBook = createBook;
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield bookService.getBooks();
        res.status(http_status_1.default.OK).json({
            success: true,
            data: books,
        });
    }
    catch (error) {
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message || 'Failed to fetch books',
        });
    }
});
exports.getBooks = getBooks;
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield bookService.getBookById(req.params.id);
        if (!book) {
            return res.status(http_status_1.default.NOT_FOUND).json({
                success: false,
                message: 'Book not found',
            });
        }
        res.status(http_status_1.default.OK).json({
            success: true,
            data: book,
        });
    }
    catch (error) {
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message || 'Failed to fetch book',
        });
    }
});
exports.getBookById = getBookById;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield bookService.updateBook(req.params.id, req.body);
        if (!book) {
            return res.status(http_status_1.default.NOT_FOUND).json({
                success: false,
                message: 'Book not found',
            });
        }
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'Book updated successfully',
            data: book,
        });
    }
    catch (error) {
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message || 'Failed to update book',
        });
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield bookService.deleteBook(req.params.id);
        if (!book) {
            return res.status(http_status_1.default.NOT_FOUND).json({
                success: false,
                message: 'Book not found',
            });
        }
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'Book deleted successfully',
        });
    }
    catch (error) {
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message || 'Failed to delete book',
        });
    }
});
exports.deleteBook = deleteBook;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const book_controller_1 = require("../controller/book.controller");
const router = express_1.default.Router();
router.post('/', [
    (0, express_validator_1.body)('title').notEmpty().withMessage('Title is required'),
    (0, express_validator_1.body)('author').notEmpty().withMessage('Author is required'),
    (0, express_validator_1.body)('description').notEmpty().withMessage('Description is required'),
    (0, express_validator_1.body)('price').isNumeric().withMessage('Valid price is required'),
    (0, express_validator_1.body)('category').notEmpty().withMessage('Category is required'),
    (0, express_validator_1.body)('format').isArray().withMessage('Format must be an array'),
    (0, express_validator_1.body)('imageUrl').notEmpty().withMessage('Image URL is required'),
], book_controller_1.createBook);
router.get('/', book_controller_1.getBooks);
router.get('/:id', book_controller_1.getBookById);
router.put('/:id', book_controller_1.updateBook);
router.delete('/:id', book_controller_1.deleteBook);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./app/routes/user.routes"));
const book_routes_1 = __importDefault(require("./app/routes/book.routes"));
const borrow_routes_1 = __importDefault(require("./app/routes/borrow.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(express_1.default.json());
app.use('/user', user_routes_1.default);
app.use('/books', book_routes_1.default);
app.use('/borrow', borrow_routes_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to Library Management');
});
exports.default = app;
// mvc - model  , controller

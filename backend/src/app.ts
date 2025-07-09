import express, { Application, Request, Response } from 'express';
import cors from "cors";
import userRoutes from './app/routes/user.routes';
import bookRoutes from './app/routes/book.routes';
import borrowRoutes from './app/routes/borrow.routes';

const app: Application = express();

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use('/user', userRoutes);
app.use('/books', bookRoutes);
app.use('/borrow', borrowRoutes);
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Library Management');
});

export default app;

// mvc - model  , controller
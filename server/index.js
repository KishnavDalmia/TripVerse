import express from 'express';
import authRouter from './routes/auth.route.js';
import tripRouter from './routes/trip.route.js';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use('/api/auth', authRouter);
app.use('/api/trips', tripRouter);


app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);       
});
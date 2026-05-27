import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import authRouter from './routes/auth.route.js';
import tripRouter from './routes/trip.route.js';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// API routes
app.use('/api/auth', authRouter);
app.use('/api/trips', tripRouter);

// Health check — used by Docker HEALTHCHECK and monitoring
app.get('/api/auth/ping', (_req, res) => {
    res.json({ status: 'ok', timestamp: Date.now() });
});

// ---- Production: serve built client ----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(clientDistPath));

    // Catch-all: serve index.html for client-side routing (React Router)
    app.get('*', (_req, res) => {
        res.sendFile(path.join(clientDistPath, 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
});

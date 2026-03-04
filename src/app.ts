import express, { Application } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import router from './routes/app/v1.routes';
import adminRouter from './routes/admin/v1';

dotenv.config();

// Connect to MongoDB
connectDB();

const app: Application = express();

app.use(express.json());
app.use('/public', express.static('public'));

// app
app.use('/api/v1', router);

// admin
app.use("/admin/v1", adminRouter);


export default app;
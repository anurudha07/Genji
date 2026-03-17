import express, { Application } from 'express';
import { connectDB } from './config/db';
import router from './route/app/v1.route';
import adminRouter from './route/admin/v1.admin.route';

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
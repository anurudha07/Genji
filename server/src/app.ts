import express, { Application } from 'express';
import { connectDB } from './config/db';
import router from './route/app/v1';
import adminRouter from './route/admin/v1';
import cors from "cors";

// Connect to MongoDB
connectDB();

const app: Application = express();

app.use(express.json());
app.use('/public', express.static('public'));


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// app
app.use('/api/v1', router);

// admin
app.use("/admin/v1", adminRouter);


export default app;
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './lib/db.js';
import UserRoutes from './routes/user.rotues.js';
import AdminRoutes from "./routes/admin.routes.js"
import {app,server} from "./lib/socket.js"
import startCron from './lib/cron.js';
import fileUpload from 'express-fileupload';
import path from 'path';

dotenv.config();

const port = process.env.PORT || 5000;
const __dirname = path.resolve();
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser())
app.use(cors({origin: "http://localhost:5173",credentials: true,}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
    limits: { 
      fileSize: 50 * 1024 * 1024, // 50MB
      files: 1  // Limit to one file
    },
    abortOnLimit: true,
    responseOnLimit: 'File size limit exceeded'
  }));

startCron();

app.use("/api/user",UserRoutes);
app.use("/api/admin",AdminRoutes)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'../Frontend/dist')));
    app.get('*',(req,res) => {
        res.sendFile(path.join(__dirname,"../Frontend","dist","index.html"));
    })
}

server.listen(port,() => {
    console.log(`Server is running on port ${port}`);
    connectDB();
});
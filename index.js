import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import { checkUser } from './middleware/authMiddleware.js';
import cookieParser from 'cookie-parser';

dotenv.config();

if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI is not defined in your .env file.');
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 4000;

console.log('Mongo URI:', process.env.MONGO_URI);

const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI).then(() => app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
}))
.catch((err) => console.log(err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,             
  saveUninitialized: true    
}));
app.use(cookieParser());

// Middleware to check user on all routes
 app.use(checkUser);
app.use(authRoutes);
app.use(blogRoutes);
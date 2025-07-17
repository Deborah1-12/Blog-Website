import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import { checkUser } from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
import "./config/passportConfig.js";
import { connectDB } from "./config/dbConfig.js";
import  passport  from "passport";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 4000;

//connect to db
connectDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Middleware to check user on all routes
app.use(checkUser);
app.use("/auth", authRoutes);
app.use(blogRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

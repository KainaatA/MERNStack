import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import autoExamRoutes from "./routes/autoExamRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import examRoutes from "./routes/examRoutes.js";
import feedbackRouter from "./routes/feedbackRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import instructorRoutes from "./routes/instructorRoutes.js";
import plagiarismRoutes from "./routes/plagiarismRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config({ path: "./config.env" });
const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(
  session({
    secret: "edu-app",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use("/api/instructor", instructorRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/class", classRoutes);
app.use("/api/exam", examRoutes);
app.use("/api/autoexam", autoExamRoutes);
app.use("/api/group", groupRoutes);
app.use("/api/feedback", feedbackRouter);
app.use("/api/plagiarism", plagiarismRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;

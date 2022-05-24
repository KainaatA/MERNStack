import express from "express";
import {
  addPlagiarism,
  getPlagiarism,
} from "../controllers/plagiarismController.js";

const router = express.Router();

router.post("/add-plagiarism", addPlagiarism);
router.get("/get-plagiarisms", getPlagiarism);

export default router;

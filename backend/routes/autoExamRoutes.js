import express from 'express';
import { 
    generateAutoExam,
    getExams
}  from "../controllers/autoExamController.js";
import { protect, iadmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
.post(generateAutoExam)
.get(getExams);

export default router;
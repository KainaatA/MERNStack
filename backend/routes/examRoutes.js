import express from 'express';
import { 
  createExam,
  getExamsById,
  getExam,
  make_exam, 
  fetch_exams,
  save_attempt,
  getAllExam
}  from "../controllers/examController.js";
import { protect, iadmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/make-exam')
.post(make_exam)

router.route('/list-exam')
.post(fetch_exams)

router.route('/save-attempt')
.post(save_attempt)

router.route('/create-exam')
.post(createExam)

router.route('/take-exam')
.get(getExam);

router.route('/get-all-exam')
.get(getAllExam);


router.route('/:id')
.get(protect, iadmin, getExamsById)

// Add route for create exam here

export default router;
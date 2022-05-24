import express from 'express';
import { 
    authInstructor,
  registerInstructor,
  getInstructors,
  getInstructorById,
  updateInstructor,
  
}  from "../controllers/instructorController.js";
import { protect, iadmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/add-instructor')
.post(registerInstructor)
.get(protect, iadmin ,getInstructors)

router.route('/login')
.post(authInstructor);

router.route('/all-instructors')
.get(getInstructors) // protect, admin


router.route('/:id/')
.get(getInstructorById)
.put(updateInstructor)

router.route('/:instrutorId/group')

export default router;
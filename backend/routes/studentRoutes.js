import express from 'express';
import { 
    authStudent,
    registerStudent,
    getStudents,
    deleteStudent,
    getStudentById,
    updateStudent,
    resizeUserPhoto,
    uploadUserPhoto
    
}  from "../controllers/studentController.js";
import { protect, sadmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/add-student')
.post(uploadUserPhoto, resizeUserPhoto,registerStudent)
// .get(getStudents); // protect, admin

router.route('/all-students')
.get(getStudents) // protect, admin


router.route('/students-group')
.get(getStudents) // protect, admin

router.route('/login')
.post(authStudent);

// router.route('/edit-profile')
// .post(updateStudent)

router.route('/:id')
.delete(deleteStudent)
.get(getStudentById)
.put(updateStudent)


export default router;
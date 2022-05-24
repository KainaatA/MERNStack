import express from 'express';
import { 
    joinGroup,
    getAllStudents
}  from "../controllers/groupController.js";

const router = express.Router();

router.route('/join-group')
.post(joinGroup)

router.route('/join-students')
.get(getAllStudents)



export default router;
import express from 'express';
import { 
    registerClass,
  getClassProfile,
  updateClassProfile,
  getClass,
  getClassById,
}  from "../controllers/classController.js";
import { protect, sadmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/new-group')
.post(registerClass)
.get(getClass); //protect, admin ,

router.route('/class-profile')
.get(protect ,getClassProfile)
.put(protect ,updateClassProfile);

router.route('/:id')
.get(protect, sadmin, getClassById)


export default router;
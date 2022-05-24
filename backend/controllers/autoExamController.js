import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import AutoExam from '../models/autoExamModel.js';

// @desc    Register a new auto exam
// @route   POST /api/autoexam
// @access  Public
const generateAutoExam = asyncHandler(async (req, res) => {
  const { examArray, options , correctOption, marks,  id_E} = req.body

  const autoexam = await AutoExam.create({
    // Question, Option1, Option2, Option3,Option4, correctOption, 
    id_E, 
    examArray, 
    options,
    correctOption,
    marks 

  })

  if (autoexam) {
    res.status(201).json({
      _id: autoexam._id,
      id_E: autoexam.id_E,
      examArray: autoexam.examArray,
      options: autoexam.options,
      correctOption: autoexam.correctOption,
      marks: autoexam.marks,
      // Option4: autoexam.Option4,
      // correctOption: autoexam.correctOption,
      // isAdmin: autoexam.isAdmin,
    })
  } else {
    res.status(400)
    throw new Error('Invalid auto exam data')
  }
})

// @desc    Get all users
// @route   GET /api/autoexam
// @access  Private/Admin
const getExams = asyncHandler(async (req, res) => {
  const autoexam = await AutoExam.find({})
  res.json(autoexam)
})


export {
  generateAutoExam,
  getExams
}
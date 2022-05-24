import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import Exam from '../models/examModel.js';
import Questionnaire from '../models/QuestionnaireModel.js';
import mongoose from 'mongoose';
import Attempt from '../models/AttemptModel.js';

// Add the business logic here
// @desc    Save the exam in database
// @route   POST /api/make-exam
// @access  Private
const make_exam = asyncHandler(async (req, res) => {
  let questionnaire = req.body
  let questionnaire_id = Math.floor(Math.random() * 10000)
  questionnaire.questionnaire.questionnaire_id = questionnaire_id
  const DB = 'mongodb+srv://hamzaali:HVQRumv4BZ5Axf3Z@cluster0.rkpc2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
  mongoose.connect(DB)
  const data = new Questionnaire(questionnaire.questionnaire)
  data.save().then(() => console.log('Data is saved'))
  res.status(201)
})

const fetch_exams = asyncHandler(async (req, res) => {
  let studentId = req.body.studentId
  Attempt.find({student:studentId}, function(err, attp){
    if(err){
      console.log(err);
      return
    } else{
      let q_ids = Array()
      attp.map((item, index) => {
        q_ids.push(item.questionnaire_id)
      })
      q_ids = [...new Set(q_ids)]

      Questionnaire.find({ questionnaire_id: { $nin: q_ids } }, function(err, qs){
        if(err){
          console.log(err);
          return
        } else{
          res.json({
            data: qs
          })
        }
      }) 
      
    }
  })      
  
})

const save_attempt = asyncHandler(async (req, res) => {
  let attempt = req.body
  const data = new Attempt(attempt.attempt)
  data.save().then(() => console.log('Attempt is saved'))
  res.status(201)
})
// @desc    Register a new Exam Name
// @route   POST /api/exam
// @access  Public
const createExam = asyncHandler(async (req, res) => {
  
  const exams = await Exam.create(req.body)

  if (exams) {
    res.status(201).json({
      _id: exams._id,
      EName: exams.EName,
      E_Type: exams.E_Type,
      E_Check: exams.E_Check,
      File_Type: exams.File_Type,
      Date: exams.E_Type,
      Time: exams.Time,
      Status: exams.Status,
      class: exams.class,
      student: exams.student,
      cretedAt: exams.CreatedAt,
      // isAdmin: exams.isAdmin,
      token: generateToken(exams._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid exam data')
  }
})

// @desc    Get Exam By Id 
// @route   GET /api/exam/:id
// @access  Private
const getExamsById = asyncHandler(async (req, res) => {
  const exams = await Exam.findById(req.user._id)

  if (exams) {
    res.json({
      _id: exams._id,
      EName: exams.EName,
      E_Type: exams. E_Type,
      Time: exams.Time,
      Status: exams.Status,
      class: exams.class,
      student: exams.student,
      isAdmin: exams.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('Exam not found')
  }
})


// @desc    Get all exam
// @route   GET /api/exam
// @access  Private/Admin
const getExam = asyncHandler(async (req, res) => {
  const exam = await Exam.find({})
  res.json(exam)
})


const getAllExam = asyncHandler(async (req, res)=> {
  const exams = await Exam.find();
  res.json(exams)
})

// @desc    Get user by ID
// @route   GET /api/exam/:id
// @access  Private/Admin
// const getExamById = asyncHandler(async (req, res) => {
//   const cname = await Exam.findById(req.params.id)

//   if (cname) {
//     res.json(cname)
//   } else {
//     res.status(404)
//     throw new Error('User not found')
//   }
// })


export {
  createExam,
  getExamsById,
  getExam,
  make_exam,
  fetch_exams,
  save_attempt,
  getAllExam
}
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import Instructor from '../models/instructorModel.js';


// @desc    Auth instructor & get token
// @route   POST /api/instructor/login
// @access  Public
const authInstructor = asyncHandler(async (req, res) => {
  const { IName, IPassword } = req.body

  const instructor = await Instructor.findOne({ IName })

  if (instructor && (await instructor.matchPassword(IPassword))) {
    res.json({
      _id: instructor._id,
      IName: instructor.IName,
      IEmail: instructor.IEmail,
      INumber: instructor.INumber,
      Rank: instructor.Rank,
      isAdmin: instructor.isAdmin,
      token: generateToken(instructor._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid name or password')
  }
})

// @desc    Register a new instructor
// @route   POST /api/instructor
// @access  Public
const registerInstructor = asyncHandler(async (req, res) => {
  const { IName, IEmail, INumber ,IPassword, Rank, oldPassword } = req.body

  const instructorExists = await Instructor.findOne({ IEmail });

  if (instructorExists) {
    res.status(400)
    throw new Error('Instructor already exists')
  }

  const instructor = await Instructor.create({
    IName,
    IEmail,
    INumber,
    Rank,
    IPassword,
    oldPassword
  })

  if (instructor) {
    res.status(201).json({
      _id: instructor._id,
      IName: instructor.IName,
      IEmail: instructor.IEmail,
      IPassword: instructor.IPassword,
      INumber: instructor.INumber,
      Rank: instructor.Rank,
      oldPassword: instructor.oldPassword,
      isAdmin: instructor.isAdmin,
      token: generateToken(instructor._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid instructor data')
  }
})


// @desc    Get all instructor
// @route   GET /api/instructor
// @access  Private/Admin
const getInstructors = asyncHandler(async (req, res) => {
  const users = await Instructor.find(req.body)
  res.json(users)
})


// @desc    Get user by ID
// @route   GET /api/instructor/:id
// @access  Private/Admin
const getInstructorById = asyncHandler(async (req, res) => {
  const instructor = await Instructor.findById(req.params.id).select('-password')

  if (instructor) {
    res.json(instructor)
  } else {
    res.status(404)
    throw new Error('Instructor not found')
  }
})

// @desc    Update Instructor
// @route   PUT /api/instructor/:id
// @access  Private/Admin

const updateInstructor = asyncHandler(async (req, res) => {
    
  const { oldPassword } = req.body;
  const instructor = await Instructor.findById(req.params.id);

  if (instructor && (await instructor.changePassword(oldPassword))) {
  
    instructor.IName = req.body.IName || instructor.IName
    // instructor.SEmail = req.body.SEmail || instructor.SEmail
      if (req.body.IPassword) {
        instructor.oldPassword = req.body.IPassword
        instructor.IPassword = req.body.IPassword
      }
  
      const updatedInstructor = await instructor.save()
  
      res.json({
         success: "Password Updated",
        _id: updatedInstructor._id,
        IName: updatedInstructor.IName,
        IPassword: updatedInstructor.IPassword,
        oldPassword: updatedInstructor.oldPassword,
        // IEmail: updatedInstructor.IEmail,
        token: generateToken(updatedInstructor._id),
      })

  } else {
    res.status(404)
    throw new Error('Old Password Missing')
  }
});

export {
  authInstructor,
  registerInstructor,
  getInstructors,
  getInstructorById,
  updateInstructor,
}
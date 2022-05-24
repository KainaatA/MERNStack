import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import Group from '../models/groupModel.js';

// @desc    Register a new Class Name
// @route   POST /api/class
// @access  Public
const joinGroup = asyncHandler(async (req, res) => {
  
  const joinStudent = await Group.create(req.body)

  if (joinStudent) {
    res.status(201).json({
      _id: joinStudent._id,
      join: joinStudent.join,
      s_id: joinStudent.s_id,
      token: generateToken(joinStudent._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid class data')
  }
});


// @desc    Get all exam
// @route   GET /api/exam
// @access  Private/Admin
const getAllStudents = asyncHandler(async (req, res) => {
  const joinStudent = await Group.find({})
  res.json(joinStudent)
})

export {
    joinGroup,
    getAllStudents
}
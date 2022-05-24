import asyncHandler from 'express-async-handler'
import Class from '../models/classModel.js'
import generateToken from '../utils/generateToken.js'

// @desc    Register a new Class Name
// @route   POST /api/class
// @access  Public
const registerClass = asyncHandler(async (req, res) => {
  
  const className = await Class.create(req.body)

  if (className) {
    res.status(201).json({
      _id: className._id,
      CName: className.CName,
      s_id: className.s_id,
      id_i: className.id_i,
      token: generateToken(className._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid class data')
  }
})

// @desc    Get class profile
// @route   GET /api/class/profile
// @access  Private
const getClassProfile = asyncHandler(async (req, res) => {
  const className = await Class.findById(req.user._id)

  if (className) {
    res.json({
      _id: className._id,
      CName: className.CName,
      isAdmin: className.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('Class not found')
  }
})

// @desc    Update class profile
// @route   PUT /api/class/profile
// @access  Private
const updateClassProfile = asyncHandler(async (req, res) => {
  const className = await Class.findById(req.user._id)

  if (className) {
    className.CName = req.body.CName || user.CName
    const updatedCN = await className.save()

    res.json({
      _id: updatedCN._id,
      CName: updatedCN.CName,
      isAdmin: updatedCN.isAdmin,
      token: generateToken(updatedCN._id),
    })
  } else {
    res.status(404)
    throw new Error('Class not found')
  }
})

// @desc    Get all class
// @route   GET /api/class
// @access  Private/Admin
const getClass = asyncHandler(async (req, res) => {
  const cname = await Class.find({})
  res.json(cname)
})

// @desc    Get user by ID
// @route   GET /api/class/:id
// @access  Private/Admin
const getClassById = asyncHandler(async (req, res) => {
  const cname = await Class.findById(req.params.id).select('-password')

  if (cname) {
    res.json(cname)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


export {
  registerClass,
  getClassProfile,
  updateClassProfile,
  getClass,
  getClassById,
  
}
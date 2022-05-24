import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import Student from '../models/studentModel.js';
import multer from 'multer';


const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

export const uploadUserPhoto = upload.single('photo');


// File Part
const fileFilter = (req, file, cb) => {
  if(file.mimetype.startsWith('file')) {
    cb(null, true)     
    } else {
      cb(new AppError('Not an pdf! Please upload only pdf file.', 400), false);
    }
  }

const uploadFile = multer({
  storage: multerStorage,
  fileFilter: fileFilter
});

export const uploadUserFile = uploadFile.single('file') 


export const resizeUserPhoto = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});


// @desc    Auth user & get token
// @route   POST /api/students/login
// @access  Public

const authStudent = asyncHandler(async (req, res) => {
  const { SName, SPassword } = req.body
  
  const student = await Student.findOne({ SName })

  if (student && (await student.matchPassword(SPassword))) {
    res.json({
      _id: student._id,
      SName: student.SName ,
      SEmail: student.SEmail,
      isAdmin: student.isAdmin,
      token: generateToken(student._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
});

// @desc    Register a new students
// @route   POST /api/students
// @access  Public
const registerStudent = asyncHandler(async (req, res) => {
  const { SName, SEmail, SPassword, SNumber, Image, Audio, oldPassword } = req.body

  const studentExists = await Student.findOne({ SEmail });
  if (studentExists) {
    res.status(400)
    throw new Error('Student already exists')
  }

  const student = await Student.create({
    SName,
    SEmail,
    SPassword,
    SNumber,
    // Regno,
    Image,
    Audio,
    oldPassword
  });


  if (student) {
    res.status(201).json({
      _id: student._id,
      SName: student.SName,
      SEmail: student.SEmail,
      SPassword: student.SPassword,
      SNumber: student.SNumber,
      // Regno: student.Regno,
      Image: student.Image,
      Audio: student.Audio,
      oldPassword: student.oldPassword,
      isAdmin: student.isAdmin,
      token: generateToken(student._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid student data')
  }
})


// @desc    Get all students
// @route   GET /api/students
// @access  Private/Admin
const getStudents = asyncHandler(async (req, res) => {
  const students = await Student.find(req.body)
  res.json(students)
})

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private/Admin
const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id)

  if (student) {
    await student.remove()
    res.json({ message: 'Student removed' })
  } else {
    res.status(404)
    throw new Error('Student not found')
  }
})

// @desc    Get user by ID
// @route   GET /api/students/:id
// @access  Private/Admin
const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id)
  if (student) {
    res.json(student)
  } else {
    res.status(404)
    throw new Error('Student not found')
  }
})

// @desc    Update student
// @route   PUT /api/student/:id
// @access  Private/Admin
const updateStudent = asyncHandler(async (req, res) => {
    
    const { oldPassword } = req.body;
    const student = await Student.findById(req.params.id);
    console.log('student**',student.oldPassword);

    if (student && (await student.changePassword(oldPassword))) {
    
      student.SName = req.body.SName || student.SName
      // student.SEmail = req.body.SEmail || student.SEmail
        if (req.body.SPassword) {
          student.oldPassword = req.body.SPassword
          student.SPassword = req.body.SPassword
        }
    
        const updatedStudent = await student.save()
    
        res.json({
           success: "Password Updated",
          _id: updatedStudent._id,
          SName: updatedStudent.SName,
          SPassword: updatedStudent.SPassword,
          oldPassword: updatedStudent.oldPassword,
          // SEmail: updatedStudent.SEmail,
          token: generateToken(updatedStudent._id),
        })

    } else {
      res.status(404)
      throw new Error('Old Password Missing')
    }
  });

export {
  authStudent,
  registerStudent,
  getStudents,
  deleteStudent,
  getStudentById,
  updateStudent
}
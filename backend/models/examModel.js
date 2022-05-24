import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema({
  // id: Int16Array,
  EName: String,
  // E_Type: int,
  E_Type: String,
  E_Check: Array,
  File_Type: String,
  Date: Date,
  Time: Date,
  Status: String,
  Duration: Number,
  class: [{ type: mongoose.Schema.ObjectId, ref: "Class" }],
  // honestychecks: [{ type:  mongoose.Schema.ObjectId, ref: "HonestyChecks" }],
  student: [{ type: mongoose.Schema.ObjectId, ref: "Student" }],

  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  }
});

ExamSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'class',
    name: 'CName'
  })
    // .populate({
    //   path: 'honestychecks',
    //   select: 'IName'
    // })
    .populate({
      path: 'student',
      select: 'IName'
    });

  next();
})


const Exam = mongoose.model("Exam", ExamSchema);

export default Exam;

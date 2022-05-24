import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const InstructorSchema = new mongoose.Schema({
  // id_i: Int16Array,
  IName: String,
  IEmail: String,
  INumber: String,
  // INumber: Int32Array,
  IPassword: String,
  Rank: String,
  // Classes: [{ type: Schema.Types.ObjectId, ref: "Class" }],
  // Secheduled_Exams: [{ type: Schema.Types.ObjectId, ref: "Exam" }],
  // Exams_Completed: [{ type: Schema.Types.ObjectId, ref: "Exam" }],
  Classes: {
    type: mongoose.Schema.ObjectId,
    ref: 'Class'
  },
  Secheduled_Exams: [
    {
    type: mongoose.Schema.ObjectId,
    ref: 'Exam'
  }
  ],
  Exams_Completed: 
    [
      { type: mongoose.Schema.ObjectId, ref: "Exam" }
    ],

  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  oldPassword: String,

});

InstructorSchema.pre(/^find/, function(next){
  this.populate({
    path: 'Classes'
  }).populate({
    path: 'Secheduled_Exams'
  }).populate({
    path: 'Exams_Completed'
  });
  next();
})

InstructorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.IPassword);
};

InstructorSchema.methods.changePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.IPassword)
};


InstructorSchema.pre("save", async function (next) {
  if (!this.isModified("IPassword")) {
    next();
  }
  this.oldPassword = this.IPassword;
  const salt = await bcrypt.genSalt(10);
  this.IPassword = await bcrypt.hash(this.IPassword, salt);
});
const Instructor = mongoose.model('Instructor', InstructorSchema);

export default Instructor;

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const StudentScheme = new mongoose.Schema({
  // id_s: Int16Array,
  SName: String,
  SEmail: String,
  SNumber: String,
  // SNumber: Int32Array,
  SPassword: String,
  Regno: String,
  Image: String, //path
  Audio: String, //path

  // Feedback: [{ type: Schema.Types.ObjectId, ref: "HonestyCheck" }],
  Classes: [{ type: mongoose.Schema.ObjectId, ref: "Class" }],
  Secheduled_Exams: [{ type: mongoose.Schema.ObjectId, ref: "Exam" }],
  Exams_Completed: [{ type: mongoose.Schema.ObjectId, ref: "Exam" }],

  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  oldPassword: String,
});

StudentScheme.pre(/^find/, function(next){
  this.populate({
    path: 'Classes'
  }).populate({
    path: 'Secheduled_Exams'
  }).populate({
    path: 'Exams_Completed'
  });
  next();
})

StudentScheme.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.SPassword);
};

StudentScheme.methods.changePassword = async function(enteredPassword) {
  // console.log('enteredPassword***',await bcrypt.compare(enteredPassword, this.SPassword));
  return await bcrypt.compare(enteredPassword, this.SPassword)
};




StudentScheme.pre("save", async function (next) {
  if (!this.isModified("SPassword")) {
    next();
  }
  this.oldPassword = this.SPassword;
  const salt = await bcrypt.genSalt(10);
  this.SPassword = await bcrypt.hash(this.SPassword, salt);
});
const Student = mongoose.model("Student", StudentScheme);

export default Student;

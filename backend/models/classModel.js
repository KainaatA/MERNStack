import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({
  // id_c: Int16Array,
  CName: String,
  s_id: [{ type: mongoose.Schema.ObjectId, ref: "Student" }],
  id_i: [{ type: mongoose.Schema.ObjectId, ref: "Instructor" }],
  // Secheduled_Exams: [{ type: mongoose.Schema.ObjectId, ref: "Exam" }],
  // Exams_Completed: [{ type: mongoose.Schema.ObjectId, ref: "Exam" }],
 
});

ClassSchema.pre(/^find/, function(next){
  this.populate({
    path: 's_id',
    name: 'SName'
  }).populate({
    path: 'id_i',
    select: 'IName'
  })
  // .populate({
  //   path: 'Secheduled_Exams',
  //   select: 'Exam'
  // }).populate({
  //   path: 'Exams_Completed',
  //   select: 'Exam'
  // });

  next();
})


const Class = mongoose.model("Class", ClassSchema);
export default Class;

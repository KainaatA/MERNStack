import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  // id_c: Int16Array,
  join: String,
  s_id: [{ type: mongoose.Schema.ObjectId, ref: "Student" }],
  // Secheduled_Exams: [{ type: mongoose.Schema.ObjectId, ref: "Exam" }],
  // Exams_Completed: [{ type: mongoose.Schema.ObjectId, ref: "Exam" }],
 
});

GroupSchema.pre(/^find/, function(next){
  this.populate({
    path: 's_id',
    select: 'SName SEmail SNumber Regno'
  })
  
  next();
})


const Group = mongoose.model("Join", GroupSchema);
export default Group;

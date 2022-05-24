import mongoose from "mongoose";

// const AutoExamScheme = new mongoose.Schema({
//   id_E : [{ type: mongoose.Schema.ObjectId, ref: 'Exam' }],
//   examArray: []
//   Question: String,

//   Option1: String,
//   Option2: String,
//   Option3: String,
//   Option4: String,
//   correctOption: String,
//   marks: Array
//   // marks: Int16Array,
// });

const AutoExamSchema = new mongoose.Schema({
  id_E : [{ type: mongoose.Schema.ObjectId, ref: 'Exam' }],
  examArray: [
    {
      Question: String,
      options: Array,
      correctOption: String,
    }
  ],
  marks: Array
  // marks: Int16Array,
});

AutoExamSchema.pre(/^find/, function(next){
  this.populate({
    path: 'id_E'
  }) 

  next();
});

const AutoExam = mongoose.model("AutoExam", AutoExamSchema);

export default AutoExam;

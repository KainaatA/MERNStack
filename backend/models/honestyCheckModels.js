import mongoose from "mongoose";

var ClassScheme = new mongoose.Scheme({
//  id_c : Int16Array,
 CName: String,
  s_id: [{ type: mongoose.Schema.ObjectId, ref: 'Student' }],
  id_i : [{ type: mongoose.Schema.ObjectId, ref: 'Instructor' }],
  Secheduled_Exams : [{ type: mongoose.Schema.ObjectId, ref: 'Exam' }],
 Exams_Completed : [{ type: mongoose.Schema.ObjectId, ref: 'Exam' }]
});

ClassScheme.pre(/^find/, function(next){
    this.populate({
      path: 's_id'
    }).populate({
      path: 'id_i'
    }).populate({
      path: 'Secheduled_Exams'
    }).populate({
        path: 'Exams_Completed'
      })
    next();
  })

const Class = mongoose.model('class', ClassScheme);

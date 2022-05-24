import mongoose from "mongoose";


const QuestionnaireSchema = new mongoose.Schema({
    questionnaire_id: String,
    instructor: String,
    questionnaire: Array,
    duration: Number,

});


const Questionnaire = mongoose.model("questionnaire", QuestionnaireSchema);

export default Questionnaire;

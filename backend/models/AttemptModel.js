import mongoose from "mongoose";


const AttemptSchema = new mongoose.Schema({
    questionnaire_id : String,
    student : String,
    instructor : String,
    submit: Array,
    score: String
});


const Attempt = mongoose.model("attempt", AttemptSchema);

export default Attempt;

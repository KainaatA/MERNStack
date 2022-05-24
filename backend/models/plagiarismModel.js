import mongoose from "mongoose";

const PlagiarismSchema = new mongoose.Schema({
  roll_number: { type: String, required: true },
  name: { type: String, required: true },
  file_name: { type: String, required: true },
  plagiarism_score: { type: Number, required: true },
});

const Plagiarism = mongoose.model("PlagScores", PlagiarismSchema);

export default Plagiarism;
 
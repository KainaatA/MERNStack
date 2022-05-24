import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: {type: String, required: true },
  Attendence: { type: String, required: true },
  MouthOpeningDetector: { type: String, default: null },
  PersonAndPhoneDetector_MobilePhone : { type: String, default: null },
  PersonAndPhoneDetector_MorePersonsDetected: { type: String, default: null },
  PersonAndPhoneDetector_NoPersonDetected: { type: String, default: null },
  AudioDetection : {type: String, default: null},
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);

export default Feedback;

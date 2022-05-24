import Feedback from "../models/feedbackModel.js";

const addFeedback = async (req, res) => {
  const {
    _id,
    name,
    Attendence,
    MouthOpeningDetector,
    PersonAndPhoneDetector_MobilePhone,
    PersonAndPhoneDetector_MorePersonsDetected,
    PersonAndPhoneDetector_NoPersonDetected,
    AudioDetection,
  } = req.body;

  try {
    const feedback = await new Feedback({
      _id,
      name,
      Attendence,
      MouthOpeningDetector,
      PersonAndPhoneDetector_MobilePhone,
      PersonAndPhoneDetector_MorePersonsDetected,
      PersonAndPhoneDetector_NoPersonDetected,
      AudioDetection,
    });

    await feedback.save();
    res.status(200).json({ msg: "Feedback Create successfull." });
  } catch {
    res.status(400).json({ error: "Feedback not created!" });
  }
};

const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.status(200).json(feedback);
  } catch {
    res.status(400).json({ error: "Feedback not found!" });
  }
};

export { addFeedback, getFeedback };

import Plagiarism from "../models/plagiarismModel.js";

const addPlagiarism = async (req, res) => {
  const { roll_number, name, file_name, plagiarism_score } = req.body;

  try {
    const plagiarism = await new Plagiarism({
      roll_number,
      name,
      file_name,
      plagiarism_score,
    });

    await plagiarism.save();
    res.status(200).json({ msg: "Plagiarism Create successfull." });
  } catch {
    res.status(400).json({ error: "Plagiarism not created!" });
  }
};

const getPlagiarism = async (req, res) => {
  try {
    const plagiarism = await Plagiarism.find();
    res.status(200).json(plagiarism);
  } catch {
    res.status(400).json({ error: "Plagiarism not found!" });
  }
};

export { addPlagiarism, getPlagiarism };

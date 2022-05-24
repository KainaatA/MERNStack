import axios from "axios";
import { React, useState } from "react";
import "../../../global.css";

function AiFeedback() {
  const [showGroup, setShowGroup] = useState(false);
  const [showExmType, setShowExmType] = useState(false);
  const [feedbackData, setFeedbackData] = useState([]);
  const [plagiarismData, setPlagiarismData] = useState([]);

  const getFeecback = () => {
    axios
      .get("http://127.0.0.1:8009/api/feedback/get-feedbacks")
      .then((response) => setFeedbackData(response.data));
  };
  console.log(feedbackData);

  const getPlagiarism = () => {
    axios
      .get("http://127.0.0.1:8009/api/plagiarism/get-plagiarisms")
      .then((response) => setPlagiarismData(response.data));
  };
  //-----------------PYTHON CALL 1------------
  const [data, setData] = useState(' ')
  var result = null
  function generateFeedback() {
    fetch("http://localhost:5000/AICode").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        result = data.json()
        console.log(data)
      }
    )
  }
  //-----------------PYTHON CALL 1------------

  //-----------------PYTHON CALL 2------------
  const [data1, setData1] = useState(' ')
  var result1 = null
  function checkPlag() {
     fetch("http://localhost:5000/PlagCode").then(
        res => res.json()
     ).then(
        data1 => {
           setData1(data1)
           result1 = data1.json()
           console.log(data1)
        }
     )
}
  //-----------------PYTHON CALL 2------------

  return (
    <section
      className="feedback"
      style={{ width: "950px", marginLeft: "100px" }}
    >
      <h2 className="section-title"> Ai Feedback </h2>
      <h3 className="section-subtitle">
        {" "}
        Access the feedback of the exam #124ade bellow{" "}
      </h3>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <button onClick={generateFeedback} className="submit-button">Generate Feedback</button>
          <button onClick={checkPlag} className="submit-button">
            Check Plagiarism
          </button>
          <button onClick={getFeecback} className="submit-button">
            Retrieve Feedback Results
          </button>
          <button onClick={getPlagiarism}className="submit-button">Retrieve Plag Scores</button>
        </div>
        <table id="students">
          <tr>
            <th> Student names</th>
            <th> Facial Recognition Attendance </th>
            <th> Mouth Opening Detection</th>
            <th> Mobile Phone Detection </th>
            <th> Multiple Person Detection</th>
            <th> No Person Detection</th>
            <th> Speech Recognition</th>
          </tr>

          {feedbackData.length > 0 &&
            feedbackData.map((data, i) => (
              <tr key={i}>
                <td> {data.name} </td>
                <td> {data.Attendence} </td>
                <td> {data.MouthOpeningDetector} </td>
                <td> {data.PersonAndPhoneDetector_MobilePhone} </td>
                <td> {data.PersonAndPhoneDetector_MorePersonsDetected} </td>
                <td> {data.PersonAndPhoneDetector_NoPersonDetected} </td>
                <td> {data.AudioDetection}</td>
              </tr>
            ))}
        </table>
        <table id="students" style={{ marginTop: "10px" }}>
          <tr>
            <th>Student names</th>
            <th>Plagiarism score</th>
          </tr>
          {plagiarismData.length > 0 &&
            plagiarismData.map((data, i) => (
              <tr key={Math.random() * i}>
                <td> {data.name} </td>
                <td> {data.plagiarism_score} </td>
              </tr>
            ))}
        </table>
        {/* <button className="submit-button">Download Feedback</button> &nbsp;
        <button className="submit-button">Download Scores</button> */}
      </div>
    </section>
  );
}

export default AiFeedback;

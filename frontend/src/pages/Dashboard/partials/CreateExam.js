import { UilMinus, UilPlus } from "@iconscout/react-unicons";
import { React, useState } from "react";
import axios from "axios";
import { Dropbox } from 'dropbox';
import { uuid } from "uuidv4";


function CreateExam() {
  const [showGroup, setShowGroup] = useState(false);
  const [showExmType, setShowExmType] = useState(false);
  const [showChecks, setChecks] = useState(false);
  const [showChoseTime, setChoseTime] = useState(false);
  const [showChoseDuration, setShowChoseDuration] = useState(false)
  const [showReviewDetails, setReviewDetails] = useState(false);

  const [EName, setEName] = useState("");
  const [E_Type, setExamType] = useState("");
  const [Time, setTime] = useState("");
  const [Duration, setDuration] = useState("")
  const [Status, setStatus] = useState("");

  const [facialRecognition, setFacialRecognition] = useState("");
  const [objectDetection, setObjectDetection] = useState("");
  const [tabBlock, setTabBlock] = useState("");
  const [plagiarism, setPlagiarism] = useState("");
  const [audioRecognition, setAudioRecognition] = useState("");
  const [shortcutDisabling, setShortcutDisabling] = useState("");
  const [E_Check, setE_Check] = useState([]);

  // Pdf Part
  const [doc, setDoc] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");
  const fileType = ["application/pdf"];

  // console.log('docfile***',docfile);
  console.log(E_Check.length > 0);
  console.log(E_Check.length);

  // Upload Pdf File
  const uploadToDropboxPdfFile = async (pdfFile, dbxPath) => {
    // const UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024;
    console.log("Selected File:", pdfFile);
    var dbx = new Dropbox({
      accessToken:
        "HkS3AmvwAaEAAAAAAAAAAcuqg8SY7OJKWvWB86uK5eMEllPM1S6YyCaNYFGYlV6a",
    });
    console.log("dbx:", dbx);
    function dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    }
    var filestore = dataURLtoFile(pdfFile, `file${uuid()}.pdf`);

    dbx
      .filesUpload({
        path: "/Question/" + filestore.name,
        contents: filestore,
      })
      .then(function (response) {
        console.log("response success****", response);
      })
      .catch(function (error) {
        console.error("error***", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (EName == "") {
      alert("Group required");
    } else if (E_Type == "") {
      alert("Exam Type required");
    } else {
      if (E_Type === "computerBased") {
        if (E_Check.length < 0) {
          alert('Check the Option')
        } else if (Time == "") {
          alert('Time is required')
        } else if (Status == "") {
          alert('Status is required')
        } else {
          // http://127.0.0.1:8009/api/exam/create-exam
          const obj = {
            facialRecognition,
            objectDetection,
            tabBlock,
            plagiarism,
            audioRecognition,
            shortcutDisabling,
          };
          E_Check.push(obj);
          axios
            .post(`http://127.0.0.1:8009/api/exam/create-exam`, {
              EName,
              E_Type,
              E_Check,
              Time,
              Status,
              Duration
              // student,
              // class
            })
            .then((res) => {
              console.log("Exam res", res.data);
              localStorage.setItem("examToken", res.data.token);
              localStorage.setItem(
                "examId",
                res && res.data ? res.data._id : null
              );
              alert('Successfully created')
            })
            .catch((err) => {
              console.log("login err", err.message);
            });
        }
      } else {
        // http://127.0.0.1:8009/api/exam/create-exam
        axios
          .post(`http://127.0.0.1:8009/api/exam/create-exam`, {
            EName,
            E_Type,
            File_Type: doc

            // student,
            // class
          })
          .then((res) => {
            alert('Question File is successfully submitted')
            uploadToDropboxPdfFile(doc)
            localStorage.setItem("examToken", res.data.token);
            localStorage.setItem(
              "examId",
              res && res.data ? res.data._id : null
            );

          })
          .catch((err) => {
            console.log("login err", err);
          });
      }
    }
  };

  const handlePdfFileChange = (e) => {
    e.preventDefault();
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setPdfFileError("");
          setDoc(e.target.result);
        };
      } else {
        setPdfFile(null);
        setPdfFileError("Please select valid pdf file");
      }
    } else {
      console.log("select your file");
    }
  };

  return (
    <section className="create-exam">
      <h2 className="section-title">Instructor Dashboard</h2>
      <h3 className="section-subtitle">
        {" "}
        Follow the following steps to create an exam{" "}
      </h3>

      <form onSubmit={handleSubmit}>
        {/* ---- STEP 1 ----  */}
        <div className="step">
          <div className="step-head">
            <b>Step #1 </b> : Choose the Group name
            <div
              className="step-toggle-btn"
              onClick={() => setShowGroup(!showGroup)}
            >
              {!showGroup ? <UilPlus /> : <UilMinus />}
            </div>
          </div>

          {showGroup && (
            <input
              type="text"
              placeholder="Enter the name of group"
              name="groupName"
              onChange={(e) => setEName(e.target.value)}
            />
          )}
        </div>

        {/* ---- STEP 2 ----  */}
        <div className="step">
          <div className="step-head">
            <b>Step #2 </b> : Choose the exam type
            <div
              className="step-toggle-btn"
              onClick={() => setShowExmType(!showExmType)}
            >
              {!showExmType ? <UilPlus /> : <UilMinus />}
            </div>
          </div>

          {showExmType && (
            <select
              className="step-select-btns"
              onChange={(e) => setExamType(e.target.value)}
            >
              <option value="handWrittem">Manual Exam</option>
              <option value="computerBased">Auto Exam</option>
            </select>
          )}
        </div>

        {/* ---- STEP 3 ----  */}
        {
          E_Type === 'handWrittem' && (
            <div className='uploadFile' >
              <div className="upload-audio">
                <div className="left">
                  { }
                </div>

                <div className="right">
                  <span className="file-wrapper">
                    {/* <input type="file" name="pdf" accept='pdf/*' id="imgInp" className="uploader" onChange={(e) => setDocFile(e.target.files[0].name)} /> */}
                    {/* <input type="file" name="pdf" id="files" className="uploader" onChange={(e) => setDocFile(e.target.files[0].name)} /> */}
                    <input type="file" multiple={true} id="file" onChange={handlePdfFileChange} accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.ppt,.pptx" />

                    <button className="submit-button">(PDF, DOC ,DOCx, PNG, JPG, GIF files only. File size over 1 MB is not supported)</button>
                  </span>
                </div>
              </div>
            </div>
          )
        }
        {E_Type === "computerBased" && (
          <div>
            <div className="step">
              <div className="step-head">
                <b>Step #3 </b> : Enable the checks
                <div
                  className="step-toggle-btn"
                  onClick={() => setChecks(!showChecks)}
                >
                  {!showChecks ? <UilPlus /> : <UilMinus />}
                </div>
              </div>

              {showChecks && (
                <div className="step-checks">
                  <ul>
                    <li className="single-check">
                      <input
                        type="checkbox"
                        value="facial_recognition"
                        onChange={(e) => setFacialRecognition(e.target.value)}
                      />
                      <label>Facial Recognition</label>
                    </li>

                    <li className="single-check">
                      <input
                        type="checkbox"
                        value="object_detection"
                        onChange={(e) => setObjectDetection(e.target.value)}
                      />
                      <label>Object detection</label>
                    </li>

                    <li className="single-check">
                      <input
                        type="checkbox"
                        value="tab_block"
                        onChange={(e) => setTabBlock(e.target.value)}
                      />
                      <label>Tab block</label>
                    </li>

                    {/* <li className="single-check">
                      <input
                        type="checkbox"
                        value="plagiarism_check"
                        onChange={(e) => setPlagiarism(e.target.value)}
                      />
                      <label>Plagiarism Check</label>
                    </li> */}

                    <li className="single-check">
                      <input
                        type="checkbox"
                        value="audio_recognition"
                        onChange={(e) => setAudioRecognition(e.target.value)}
                      />
                      <label>Audio Recognition</label>
                    </li>

                    <li className="single-check">
                      <input
                        type="checkbox"
                        value="facial_recognition"
                        onChange={(e) => setShortcutDisabling(e.target.value)}
                      />
                      <label>Shortcut disabling</label>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* ---- STEP 4 ----  */}
            <div className="step">
              <div className="step-head">
                <b>Step #4 </b> : Choose the time
                <div
                  className="step-toggle-btn"
                  onClick={() => setChoseTime(!showChoseTime)}
                >
                  {!showChoseTime ? <UilPlus /> : <UilMinus />}
                </div>
              </div>

              {showChoseTime && (
                <input
                  type="datetime-local"
                  name="choseTime"
                  onChange={(e) => setTime(e.target.value)}
                />
              )}
            </div>

            {/* ---- STEP 5 ----  */}
            <div className="step">
              <div className="step-head">
                <b>Step #4 </b> : Choose the duration {"(mins)"}
                <div
                  className="step-toggle-btn"
                  onClick={() => setShowChoseDuration(!showChoseDuration)}
                >
                  {!showChoseDuration ? <UilPlus /> : <UilMinus />}
                </div>
              </div>

              {showChoseDuration && (
                <input
                  type="number"
                  name="duration"
                  onChange={(e) => setDuration(e.target.value)}
                />
              )}
            </div>

            {/* ---- STEP 6 ----  */}
            <div className="step">
              <div className="step-head">
                <b>Step #5 </b> : Set the Status
                <div
                  className="step-toggle-btn"
                  onClick={() => setReviewDetails(!showReviewDetails)}
                >
                  {!showReviewDetails ? <UilPlus /> : <UilMinus />}
                </div>
              </div>

              {showReviewDetails && (
                <textarea
                  type="text"
                  placeholder="Set the Status of Exam"
                  name="review"
                  onChange={(e) => setStatus(e.target.value)}
                />
              )}
            </div>
          </div>
        )}

        <button type="submit" className="submit-button">
          Create exam
        </button>
        <button className="submit-button" onClick={(e) => window.location.href = "/create-exam"}>
          Add Questions
        </button>
      </form>

    </section>
  );
}

export default CreateExam;


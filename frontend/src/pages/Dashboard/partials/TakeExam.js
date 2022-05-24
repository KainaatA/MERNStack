import axios from "axios";
import { Dropbox } from "dropbox";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { uuid } from "uuidv4";
import "../dashboard.css";

function TakeExam() {
  const history = useHistory();
  var dbx = new Dropbox({
    accessToken:
      "HkS3AmvwAaEAAAAAAAAAAcuqg8SY7OJKWvWB86uK5eMEllPM1S6YyCaNYFGYlV6a",
  });
  const studentId = localStorage.getItem("studentId");

  const [exams, setExams] = useState("");
  const [manualExam, setManualExam] = useState([]);
  const [savedfile, setSavedFile] = useState("");
  const [success1, setSuccess1] = useState(false);
  const [disable, setDisable] = useState(true);
  const [disableQuestionBtn, setDisableQuestionBtn] = useState(false);
  const [doc, setDoc] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");
  const fileType = ["application/pdf"];

  // Upload Pdf file
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
        path: "/Answer/" + filestore.name,
        contents: filestore,
      })
      .then(function (response) {
        console.log("response success****", response);
      })
      .catch(function (error) {
        console.error("error***", error);
      });
  };

  // Download File in dropbox
  const downloadFile = async () => {
    dbx
      .filesDownload({
        path: "/Question/JS Basic Tasks 1.pdf",
      })
      .then(function (response) {
        console.log(response);
        const link = document.createElement("a");

        var blob = response.result.fileBlob;
        link.href = URL.createObjectURL(blob);
        link.download = response.result.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        const createFile = async () => {
          const fileBlob = await fetch(link.href).then((r) => r.blob());
          const url = new Blob([fileBlob]);
          console.log(url);

          const pdfFile = new File([fileBlob], `${uuid()}.${"pdf"}`, {
            type: "text/plain;charset=utf-8",
          });

          setSavedFile(pdfFile.name);
        };
        createFile();
        setDisableQuestionBtn(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Add Current Api
  useEffect(async () => {
    axios
      .post("http://127.0.0.1:8009/api/exam/list-exam", {
        studentId: studentId,
      })
      .then((res) => {
        setExams(res.data.data);
      });
  }, []);

  // Exam Timer
  useEffect(() => {
    setTimeout(() => {
      setDisable(false);
    }, 50000);
  }, []);

  useEffect(async () => {
    const result = await axios.get(
      "http://127.0.0.1:8009/api/exam/get-all-exam"
    );
    setManualExam(result);
  }, []);

  const selectExam = async (e) => {
    let qs_id = e.target.getAttribute("qs_no");
    history.push("/attempt-exam", { data: exams[qs_id] });
  };

  // handlechange pdf file
  const handlePdfFileChange = async (e) => {
    e.preventDefault();
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setPdfFileError("");
          setSuccess1(true);
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

  // Pdf file download button
  const handleClick = async (e) => {
    e.preventDefault();
    if (pdfFile == "") {
      alert("Submit the answer file");
    } else {
      uploadToDropboxPdfFile(doc);
      alert("Successfully Submitted");
    }
  };

  return (
    <div>
      <section className="take-exam">
        <h2 className="section-title"> Upcoming exam </h2>
        <h3 className="section-subtitle"></h3>

        <form action="#">
          <div className="upcoming-box">
            <p className="upcoming-box-text">
              {exams &&
                exams.map((e, i) => {
                  return (
                    <p
                      key={i}
                      onClick={selectExam}
                      qs_no={i}
                      className="exam-item"
                    >
                      Click to attempt Exam ({e.questionnaire_id})
                    </p>
                  );
                })}
            </p>
          </div>
        </form>
        <button
          type="button"
          className="submit-button"
          onClick={() => history.push("/attempt-exam-manual")}
        >
         Manual Exam? Click here
        </button>
      </section>

      {/* <section className="handwritten">
        <h2 className="section-title"> Handwritten Exam </h2>
        <h3 className="section-subtitle"> Following Instructions: </h3>

        <div className="attendance-table">
          <table id="students">
            <tr>
              <th>Title</th>
              <th>Exam File</th>
              <th> Due Date </th>
              <th> Submit Answer File</th>
              <th> Submit Date </th>
            </tr>
            <tr>
              <td>Coding Exam</td>
              <td>
                <Button
                  variant="contained"
                  onClick={downloadFile}
                  disabled={disableQuestionBtn}
                >
                  DOWNLOAD QUESTION
                </Button>{" "}
              </td>
              <td>12-09-2022</td>
              <td>
                <form>
                  <input
                    type="file"
                    className="form-control"
                    required
                    onChange={handlePdfFileChange}
                  />
                  <Button
                    variant="contained"
                    disabled={disable}
                    type="submit"
                    className="submit-button"
                    onClick={handleClick}
                  >
                    Submit Answer
                  </Button>
                </form>
              </td>

              <td>12-10-2022</td>
            </tr>
          </table>
        </div>
      </section> */}
    </div>
  );
}

export default TakeExam;

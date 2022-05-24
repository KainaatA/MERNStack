import Button from "@mui/material/Button";
import axios from "axios";
import { Dropbox } from "dropbox";
import React, { useEffect, useState } from "react";
import PageVisibility, { usePageVisibility } from "react-page-visibility";
import { useHistory } from "react-router-dom";
import "./extra.css";

function Questionnaire(data) {
  console.log(data);
  const [examSuccess, setexamSuccess] = useState(false);
  const isVisible = usePageVisibility();
  const [disable, setDisable] = useState(true);

  const studentId = localStorage.getItem("studentId");
  const [activeQuestionnaire, setActiveQuestionnaire] = useState(-1);
  const [listOfQuestionnaire, setListOfQuestionnaire] = useState([]);
  const [recoardingtime, setRecoardingtime] = useState(0);
  const [questionnaire, setQuestionnaire] = useState([]);
  const [audioClipRecorded, setAudioClipRecorded] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [visSubmitActive, setVisSubmitActive] = useState(false);
  // console.log(isVisible);
  const history = useHistory();
  // const [buttonSubmitTimerExam, setButtonSubmitTimerExam] = useState(true);
  const uploadToDropbox = async (videoFile, dbxPath) => {
    // const UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024;

    console.log("Selected File:", videoFile);
    var dbx = new Dropbox({
      accessToken:
        "HkS3AmvwAaEAAAAAAAAAAcuqg8SY7OJKWvWB86uK5eMEllPM1S6YyCaNYFGYlV6a",
    });

    dbx
      .filesUpload({
        path: (dbxPath || "/Records/") + videoFile.name,
        contents: videoFile,
      })
      .then(function (response) {
        console.log("response success****", response);
      })
      .catch(function (error) {
        console.error("error***", error);
      });
  };
  let videoSnippetCounter = 0;
  async function Record(sname) {
    let videoStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
    let mediaRecorder = new MediaRecorder(videoStream);

    let randomInterval = 0;
    const videoChunks = new Array();
    const StartRecording = () => {
      randomInterval = Math.floor(Math.random() * 1000) * 425; // Generates a number between 0 and 1000. Then times that number by 425 to generate next interval of ms
      if (videoChunks.length < 5) {
        const onDataAvailible = (e) => {
          console.log("e data***", e);
          videoChunks.push(e.data);
        };
        const onRecordingStop = () => {
          console.log(videoChunks[videoChunks.length]);
          const blob = new Blob([videoChunks[videoChunks.length - 1]], {
            type: videoChunks[videoChunks.length - 1].type,
          });

          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "./test";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          // -----------------------
          // setCurStatus(true);

          const createFile = async () => {
            console.log("calling create");
            const videoBlob = await fetch(link.href).then((r) => r.blob());
            console.log("videoBlob", videoBlob);
            const url = new Blob([videoBlob]);
            console.log("url", url);
            // Creates a video file with a randomized file name
            const videoFile = new File(
              [videoBlob],
              `${sname}_${
                data.data.questionnaire_id
              }_${videoSnippetCounter}.${"mp4"}`,
              {
                type: "video/mp4",
              }
            );
            videoSnippetCounter++;
            console.log("Video File:", videoFile);
            console.log("Blob:", url);

            uploadToDropbox(videoFile);
          };
          createFile();
        };

        mediaRecorder.addEventListener("dataavailable", onDataAvailible);
        mediaRecorder.addEventListener("stop", onRecordingStop);

        mediaRecorder.start();
        return setTimeout(() => {
          mediaRecorder.stop();
          return setTimeout(() => {
            mediaRecorder.removeEventListener("dataavailable", onDataAvailible);
            mediaRecorder.removeEventListener("stop", onRecordingStop);
            return StartRecording();
          }, randomInterval);
        }, 30000);
        // if(visible) {
        //     mediaRecorder.stop()
        // }
      } else {
        return;
      }
    };
    StartRecording();
  }

  let audioSnippetCounter = 0;
  let recoardingtimeStart;
  async function RecordAudioSnippet() {
    // Promise based
    setAudioClipRecorded(true);
    recoardingtimeStart = setInterval(() => {
      setRecoardingtime((prevState) => prevState + 1);
    }, 1000);

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const audioRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      console.log(MediaRecorder.isTypeSupported('audio/webm'));
      audioRecorder.start();

      const audioChunks = new Array();

      const createAudioFile = () => {
        audioRecorder.removeEventListener("stop", createAudioFile);
        const audioBlob = new Blob(audioChunks, { 'type': audioRecorder.mimeType });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(audioBlob);

        const createFile = async () => {
          const aB = await fetch(link.href).then((r) => r.blob());
          console.log("videoBlob", aB);
          const url = new Blob([aB]);
          console.log("url", url);
          // Creates a video file with a randomized file name
          // const audioFile = new File(
          //   [aB],
          //   `${studentName}_${
          //     data.data.questionnaire_id
          //   }_${audioSnippetCounter}.${"wav"}`,
          //   {
          //     type: "audio/wav",
          //   }
          // );
          const audioFile = new File(
            [aB],
            `${studentName}.${"webm"}`,
            {
              type: "audio/webm",
            }
          );

          console.log("Video File:", audioFile);
          console.log("Blob:", url);

          uploadToDropbox(audioFile, "/Audio_Records/");
          audioSnippetCounter++;
        };
        createFile();
      };
      const pushChunks = (e) => {
        audioRecorder.removeEventListener("dataavailable", () => pushChunks());
        audioChunks.push(e.data);
      };
      audioRecorder.addEventListener("dataavailable", (e) => pushChunks(e));
      audioRecorder.addEventListener("stop", createAudioFile);
      setTimeout(() => {
        audioRecorder.stop();
        clearInterval(recoardingtimeStart)
      }, 10000);
    });
  }

  useEffect(() => {
    axios.post("http://127.0.0.1:8009/api/exam/list-exam").then((res) => {
      setListOfQuestionnaire([data.data]);

      setActiveQuestionnaire(0);
      let idx = 0;
      let deep_data = JSON.parse(JSON.stringify(data.data.questionnaire));
      while (idx < deep_data.length) {
        let idxx = 0;
        while (idxx < deep_data[idx].options.length) {
          deep_data[idx].options[idxx].is_correct = false;
          idxx = idxx + 1;
        }
        idx = idx + 1;
      }
      setQuestionnaire(deep_data);
      console.log(deep_data);
      window.open("http://66.42.56.86:3000/", "_blank");

      axios
        .get(`http://127.0.0.1:8009/api/student/${studentId}`)
        .then((res) => {
          // console.log(res.data)
          setStudentName(res.data.SName);
          Record(res.data.SName);
        });
    });
    setTimeout(() => {
      // Will hide record audio button after 2 mins
      setAudioClipRecorded(true);
    }, 120000);
    setTimeout(() => {
      setVisSubmitActive(true);
    }, 120000);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);

    let submit = questionnaire;
    let questionnaire_id =
      listOfQuestionnaire[activeQuestionnaire].questionnaire_id;
    let instructor_id = listOfQuestionnaire[activeQuestionnaire].instructor;
    let original = listOfQuestionnaire[activeQuestionnaire].questionnaire;
    let score = 0;
    let i = 0;
    while (i < submit.length) {
      let option_selected = -1;
      var n = 0;
      while (n < submit[i].options.length) {
        if (submit[i].options[n].is_correct == true) {
          option_selected = n;
        }
        n = n + 1;
      }
      if (option_selected == -1) {
        alert("Please select an option for Question " + i + 1);
        return;
      }
      let correct_option = -1;
      n = 0;
      while (n < original[i].options.length) {
        if (original[i].options[n].is_correct == true) {
          correct_option = n;
        }
        n = n + 1;
      }
      if (correct_option == option_selected) {
        score = score + 1;
      }
      i = i + 1;
    }
    const data = {
      questionnaire_id: questionnaire_id,
      student: studentId,
      instructor: instructor_id,
      submit: submit,
      score: score.toString(),
    };

    setexamSuccess(true);
    // history.push('/dashboard/join-group')
    // setTimeout(()=> {
    // }, 2000)
    axios
      .post("http://127.0.0.1:8009/api/exam/save-attempt", {
        attempt: data,
      })
      .then((res) => {
        console.log("exam res", res.data);
        alert("Exam Sucessfully Submitted");
        history.push("/dashboard/submitted");

        setexamSuccess(true);
        history.push("/dashboard/join-group");
      })
      .catch((err) => {
        console.log("login err", err.message);
      });
    alert("Your attempt has been saved. You scored " + score);

    clearInterval(recoardingtimeStart);
  };

  useEffect(() => {
    return () => clearInterval(recoardingtimeStart);
  }, []);

  const focusExam = (e) => {
    let data = JSON.parse(
      JSON.stringify(listOfQuestionnaire[e.target.id].questionnaire)
    );
    setActiveQuestionnaire(e.target.id);
    let idx = 0;
    while (idx < data.length) {
      let idxx = 0;
      while (idxx < data[idx].options.length) {
        data[idx].options[idxx].is_correct = false;
        idxx = idxx + 1;
      }
      idx = idx + 1;
    }
    setQuestionnaire(data);
  };

  const setOption = (e) => {
    // if(isVisible) {
    let data = questionnaire;
    const qs_index = e.target.getAttribute("qs_no");
    const op_index = e.target.getAttribute("op_no");
    let n = 0;
    while (n < data[qs_index].options.length) {
      if (n == op_index) {
        data[qs_index].options[n].is_correct =
          !data[qs_index].options[n].is_correct;
      } else {
        data[qs_index].options[n].is_correct = false;
      }
      n = n + 1;
    }
    setQuestionnaire([...data]);
    // }
  };

  useEffect(async () => {
    const getData = await axios.get("http://127.0.0.1:8009/api/exam/list-exam");
    console.log("getData***", getData);
  }, []);
  // Handles input change and assigns input value to selectedFile variable
  //    if(isVisible === true) {
  //    setSuccess2(false)
  //    }

  const handleVisibilityChange = (isVisible) => {
    if (isVisible && visSubmitActive) {
      setexamSuccess(isVisible);
      history.push("/dashboard/submitted");
    }
  };

  // Submit Timer
  useEffect(() => {
    return () => {
      setTimeout(() => {
        setDisable(false);
      }, 50000);
    };
  }, []);
  // console.log('success2***', success2);

  return (
    <div className="create-exam-content">
      {/* <div className="list-qs">
                <h4>Available Exams</h4>
                {listOfQuestionnaire.map((qs, idx) => 
                <div>
                    <ul>
                        <li id={idx} onClick={focusExam}><p id={idx}> - Exam {idx+1} ({qs.questionnaire_id})</p></li>
                    </ul>
                </div>
                )}
            </div> */}
      <PageVisibility onChange={handleVisibilityChange}>
        {!examSuccess ? (
          <div className="exam-box">
            <form onSubmit={handleSubmit}>
              {questionnaire.map((item, idx) => (
                <div key={idx}>
                  <div className="exam-box-head">
                    <h5 style={{ color: "black" }}>
                      Warning! Do NOT change the tab after two minutes. Otherwise, exam will submit automatically
                    </h5>
                    <p className="qs-text" qs_no={idx}>
                      {" "}
                      {item.question}
                    </p>
                  </div>

                  <div className="exam-box-body">
                    <div className="form-group">
                      {item.options.map((option, idxx) => (
                        <div key={option.text}>
                          <input
                            qs_no={idx}
                            op_no={idxx}
                            id={idxx}
                            checked={option.is_correct}
                            type="radio"
                            onChange={setOption}
                          />
                          <p>{option.text} </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              {activeQuestionnaire != -1 ? (
                //     <button
                //     type="submit"
                //     className="submit-button"
                //     onClick={handleSubmit}
                //     disabled={disable}
                //   >
                //     {" "}
                //     Submit{" "}
                //   </button>

                <Button
                  variant="contained"
                  disabled={disable}
                  type="submit"
                  className="submit-button"
                  onClick={handleSubmit}
                >
                  Submit Answer
                </Button>
              ) : (
                <p className="warn">
                  Please select an exam to attempt from left bar
                </p>
              )}
              {recoardingtime === 0 ? (
                ""
              ) : (
                <span style={{ color: "black", display: "block" }}>
                  Recording: {recoardingtime}s
                </span>
              )}
            </form>
            {!audioClipRecorded ? (
              <button
                type="button"
                className="submit-button"
                onClick={RecordAudioSnippet}
              >
                Record Audio Snippet
              </button>
            ) : null}
          </div>
        ) : null}
      </PageVisibility>
    </div>
  );
}

export default Questionnaire;

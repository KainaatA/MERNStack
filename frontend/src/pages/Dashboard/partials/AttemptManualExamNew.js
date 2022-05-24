import axios from "axios";
import { Dropbox } from "dropbox";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AttemptManualExam from "./AttemptManualExam";
// import "./extra.css";

function AttemptManualExamNew(data) {
  const [examSuccess, setexamSuccess] = useState(false);
  const [disable, setDisable] = useState(true);

  const studentId = localStorage.getItem("studentId");
  const [activeQuestionnaire, setActiveQuestionnaire] = useState(-1);
  const [listOfQuestionnaire, setListOfQuestionnaire] = useState([]);
  const [questionnaire, setQuestionnaire] = useState([]);
  const [audioClipRecorded, setAudioClipRecorded] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [visSubmitActive, setVisSubmitActive] = useState(false);
  const [recoardingtime, setRecoardingtime] = useState(0);
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
    // let videoStream = await navigator.mediaDevices.getDisplayMedia({
    //   video: true,
    // });
    // let mediaRecorder = new MediaRecorder(videoStream);


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
    setTimeout(() => {
      window.open("http://66.42.56.86:3000/", "_blank");
    }, 500);
    axios.get(`http://127.0.0.1:8009/api/student/${studentId}`).then((res) => {
      // console.log(res.data)
      setStudentName(res.data.SName);
      Record(res.data.SName);
    });
    setTimeout(() => {
      // Will hide record audio button after 2 mins
      setAudioClipRecorded(true);
    }, 120000);
    setTimeout(() => {
      setVisSubmitActive(true);
    }, 120000);
  }, []);


  // Submit Timer
  useEffect(() => {
    return () => {
      setTimeout(() => {
        setDisable(false);
      }, 50000);
    };
  }, []);
  // console.log('success2***', success2);

  useEffect(() => {
    return () => clearInterval(recoardingtimeStart);
  }, []);

  const submitHandle = () => {
    clearInterval(recoardingtimeStart);
  };

  return (
    <div>
        <>
          <AttemptManualExam isSubmit={submitHandle} />

          {recoardingtime === 0 ? (
            ""
          ) : (
            <span style={{ color: "black", display: "block" }}>
              Recording: {recoardingtime}s
            </span>
          )}

          {!examSuccess ? (
            <div className="exam-box">
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
        </>
    </div>
  );
}

export default AttemptManualExamNew;

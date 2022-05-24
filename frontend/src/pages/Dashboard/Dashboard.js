import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sections/Sidebar/Sidebar";
import "./dashboard.css";
import AddInstructor from "./partials/AddInstructor";
import AddStudent from "./partials/AddStudent.js";
import AiFeedback from "./partials/AiFeedback";
// import Attemdamce from "./partials/Attendance";
import CheckEditing from "./partials/ChecksEditing";
import CreateExam from "./partials/CreateExam";
import EditProfile from "./partials/EditProfile";
import GenerateFeedBack from "./partials/Generate-Feedback";
import JoinGroupStudents from "./partials/Join-Group";
import JoinGroup from "./partials/JoinGroup";
import NewGroup from "./partials/NewGroup";
import Submitted from "./partials/Submitted";
import TakeExam from "./partials/TakeExam";
import TakeExam2 from "./partials/TakeExam2";
import YourClasses from "./partials/YourClasses";

function Dashboard() {
  const [path, setPath] = useState();
  const [showSutter, setShowSutter] = useState(false);
  // console.log(path);

  useEffect(() => {
    setPath(window.location.pathname);
  }, [window.location.pathname]);
  // console.log(path);

  return (
    <div className="dashboard">
      <Sidebar shutter={showSutter} setSutter={setShowSutter} />

      <div className="dashboard-container">
        <div className="shutter-btn" onClick={() => setShowSutter(!showSutter)}>
          {showSutter ? "Hide" : "Show"} option's
        </div>

        {path === "/dashboard/add-student" && <AddStudent />}
        {path === "/dashboard/add-instructor" && <AddInstructor />}
        {path === "/dashboard/take-exam" && <TakeExam />}
        {path === "/dashboard/your-classes" && <YourClasses />}
        {/* {path === '/dashboard/modify-exam' && <ModifyExam/> } */}
        {path === "/dashboard/new-group" && <NewGroup />}
        {path === "/dashboard/create-exam" && <CreateExam />}
        {path === "/dashboard/take-exam2" && <TakeExam2 />}
        {/* {path === "/dashboard/attend-record" && <Attemdamce />} */}
        {path === "/dashboard/ai-feedback" && <AiFeedback />}
        {path === "/dashboard/check-edit" && <CheckEditing />}
        {path === "/dashboard/join-group" && <JoinGroup />}
        {path === "/dashboard/join-student" && <JoinGroupStudents />}
        {path === "/dashboard/edit-profile" && <EditProfile />}
        {path === "/dashboard/generateFeedback" && <GenerateFeedBack />}
        {path === "/dashboard/submitted" && <Submitted />}
      </div>
    </div>
  );
}

export default Dashboard;

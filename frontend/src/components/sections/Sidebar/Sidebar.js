/*eslint-disable*/
import { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar({ shutter, setSutter }) {
  const [filterData, setFilterData] = useState("");
  const [values, setValues] = useState("");

  const instrutorId = localStorage.getItem("instructorId");
  const studentId = localStorage.getItem("studentId");
  const adminId = localStorage.getItem("adminId");

  // console.log("values", values);
  const signOut = () => {
    localStorage.removeItem("instructorId");
    localStorage.removeItem("instructorToken");
    localStorage.removeItem("studentId");
    localStorage.removeItem("studentToken");
    localStorage.removeItem("adminId");
    localStorage.removeItem("adminToken");
  };

  return (
    <>
      <div className={`sidebar ${shutter && "shutter-toggle"}`}>
        <nav className="sidebar-nav">
          <ul>
            {studentId ? (
              <ul>
                <li onClick={() => setSutter(false)}>
                  <Link to="/dashboard/your-classes"> Your classes </Link>
                </li>
                {/* <li onClick={() => setSutter(false)}>
                  <Link to="/dashboard/take-exam2"> Take an exam </Link>
                </li> */}

                <li onClick={() => setSutter(false)}>
                  <Link to="/dashboard/join-group"> Join a group </Link>
                </li>
                <li onClick={() => setSutter(false)}>
                  <Link to="/dashboard/take-exam"> Take an exam </Link>
                </li>
                <li onClick={() => setSutter(false)}>
                  <Link to="/dashboard/edit-profile"> Edit Profile </Link>
                </li>
              </ul>
            ) : instrutorId ? (
              <ul>
                <li onClick={() => setSutter(false)}>
                  <Link to="/dashboard/new-group"> Make a new Group </Link>
                </li>
                {/* <li onClick={() => setSutter(false)}>
                  <Link to="/dashboard/modify-exam"> Modify exam </Link>
                </li> */}
                <li onClick={() => setSutter(false)}>
                  <Link to="/dashboard/create-exam"> Create an Exam </Link>
                </li>
                {/* <li onClick={() => setSutter(false)}>
                  <Link to="/dashboard/check-edit"> Checks Editing </Link>
                </li> */}

                <li onClick={() => setSutter(false)}>
                  <Link to="/dashboard/join-student"> Student Requests </Link>
                </li>
                <li onClick={() => setSutter(false)}>
                  <Link to="/dashboard/ai-feedback"> Ai Feedback </Link>
                </li>

                <li onClick={() => setSutter(false)}>
                  <Link to="/dashboard/edit-profile"> Edit Profile </Link>
                </li>
                <li onClick={() => setSutter(false)}>
                  <Link to="/dashboard/generateFeedback"> Feedback </Link>
                </li>
              </ul>
            ) : adminId ? (
              <ul>
                <li onClick={() => setSutter(false)}>
                  <Link to="/dashboard/add-student"> Add student </Link>
                </li>

                <li onClick={() => setSutter(false)}>
                  <Link to="/dashboard/add-instructor"> Add instructor </Link>
                </li>
                <li onClick={() => setSutter(false)}>
                  <Link to="/dashboard/edit-profile"> Edit Profile </Link>
                </li>
              </ul>
            ) : (
              <h1>Loading</h1>
            )}

            <li onClick={() => setSutter(false)} className="signout">
              {/* <button onClick={signOut}><Link to="/"> Sign Out </Link></button> */}
              <Link to="/" onClick={signOut}>
                {" "}
                Sign Out{" "}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import "../../global.css";
import "./signup.css";

function SignUp() {
  const [IName, setIName] = useState("");
  const [IPassword, setIPassword] = useState("");
  const [SName, setSName] = useState("");
  const [SPassword, setSPassword] = useState("");

  var history = useHistory();
  const loc = history.location.hash.split("").splice(1).join("");
 
  // console.log(w);

  const AddLogin = (e) => {
    e.preventDefault();

    if (loc === "instructor") {
      if (IName == "") {
        alert("Name required");
      } else if (IPassword == "") {
        alert("Password required");
      } else if (IPassword.length < 6) {
        alert("Password length must be greater than 6");
      } else {
        // http://127.0.0.1:8009/api/instructor/login
        axios
          .post(`http://127.0.0.1:8009/api/${loc}/login`, {
            IName: IName,
            IPassword: IPassword,
          })
          .then((res) => {
            console.log("login res", res.data);
            localStorage.setItem("instructorToken", res.data.token);
            localStorage.setItem(
              "instructorId",
              res && res.data ? res.data._id : null
            );
            window.location.href = "/dashboard/new-group";
          })
          .catch((err) => {
            console.log("login err", err.message);
          });
      }
    }
  if (loc === "student") {
    if (SName == "") {
      alert("Name required");
    } else if (SPassword == "") {
      alert("Password required");
    } else if (SPassword.length < 6) {
      alert("Password length must be greater than 6");
    } else {
      // http://127.0.0.1:8009/api/instructor/login
      axios
        .post(`http://127.0.0.1:8009/api/${loc}/login`, {
          SName: SName,
          SPassword: SPassword,
        })
        .then((res) => {
          console.log("login res", res.data);
          localStorage.setItem("studentToken", res.data.token);
          localStorage.setItem("studentId", res && res.data ? res.data._id : null);
          window.location.href = "/dashboard/your-classes";
        })
        .catch((err) => {
          console.log("login err", err.message);
        });
    }
  }
  if (loc === "admin") {
    if (SName == "") {
      alert("Name required");
    } else if (SPassword == "") {
      alert("Password required");
    } else if (SPassword.length < 3) {
      alert("Password length must be greater than 3 digits");
    } else {
      // http://127.0.0.1:8009/api/instructor/login
      axios
        .post(`http://127.0.0.1:8009/api/student/login`, {
          SName: SName,
          SPassword: SPassword,
        })
        .then((res) => {
          console.log("login res", res.data);
          localStorage.setItem("adminToken", res.data.token);
          localStorage.setItem("adminId", res && res.data ? res.data._id : null);
          window.location.href = "/dashboard/add-student";
        })
        .catch((err) => {
          console.log("login err", err.message);
        });
    }
  }
  }
  //   var history = useHistory();
  if (
    localStorage.getItem("auth_id1") !== null &&
    localStorage.getItem("auth_id1") !== undefined &&
    localStorage.getItem("auth_id1") !== ""
  ) {
    history.push("/dashboard");
  }

  return (
    <>
      <div className="signup">
        <div className="container">
          <div className="wrapper fadeInDown">
            <div id="formContent">
              <h2> Sign In </h2>
{/* 
              <div className="fadeIn first">
                <img
                  src="http://danielzawadzki.com/codepen/01/icon.svg"
                  id="icon"
                  alt="User Icon"
                />
              </div> */}

              <form onSubmit={AddLogin}>
                {loc === "instructor" ? (
                  <div>
                    <input
                      type="text"
                      id="login"
                      className="fadeIn second"
                      name="username"
                      placeholder="Enter your username"
                      onChange={(e) => setIName(e.target.value)}
                    />
                    <input
                      type="password"
                      id="password"
                      className="fadeIn third"
                      name="password"
                      placeholder="Enter your password"
                      onChange={(e) => setIPassword(e.target.value)}
                    />
                  </div>
                ) :  loc === 'student' ? (
                  <div>
                    <input
                      type="text"
                      id="login"
                      className="fadeIn second"
                      name="username"
                      placeholder="Enter your username"
                      onChange={(e) => setSName(e.target.value)}
                    />
                    <input
                      type="password"
                      id="password"
                      className="fadeIn third"
                      name="password"
                      placeholder="Enter your password"
                      onChange={(e) => setSPassword(e.target.value)}
                    />
                  </div>) 
                  :
                  (
                    <div>
                    <input
                      type="text"
                      id="login"
                      className="fadeIn second"
                      name="username"
                      placeholder="Enter your username"
                      onChange={(e) => setSName(e.target.value)}
                    />
                    <input
                      type="password"
                      id="password"
                      className="fadeIn third"
                      name="password"
                      placeholder="Enter your password"
                      onChange={(e) => setSPassword(e.target.value)}
                    />
                  </div>
                  )

                 }

                <input
                  type="submit"
                  className="fadeIn fourth"
                  value="Let's go"
                />
              </form>

              <div id="formFooter">
                <p>
                  Have a good day! :)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SignUp;

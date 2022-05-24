import { UilPlus } from "@iconscout/react-unicons";
import axios from "axios";
import React, { useState, useEffect } from "react";

function NewGroup() {
  const [userCount, setUserCount] = useState(1);
  const [username, setUsername] = useState("");
  const [CName, setCName] = useState("");
  const [student, setStudent] = useState("");
  const [s_id, setS_Id] = useState([]);

  const id_i = localStorage.getItem("instructorId");
  
  useEffect(async() => {
    const studentData = async () => {
      const { data } = await axios.get(
        "http://127.0.0.1:8009/api/student/all-students"
      ); 
      console.log(data);
      setUsername(data);
    };
    studentData();
  }, []);

  const addList = (e) => {
    e.preventDefault();
    if (student == "") {
      alert("Add Student");
    } else {
      const studentList =
        username &&
        username.find((el) => {
          return el.SName === student;
        });
      console.log(studentList);
      if (studentList === undefined) {
        alert("Student does not exist in the records");
      } else {
        console.log([studentList._id]);
        [studentList._id].forEach((el) => {
          console.log(s_id);
          if (s_id.indexOf(el) == -1) {
            console.log(s_id);
            s_id.push(el);
            setS_Id(s_id);
            setUserCount(userCount + 1);
          } else {
            alert("The Student has already been added in the group");
          }
          // setStudent("");
        });
      }
    }
  };
  console.log(s_id);
 
  const handleSubmit = (e) => {
    e.preventDefault();

    if (CName == "") {
      alert("Group Name Missing");
    } else if (student === "") {
      alert("Student Name Missing");
    } 
    // else if (s_id) {
    //   alert("Studnet Not Add in Your List");
    // } 
    else {
      axios
        .post("http://127.0.0.1:8009/api/class/new-group", {
          CName,
          s_id: s_id,
          id_i,
          // Secheduled_Exams,
          // Exams_Completed
        })
        .then((res) => {
          console.log("Group & student Register res", res.data);
          alert('The Group has been created')
          localStorage.setItem("newgroupToken", res.data.token);
          localStorage.setItem(
            "groupId",
            res && res.data ? res.data._id : null
          );
          // window.location.href = "/dashboard";
        })
        .catch((err) => {
          console.log("Group Register err", err.message);
        });
    }
  };
 
  console.log();
  return (
    <section className="new-group">
      <h2 className="section-title">Instructor Dashboard</h2>
      <h3 className="section-subtitle">
        Enter the following details to create a new group
      </h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter the name of group"
          name="groupName"
          onChange={(e) => setCName(e.target.value)}
        />

        <div className="new-group-username">
          <div className="username-inputs">
            {[...Array(userCount)].map((_) => (
              <input
                type="text"
                placeholder='Type the username of student'
                name="username"
                onChange={(e) => setStudent(e.target.value)}
              />
            ))}
          </div>

          {userCount === 10 ? (
            <div className="add-button" disabled>
              <UilPlus />
            </div>
          ) : student === "" ? (
            <div className="add-button" disabled>
              <UilPlus />
            </div>
          ) : (
            <div className="add-button" onClick={addList}>
              <UilPlus />
            </div>
          )}
        </div>
        
          <button className="submit-button" type="submit">
            Create
          </button>
       
      </form>
    </section>
  );
}

export default NewGroup;

import React, { useState } from 'react'
import axios from 'axios';

function AddInstructor() {
  const   [IName, setIName] = useState("");
    const [INumber, setINumber] = useState("");
    const [Rank, setRank] = useState("");
    const [IEmail, setIEmail] = useState("");
    const [IPassword, setIPassword] = useState("");
    

    const AddRegister = (e) => {
      e.preventDefault();
      const reg = /^([a-zA-Z0-9~`!@#\$%\^&\*\(\)_\-\+={\[\}\]\|\\:;"'<,>\.\?\/  ]*)@([a-zA-Z]+)\.([a-zA-Z]+)$/;
      if (IName == "") {
        alert("Enter first name");
      } else if (INumber== "") {
        alert("Enter ID");
      } else if (IEmail == "") {
        alert("Email required");
      } else if (reg.test(IEmail) === false) {
        alert("Email is invalid");
      } else if (Rank == "") {
        alert("Company name is required");
      } else if (IPassword == "") {
        alert("Password required");
      } else if (IPassword.length < 6) {
        alert("Password should be at least 6 characters");
      }  else {
        // const headerDict = {
        //   'Content-Type': 'application/json',
        //   'Accept': 'application/json',
        //   'Access-Control-Allow-Headers': 'Content-Type',
        // }
        axios
          .post("http://127.0.0.1:8009/api/instructor/add-instructor",{
            IName,
            IEmail,
            IPassword,
            INumber,
            Rank,
          })
          .then((res) => {
            // localStorage.setItem("instructorToken", res.data.token);
            // localStorage.setItem("instructorId", res && res.data ? res.data._id : null);
            // window.location.href = "/";
            alert("Instructor has been added")
          })
          .catch((err) => {
            console.log("Instructor Res err", err.message);
          });
      }
    };
    return (
      <section className='new-group' >
          <h2 className='section-title' > Add Instructor </h2> 
          <h3 className='section-subtitle' ></h3>

          <form onSubmit={AddRegister}>
            <input type='text' placeholder='Enter instructor name' name='instructor_name' onChange={(e)=> setIName(e.target.value)}/> 
            <input type='text' placeholder='Enter id#' name='id' onChange={(e)=> setINumber(e.target.value)}/> 
            <input type='text' placeholder='Email' name='email' onChange={(e)=> setIEmail(e.target.value)}/> 
            <input type='text' placeholder='Rank' name='Rank' onChange={(e)=> setRank(e.target.value)}/> 
            <input type='password' placeholder='Password' name='password' onChange={(e)=> setIPassword(e.target.value)}/>

            <button className='submit-button' > Submit </button>  
          </form>
      </section>
    )
}

export default AddInstructor;

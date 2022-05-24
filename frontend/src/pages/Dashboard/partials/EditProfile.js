import { UilMinus, UilPlus } from '@iconscout/react-unicons'
import { React, useState, useEffect } from 'react';
import axios from 'axios';

function EditProfile() {
    const [passBtn,setPassBtn] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [oldPassword, setOldPassword] = useState('');
    const [npassword, setNPassword] = useState('');
    const [renpassword, setRenPassword] = useState('');
    
    const [getData, setGetData] = useState('');

    const instrutorId = localStorage.getItem("instructorId");
    const studentId = localStorage.getItem("studentId");
    const adminId = localStorage.getItem("adminId");
    
    useEffect(async() => {
            if(studentId){
        const { data } = await axios.get(`http://127.0.0.1:8009/api/student/${studentId}`);
        console.log(data);
        setName(data.SName);
        setGetData(data)
      } else if(instrutorId) {
        const { data } = await axios.get(`http://127.0.0.1:8009/api/instructor/${instrutorId}`);
        setGetData(data)
        setName(data.IName)
        } else if(adminId) {
          const { data } = await axios.get(`http://127.0.0.1:8009/api/student/${adminId}`);
          console.log(data);
          setGetData(data)
          setName(data.SName)
        } else {
          console.log('Data not found');
        }
    }, []);
  

    const handleSubmit = (e)=> {
    e.preventDefault();
    
    if(studentId) {
      if(oldPassword == ''){
        alert('Enter Old Password')
      } else if(oldPassword !== getData.oldPassword) {
      alert('Incorrect Old Password')
      } else if(npassword == ''){
      alert('Enter New Password')
      } else if(renpassword == ''){
      alert('Enter Confirm Password')
      } else if (npassword !== renpassword) {
        alert('Password Not the Same')
      }
      else {
        console.log(studentId);
        axios.put(`http://127.0.0.1:8009/api/student/${studentId}`, {
          SName: name,  
          oldPassword,
          SPassword: renpassword,
          },{
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("studentToken")}`
            }
          })
          .then((res) => {
            alert('Password Updated');
            
          })
          .catch((err) => {
            console.log("Enter Valid Data", err.message);
          });
      }
    };

    if(instrutorId) {
      if(oldPassword == ''){
        alert('Enter Old Password')
      } else if(oldPassword !== getData.oldPassword) {
      alert('Incorrect Old Password')
      } else if(npassword == ''){
      alert('Enter New Password')
      } else if(renpassword == ''){
      alert('Enter Confirm Password')
      } else if (npassword !== renpassword) {
        alert('Password Not the Same')
      }
      else {
        axios.put(`http://127.0.0.1:8009/api/instructor/${instrutorId}`, {
          IName: name,  
          oldPassword,
          IPassword: renpassword,
          }
          ,{
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("instructorToken")}`
            }
          }
          )
          .then((res) => {
            alert('Password Updated');
           
          })
          .catch((err) => {
            console.log("Enter Valid Data", err.message);
          });
      }
    }
  

    if(adminId) {
      if(oldPassword == ''){
        alert('Enter Old Password')
      } else if(oldPassword !== getData.oldPassword) {
      alert('Incorrect Old Password')
      } else if(npassword == ''){
      alert('Enter New Password')
      } else if(renpassword == ''){
      alert('Enter Confirm Password')
      } else if (npassword !== renpassword) {
        alert('Password Not the Same')
      }
      else {
        axios.put(`http://127.0.0.1:8009/api/student/${adminId}`, {
          SName: name,  
          oldPassword,
          SPassword: renpassword,
          }
          ,{
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("adminToken")}`
            }
          }
          )
          .then((res) => {
            alert('Password Updated');
           
          })
          .catch((err) => {
            console.log("Enter Valid Data", err.message);
          });
      }
    }
  };
      
    return (
        <section className='edit-profile' >
           <h2 className='section-title' > {name} Dashboard </h2> 
           <h3 className='section-subtitle' > Edit profile </h3>

           <form onSubmit={handleSubmit}>
               <div className='username-inputs' >
                  <input type='text' placeholder='Enter name' name='groupName' value={name} onChange={(e)=> setName(e.target.value)}/>                   
               </div>    

               {/* ---- CHANGE PASS 1 ----  */}
               <div className='step' > 
                <div className='step-head' >
                  Change password 
                  <div className='step-toggle-btn' onClick={() => setPassBtn(!passBtn)} >{!passBtn ? <UilPlus/> : <UilMinus/> }</div>
                </div>

                {passBtn && (
                  <div className='username-inputs' > 
                    <input type='password' placeholder='Enter old password' name='groupName' onChange={(e)=> setOldPassword(e.target.value)}/> 
                    <input type='password' placeholder='Enter new password' name='groupName' onChange={(e)=> setNPassword(e.target.value)}/> 
                    <input type='password' placeholder='Re-enter password' name='groupName' onChange={(e)=> setRenPassword(e.target.value)}/> 
                  </div>
                )}
              </div>
              <button type="submit" className='submit-button'>Save change</button> 
           </form>
        </section>
    )
}

export default EditProfile

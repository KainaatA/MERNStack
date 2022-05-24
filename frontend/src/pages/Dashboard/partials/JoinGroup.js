import React, {useState, useEffect} from 'react';
import axios from 'axios';

function JoinGroup() {
    const [group, setGroup] = useState('');
    const studentId = localStorage.getItem("studentId");

    // useEffect(async() =>  {
    // const { data } = await axios.get('http://127.0.0.1:8009/api/class/new-group');
    // console.log(data);
    // });

    const handleSubmit = (e)=> {
        e.preventDefault();
        if(group == '') {
            alert('Join the grpup')
        } else {
            axios
          .post("http://127.0.0.1:8009/api/group/join-group", ({
            s_id  :studentId, 
            join: group
           
          }))
          .then((res) => {
            console.log("Join the Group res", res.data);
            alert('Successfully Join')
          })
          .catch((err) => {
            console.log("Register err", err.message);
          });
        }

    }


    return (
        <section className='join-group' >
           <h2 className='section-title' > Student dashboard </h2> 
           <h3 className='section-subtitle' > join a group </h3>

           <form onSubmit={handleSubmit}>
              <input type='text' placeholder='Enter the name of group' name='groupName' onChange={(e)=> setGroup(e.target.value)}/> 
              
              <button className='submit-button' type='submit'>Join</button> 
           </form>
        </section>
    )
}

export default JoinGroup

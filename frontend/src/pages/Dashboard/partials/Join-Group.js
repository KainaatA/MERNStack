import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../dashboard.css';

function JoinGroupStudents() {
  const [students, setStudents] = useState('')
  
  useEffect(async() => {
  const { data } = await axios.get('http://127.0.0.1:8009/api/group/join-students');
  setStudents(data)
  }, []);
  console.log(students);
      
    return (
        <section className='attendance' >
           <h2 className='section-title' >Join Student Dashboard </h2> 
           <h3 className='section-subtitle' > Which Student Join the Group </h3>

           <div className='attendance-table' >
              
                <table id="students">
                    <tr>
                        <th>Student Name</th>
                        <th>Email </th>
                        <th>Student Number </th>
                        <th>Group Name</th>
                    </tr>
                   
                      {
                      students &&  students.map((student)=> {
                          return (                            
                              student.s_id.map((el)=> {
                                  return (
                                    <tr>
                                      <td>{el.SName}</td>
                                      <td>{el.SEmail}</td>
                                      <td>{el.SNumber}</td>
                                      <td>{student.join}</td>
                                    </tr>
                                  )
                              })
                            
                          )
                        })
                      }
                    
                </table>
           </div>
        </section>
    )
}

export default JoinGroupStudents
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../dashboard.css';

function Attemdamce() {
      
    return (
        <section className='attendance' >
           <h2 className='section-title' > Attendance record </h2> 
           <h3 className='section-subtitle' > Following is the Attendance record as per the checks mark by you </h3>

           <div className='attendance-table' >
              
                <table id="students">
                    <tr>
                        <th>Student names</th>
                        <th> Facial Recognition Attendance </th>
                        <th> Audio Recognition Attendance </th>
                        <th> Final Count </th>
                    </tr>

                </table>
           </div>
        </section>
    )
}

export default Attemdamce
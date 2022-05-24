import { UilPlusCircle } from '@iconscout/react-unicons'
import React, { useState, useEffect } from 'react'
import './createExam.css'
import ExamBox from './partials/ExamBox'
import Questionnaire from './partials/Questionnaire'

import axios from 'axios';


function CreateExam() {
    const [addBox,setAddBox] = useState(1);
    const [examArray, setExamArray] = useState([]);

    // console.log('addBox',addBox);
    const handleSubmit = (e)=> {
      e.preventDefault();
      // console.log('e.target.value',[...new Array(addBox)]);
      console.log('examArray', examArray);
      
    // http://127.0.0.1:8009/api/autoexam 
    }

    return (
        <div className='create-exam-body' >
            <div className='container' >
               <h2 className='section-title' > Create an exam </h2> 
               <Questionnaire/>
              <button className="submit-button" onClick={(e) => window.location.href = "/dashboard/create-exam"}>
                Go Back
              </button>
                
               {/* <div className='create-exam-content' >
                  <form onSubmit={handleSubmit}>
                    {
                      [...new Array(addBox)].map(_ => <Questionnaire examArray={examArray} addBox={addBox}/>)
                    }

                    <button type="submit" className='submit-button' > Create </button>
                  </form>  
                    
                  <div className='collapse-box' >
                    <UilPlusCircle className='collapse-button' onClick={() => setAddBox(addBox + 1)} />      
                  </div>  
               </div> */}
            </div>      
        </div>
    )
}

export default CreateExam

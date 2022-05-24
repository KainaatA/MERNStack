import { UilPlusCircle } from '@iconscout/react-unicons'
import React, { useState, useEffect } from 'react'
import './AttemptExam.css'
import Questionnaire from './partials/Questionnaire'
import { useHistory } from "react-router-dom";
//import Record from './../../components/sections/JavaScript'


function AttemptExam() {
    const history = useHistory();
    const data = history.location.state.data
    return (
        <div className='create-exam-body' >
            <div className='container' >
                <h2 className='section-title' > Attempt an exam </h2>
                <Questionnaire data={data}/>
                
            </div>
        </div>
    )
}

export default AttemptExam
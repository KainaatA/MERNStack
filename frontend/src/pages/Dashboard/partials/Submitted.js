import React, {useState, } from 'react';
import { useHistory } from 'react-router-dom';


function Submitted() {
   const history = useHistory();
    const handleClick = (e)=> {
        e.preventDefault();
    history.push('/dashboard/take-exam')
   }

    return (
        <section className='submitted-exam' >
           <h2 className='section-title' > Exam Successfully Submitted</h2> 
                 
              <button className='submit-button' onClick={handleClick}>Thanks For Submitted Exam! click here</button> 
           
        </section>
    )
}

export default Submitted;

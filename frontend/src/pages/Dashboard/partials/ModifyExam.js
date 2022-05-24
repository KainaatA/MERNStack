import { UilMinus, UilPlus } from '@iconscout/react-unicons'
import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../../global.css'

function AiFeedback() {
    const [showGroup,setShowGroup] = useState(false)
    const [showExmType,setShowExmType] = useState(false)

    return (
        <section className='feedback' >
           <h2 className='section-title' > Modify exam </h2> 
           <h3 className='section-subtitle' > </h3>

           <form action='#' >
              {/* ---- STEP 1 ----  */}
              <div className='step' > 
                <div className='step-head' >
                  Select Exam
                  <div className='step-toggle-btn' onClick={() => setShowGroup(!showGroup)} >{!showGroup ? <UilPlus/> : <UilMinus/> }</div>
                </div>

                {showGroup && (
                  <div className='exam-link' > 
                    <Link to='#' > Exam num 1 </Link>
                    <Link to='#' > Exam num 2 </Link>
                    <Link to='#' > Exam num 3 </Link>
                  </div>
                )}
              </div>

              <div className='button-group' >
                <button className='submit-button' > Delete </button>
                <button className='submit-button' > Modify </button>
              </div>    
            
           </form>
        </section>
    )
}

export default AiFeedback

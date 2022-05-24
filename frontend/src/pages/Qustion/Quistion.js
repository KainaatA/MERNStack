import React from 'react'
import { Link } from 'react-router-dom'
import './quistion.css'

function Quistion() {
    return (
        <div className='quistion' >
           <div className='container' > 
              <div className='quistion-card' >

                <div className='quistion-card-btns' >
                  <Link to='/login' className='button buttton--flex' >I am an instruction!</Link>
                  <Link to='/login'className='button buttton--flex' >I am a student!</Link>                
                </div>    

                <div className='quistion-card-text' >
                  Hey, Choose who you are to access this relevant funtionalities!
                </div>

              </div>


           </div> 
        </div>
    )
}

export default Quistion

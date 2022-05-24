import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'

function Home() {
   return (
      <>
         <div className='home' >
            <div className='home-card' >
               <Link to='/login#instructor' value="instructor" className='button buttton--flex' >I am an Instructor</Link>
               <Link to='/login#student'className='button buttton--flex' >I am a Student</Link>  
               <Link to='/login#admin' className='button button--flex' > I am Admin </Link>
            </div>
         </div>
      </>
   )
}

export default Home
import { UilApps, UilBagAlt, UilEstate, UilTimes, UilUser } from '@iconscout/react-unicons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../global.css';
import './header.css';
import Home from '../../../pages/home/Home'

function Header() {
   const [navToggle,setNavToggle] = useState(false);
   
   const instrutorId = localStorage.getItem("instructorId");
  const studentId = localStorage.getItem("studentId");
  const adminId = localStorage.getItem("adminId");


    return (
      <>
         <header className="header" id="header">
            <div className="nav container" >
               
               {/* <Link to="Home" value="Home" className="nav__logo" style={{width:'60px'}} >
               </Link> */}

               

               <div className={`nav__menu ${navToggle ? 'show__menu' : ''}`} id="nav__menu" >
               {
                 instrutorId ||  studentId || adminId ? 
                 (
                  <ul className="nav__list grid" >
                     {<li className="nav__item" > 
                        {<Link to="/" className="nav__link" >
                           <UilEstate className="nav__icon" /> Home  
                        </Link>}
                     </li>}

                     {/* <li className="nav__item" > 
                        <Link to="/dashboard/add-student" className="nav__link" >
                           <UilUser className="nav__icon" /> Dashboard 
                        </Link>
                     </li>

                     <li className="nav__item" > 
                        <Link to="/create-exam" className="nav__link" >
                           <UilBagAlt className="nav__icon" /> Create exam  
                        </Link>
                     </li>  */}
                  </ul> 
  
                 ) :
                 (
                  <ul className="nav__list grid" >
                     <li className="nav__item" > 
                        <Link to="/" className="nav__link" >
                           <UilEstate className="nav__icon" /> Home  
                        </Link>
                     </li> 
                  </ul> 

                 )
               }
                  
                  <i className="nav__close" id="nav__close" onClick={() => setNavToggle(false)} ><UilTimes/></i>
               </div>

               <div className="nav__btns" >
                  <div className="nav__toggle" id="nav__toggle" onClick={() => setNavToggle(!navToggle)} >
                     <UilApps/>
                  </div>
               </div>
               
            </div>  
         </header>  
      </>
   )
}

export default Header

import React, { useEffect, useState } from 'react';
import '../dashboard.css';
import axios from 'axios';


function YourClasses() {
  const [classes, setClasses] = useState('');
  const [addClass, setAddClass] = useState('')
  const studentId = localStorage.getItem('studentId')

  useEffect(async() => {
    const { data } = await axios.get('http://127.0.0.1:8009/api/class/new-group')
    setClasses(data);
    const studentData = data.find((el)=> {
    const studentData = el.s_id.find((el)=> {
          return el._id === studentId
      });
    setAddClass(studentData);
          });
  }, []);

    return (
    <section className='your-classes' >
        <h2 className='section-title' > Your classes </h2> 
        <h3 className='section-subtitle' ></h3>

        <form action='#' >

          <div className='upcoming-box' >
            <p className='upcoming-box-text' >
              {
              addClass && addClass ? 
                <ul>
                  {classes.map((el)=> {
                    console.log(el);
                    return <li>{el.CName}
                    {/* <button className='submit-button' > Open </button> */}
                    </li>
                  })}
                </ul> : 
                <ul>
                  Data Not Found
                </ul>
              }
              
            </p>
            
      </div>

        </form>
    </section>
    )
}

export default YourClasses
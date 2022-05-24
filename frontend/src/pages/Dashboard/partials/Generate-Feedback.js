import React, {useState, useEffect} from 'react';
import axios from 'axios';

function JoinGroup() {
    const [feedback, setFeedBack] = useState('');


    const handleSubmit = (e)=> {
        e.preventDefault();
        if(feedback == '') {
            alert('Enter the feedback')
        } else {
            axios
          .post("", ({
           
           
          }))
          .then((res) => {
            console.log("data", res.data);
            alert('Thankyou your feedback')
          })
          .catch((err) => {
            console.log("err***", err.message);
          });
        }

    }


    return (
        <section className='generate-feedback' >
           <h2 className='section-title' > Generate FeedBack </h2> 
           <h3 className='section-subtitle' >Put a feedback </h3>

           <form onSubmit={handleSubmit}>
              <input type='text' placeholder='Enter the Feedback' name='feedback' onChange={(e)=> setFeedBack(e.target.value)}/> 
              
              <button className='submit-button' type='submit'>Feedback 01</button>  &nbsp;
              <button className='submit-button' type='submit'>Feedback 02</button> 
           </form>
        </section>
    )
}

export default JoinGroup

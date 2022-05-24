import { UilPlusCircle } from '@iconscout/react-unicons'
import React, { useState } from 'react'

function ExamBox({examArray, addBox}) {
  // console.log(examArray);
    const [addQuestion,setAddQuestion] = useState(1);
    const [options,setOptions] = useState([]);
    const [Question,setQuestion] = useState('');
    const [option,setOption] = useState('');
    
    // console.log(addBox);

    const addAutoExam = (e)=> {
      e.preventDefault();
      setAddQuestion(addQuestion + 1);
      options.push(option);
      console.log(options);
      // examArray.push({Question,options})
      // console.log(examArray);
      if(Question == ''){
        alert('Question Name')
      } else if(option == ''){
        alert('Quetion Missing')
      } else {
        // options.push(option);
        console.log('Ok');
      }
    };
    

    return (
      <div className='exam-box' >
        
          <div className='exam-box-head' >
            <input type='text' placeholder='Enter Question name' name='question-name' onChange={(e)=> setQuestion(e.target.value)}/>   
          </div>  
            
          <div className='exam-box-body' >
            <div className='form-group' >
                <p>Add questions</p>
                {
                [...new Array(addQuestion)].map((_,i) => (
                    <div>
                    <input type='radio' />
                    <input type='text' placeholder={`Question ${i}`} className='question-input' name={`question-${i}`} onChange={(e)=>setOption(e.target.value)}/>                                    
                    </div>
                ))  
                } 
            </div>  
            {/* <UilPlusCircle className='collapse-button' onClick={() => setAddQuestion(addQuestion + 1)} /> */}
            <UilPlusCircle className='collapse-button' onClick={addAutoExam} />
           
          </div>

      </div> 
    )
}

export default ExamBox

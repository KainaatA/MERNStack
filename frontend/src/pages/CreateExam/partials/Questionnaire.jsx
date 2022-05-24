import axios from "axios";
import React, { useState} from 'react'
import { UilPlusCircle } from '@iconscout/react-unicons'
import './extra.css'
function Questionnaire() {

    const instrutorId = localStorage.getItem("instructorId");
    const [questionnaire, setQuestionnaire] = useState([
        {
            'question' : '',
            'options' : [
                {
                    'text' : '',
                    'is_correct' : false
                }
        ]}
    ]);
     
    const setCorrect = (e) => {
        const qs_index = e.target.getAttribute('qs_no')
        const op_index = e.target.getAttribute('op_no')
        let data = questionnaire
        data[qs_index].options[op_index].is_correct = !data[qs_index].options[op_index].is_correct
        setQuestionnaire([...data])
    }
    
    const addOption = (e) => {
        const index = e.target.id
        let qs = questionnaire
        const to_add = {
            'text' : '',
            'is_correct' : false
        }
        qs[index].options.push(to_add)
        setQuestionnaire([...qs])
    }

    const addQuestion = (e) => {
        let qs = questionnaire
        const to_add = {
            'question' : '',
                'options' : [
                    {
                        'text' : '',
                        'is_correct' : false
                    }
                ]
            }
        qs.push(to_add)
        setQuestionnaire([...qs])
    }

    const updateQuestion = (e) => {
        let qs = questionnaire
        const qs_no = e.target.getAttribute('qs_no')
        qs[qs_no].question = e.target.value
        setQuestionnaire([...qs])
    }

    const updateOption = (e) => {
        const qs_index = e.target.getAttribute('qs_no')
        const op_index = e.target.getAttribute('op_no')
        let qs = questionnaire
        qs[qs_index].options[op_index].text = e.target.value
        setQuestionnaire([...qs])
    }

    const handleSubmit = (e)=> {
        e.preventDefault();
        var i = 0 ;
        while (i < questionnaire.length){
            if (questionnaire[i].question == ''){
                alert('Question '+(i+1)+' is empty.')
                return
            }
            var n = 0 ;
            let correct_exists = false
            while (n < questionnaire[i].options.length){
                if (questionnaire[i].options[n].text == ''){

                    alert('Option '+(n+1)+' for question '+(i+1)+' is empty.')
                    return
                }
                if (questionnaire[i].options[n].is_correct == true){

                    correct_exists = true
                }
                n = n + 1
            }
            if (correct_exists == false){
                alert('Please select a correct option for Question '+i)
                return
            }
            i = i + 1
        }
        console.log(questionnaire)
        const data = {
            'instructor' : instrutorId,
            'questionnaire' : questionnaire
        }
        axios.post('http://127.0.0.1:8009/api/exam/make-exam', {
            'questionnaire' : data
        })
        .then((res) => {
            console.log("login res", res.data);
        })
        .catch((err) => {
            console.log("login err", err.message);
        });
        alert('Your exam has been saved')
        }
    return (
        <div className='create-exam-content' >
            <div className='exam-box'>
                <form onSubmit={handleSubmit}>
                {questionnaire.map((item, idx) => 
                <>
                    <div className='exam-box-head' >
                        { (item.question === '')
                            ? <input type='text' qs_no={idx} placeholder="Please enter a question" name='question-name' onChange={updateQuestion}/>
                            : <input type='text' qs_no={idx} defaultValue={item.question} name='question-name' onChange={updateQuestion}/> 
                        }    
                    </div>  
            
                    <div className='exam-box-body'>
                        <div className='form-group'>
                            <p>Options</p>
                            {item.options.map((option, idxx) => (
                            <div>
                                <input checked={option.is_correct} onClick={setCorrect} type='radio' qs_no={idx} op_no={idxx}/>
                                { (option.text === '')
                                    ? <input type='text' qs_no={idx} op_no={idxx} placeholder="Enter an option" className='question-input' name={`question1`} onChange={updateOption}/>
                                    : <input type='text' qs_no={idx} op_no={idxx} defaultValue={option.text} className='question-input' name={`question1`} onChange={updateOption}/> 
                                }                                           
                            </div>))} 
                        </div>
            
                        <img className="add-option" id={idx} onClick={addOption} src="https://cdn-icons-png.flaticon.com/512/992/992651.png" alt="" />
                    </div>
                </>)} 
                <button type="submit" className='submit-button' onClick={handleSubmit}> Create </button>
            </form>
        </div> 
        <div className='collapse-box' >
          <UilPlusCircle className='collapse-button' onClick={addQuestion} />      
        </div>  
     </div>)}

export default Questionnaire

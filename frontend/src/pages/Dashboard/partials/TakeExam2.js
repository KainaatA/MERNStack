import React, { useState } from 'react'
import '../dashboard.css'

function TakeExam() {
    const[previewImg,setPreviewImg] = useState({img:'https://www.penworthy.com/Image/Getimage?id=C:\Repositories\Common\About%20Us\Slide1.jpg'})
   
    const imgHandler = (e) => {
      const reader = new FileReader()
        reader.onload = () => {
          setPreviewImg({img:reader.result})
        }

        reader.readAsDataURL(e.target.files[0])
    }

    return (
        <section className='new-group' >
           <h2 className='section-title' >Student's Dashboard</h2> 
           <h3 className='section-subtitle' > Hold the paper in front of your webcam to submit the exam ensure that the picture is clear & complete </h3>

           <form action='#' >
               <div className='uploadFile' >
                  <div className="upload-img">
                    <div className="left">
                      <img id="img-uploaded" src={previewImg.img} alt="No preview image" />
                    </div>
                
                    <div className="right">
                       <span className="file-wrapper">
                         <input type="file" name="photo" accept='image/*' id="imgInp" className="uploader" onChange={imgHandler} />
                         <button className="submit-button">Upload Image</button>
                      </span>
                    </div>
                  </div>
               </div>
              
              <button className='submit-button' >Submit</button> 
           </form>
        </section>
    )
}

export default TakeExam
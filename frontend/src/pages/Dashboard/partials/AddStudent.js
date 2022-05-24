import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Dropbox } from 'dropbox';
import { uuid } from "uuidv4";

let imgUploadCounter = 0
function AddStudent() {
    // const[previewImg,setPreviewImg] = useState({img:'https://www.penworthy.com/Image/Getimage?id=C:\Repositories\Common\About%20Us\Slide1.jpg'})
    // const[Images,setImages] = useState({img:'https://www.penworthy.com/Image/Getimage?id=C:\Repositories\Common\About%20Us\Slide1.jpg'})    
    const [Image, setImage] = useState("")
    const [SNumber, setSNumber] = useState("")
    const [SName, setSName] = useState("");
    const [SEmail, setSEmail] = useState("");
    const [SPassword, setSPassword] = useState("");

    // Image Upload
    const uploadToDropboxImage = async (file) => {
        var dbx = new Dropbox({ accessToken: 'HkS3AmvwAaEAAAAAAAAAAcuqg8SY7OJKWvWB86uK5eMEllPM1S6YyCaNYFGYlV6a' });
        console.log('dbx:', dbx);
        function dataURLtoFile(dataurl, filename) {

            var arr = dataurl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);

            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }

            return new File([u8arr], filename, { type: mime });
        }
        console.log(`Uploading ${SName}_${imgUploadCounter}.jpg`)
        //Usage example:
        var filestore = dataURLtoFile(file, `${SName}.jpg`);
        imgUploadCounter++
        console.log(filestore);
        dbx.filesUpload({ path: '/Image/' + filestore.name, contents: filestore })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.error(error);
            });

    };


    const AddRegister = (e) => {
        e.preventDefault();
        const reg = /^([a-zA-Z0-9~`!@#\$%\^&\*\(\)_\-\+={\[\}\]\|\\:;"'<,>\.\?\/  ]*)@([a-zA-Z]+)\.([a-zA-Z]+)$/;
        if (SName == "") {
            alert("Enter first name");
        } else if (SEmail == "") {
            alert("Email required");
        } else if (reg.test(SEmail) === false) {
            alert("Email is invalid");
        }
        else if (Image.img == "") {
            alert("Image file missing name is required");
        }
        else if (SPassword == "") {
            alert("Password required");
        } else if (SPassword.length < 6) {
            alert("Password should be at least 6 characters");
        } else {
            function dataURLtoFile(dataurl, filename) {

                var arr = dataurl.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);

                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }

                return new File([u8arr], filename, { type: mime });
            }

            //Usage example:

            axios
                .post("http://127.0.0.1:8009/api/student/add-student", ({
                    SName: SName,
                    SEmail: SEmail,
                    SNumber: SNumber,
                    Image: Image.img,
                    SPassword: SPassword
                }))
                .then((res) => {
                    console.log("Student Register res", res.data);
                    uploadToDropboxImage(res.data.Image);
                    alert("Student has been added");
                    setImage('')
                    setSNumber('')
                    setSName('')
                    setSEmail('')
                    setSPassword('')

                })
                .catch((err) => {
                    console.log("Register err", err.message);
                });
        }
    };
    // Image File
    const imgHandler = (e) => {
        const reader = new FileReader()
        reader.onload = () => {
            setImage({ img: reader.result })
        }

        reader.readAsDataURL(e.target.files[0])
    };


    return (
        <section className='new-group' >
            <h2 className='section-title' > Add student's </h2>
            <h3 className='section-subtitle' ></h3>

            <form onSubmit={AddRegister}>
                <input type='text' placeholder='Enter student name' name='name' onChange={(e) => setSName(e.target.value)} value={SName} />
                <input type='text' placeholder='Enter Reg#' name='reg' onChange={(e) => setSNumber(e.target.value)} value={SNumber} />
                <input type='text' placeholder='Email' name='email' onChange={(e) => setSEmail(e.target.value)} value={SEmail} />
                <input type='password' placeholder='Password' name='password' onChange={(e) => setSPassword(e.target.value)} value={SPassword} />

                <div className='uploadFile' >
                    <div className="upload-img">
                        <div className="left">
                            <img id="img-uploaded" src={Image.img} alt="No preview image" />
                            {/* <input type="file" /> */}
                        </div>

                        <div className="right">
                            <span className="file-wrapper">
                                <input type="file" name="photo" accept='image/*' id="imgInp" className="uploader" onChange={imgHandler} />
                                <button className="submit-button">Upload Image</button>
                            </span>
                        </div>
                    </div>
                </div>

                <button className='submit-button' > Submit </button>
            </form>
        </section>
    )
}

export default AddStudent;

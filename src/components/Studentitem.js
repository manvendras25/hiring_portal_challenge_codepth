import React from 'react'
import { useState,useEffect } from 'react';
import { useFirebase } from '../context/firebase';
import avatar from "../assets/defaultpic.png"
const Studentitem = (props) => {

  const { applicant,showPdf} = props;
  const firebase=useFirebase();
  const [url, setURL] = useState(null);
  const [image,setImage]=useState(null);
  useEffect(() => {
    // console.log(props.applicant.resumeURL)
    if(props.applicant.resumeURL)
    firebase.getResumeURL(props.applicant.resumeURL).then((url) => setURL(url));
    if(props.applicant.imageURL)
    firebase.getImageURL(props.applicant.imageURL).then((image) => setImage(image));
    console.log(props);


  console.log(applicant)}, []);




  return (
    <>

      <div className="card mb-3 mx-2" style={{ maxWidth: "20rem" }}>
        <div className="row g-0 ">
          <div className="col-md-4">
            <div className="">
              <img src={image||avatar} className="img-fluid applicant-card-img" alt="..." />
            </div></div>
          <div className="col-md-8">
            <div className="card-body pe-0 pb-0">
              <h5 className="card-title pb-0">{applicant.userName}</h5>
              <p className="card-text">{applicant.userEmail}</p>
              <div className="d-flex justify-content-end">
                <button className='btn btn-primary btn-resume mb-2 me-0 ' onClick={() => { showPdf(url) }}>Resume</button>
              </div></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Studentitem

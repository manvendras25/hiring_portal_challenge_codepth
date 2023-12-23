import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useFirebase } from '../context/firebase';
import { toast } from 'react-custom-alert';
import avatar from "../assets/defaultpic.png"
import Navbar from './Navbar';
import {getMessaging} from "firebase/messaging";
const ApplyFormPage = (props) => {

    const navigate = useNavigate();
    const params = useParams();
    const firebase = useFirebase();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [resume, setResume] = useState('')
    const [cover, setCover] = useState("");
    const [gender, setGender] = useState("");
    const [data, setData] = useState(null)
    const [token,setToken]=useState();
    useEffect(() => {

        const asyncf=async()=>{
                 await firebase.getOfferById(params.offerId).then(value => setData(value.data()));
           
               // firebase.getMyOffers(firebase.user.uid)?.then((offers) => setOffers(offers.docs));
               if(data){
                  await firebase.getToken(data.userEmail)?.then((value)=>setToken(value.docs[0].data().userToken));
                  console.log(data);}
                   // console.log(result);
                //    console.log(token);
            
        }
        asyncf();
       
    }, []);
    const handleClick = async (e) => {
        e.preventDefault();

        const filesize = await resume.size / 1024
        const imagesize = await cover.size / 1024;
        // console.log(avatar);
        if (filesize > 5120) {
            toast.warning("Resume size should be than 5mb")
        }
        else if (imagesize > 5120) {
            toast.warning("Image size should be than 5mb")
        }
        else {
            const result = await firebase.applyForOffer(params.offerId, name, email, resume, cover, gender);
            if (result) toast.success("Applied Successfully");
                     
            
            try {
                const message = {
                    data: {
                      score: '850',
                      time: '2:45'
                    },
                    token: token
                  };
                  
                  // Send a message to the device corresponding to the provided
                  // registration token.
                  getMessaging().send(message)
                    .then((response) => {
                      // Response is a message ID string.
                      console.log('Successfully sent message:', response);
                    })
                    .catch((error) => {
                      console.log('Error sending message:', error);
                    });
            } catch (error) {
                console.log(error);
            }


            // const message={
            //     data:{
            //         title:"New application",
            //         name:name,
            //         email:email,

            //     },
            //     token:token
            // };
            // firebase.messaging.send(message).then((response)=>{
            //     console.log('Successfully sent message:',response);

            // })
            // .catch((error)=>{
            //     console.log('Error sending message:',error);
            // });

            navigate('/');
        }



    };


    return (
        <>

            <Navbar />
            <section className='Form my-4 mx-5 '>
                <div className="container">
                    <div className="row signuprow no-gutters">
                        <div className="col-lg-7 px-5 pt-2">
                            <div><h1 className='font-weight-bold py-3'>Application Form</h1></div>
                            <form onSubmit={handleClick}>
                                <div className="form-row">
                                    <input type="name" placeholder="Name" className="form-control my-3 p-3" value={name} onChange={(e) => setName(e.target.value)} id="name" name="name" aria-describedby="emailHelp" minLength={2} required />

                                </div>
                                <div className="form-row">
                                    <input type="email" placeholder="Email-Address" className="form-control my-3 p-3" value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" aria-describedby="emailHelp" minLength={3} required />

                                </div>
                                <div className="form-row">
                                    <input type="file" id="resume" name="resume" accept='.pdf' className="form-control my-3 p-3" onChange={(e) => setResume(e.target.files[0])} required />
                                </div>
                                <div className="form-row">
                                    <input type="radio" name="gender" value="Male" required onChange={e => setGender(e.target.value)} />
                                    <label className="form-check-label " htmlFor="flexRadioDisabled">
                                        <h6 className='font-weight-bold py-2'>Male</h6>
                                    </label>
                                </div>
                                <div className="form-row">
                                    <input type="radio" name="gender" value="Female" required onChange={e => setGender(e.target.value)} />
                                    <label className="form-check-label" htmlFor="flexRadioCheckedDisabled">
                                        <h6 className='font-weight-bold py-2'>Female</h6>
                                    </label>
                                </div>
                                <div className="form-row">
                                    <input type="radio" name="gender" value="Other" required onChange={e => setGender(e.target.value)} />
                                    <label className="form-check-label" htmlFor="flexRadioCheckedDisabled">
                                        <h6 className='font-weight-bold py-2'>Other</h6>
                                    </label>
                                </div>

                                <button type="submit" className="btn btn1 btn-primary my-3 px-4">Submit</button>

                            </form>

                        </div>
                        <div className="col-lg-5 px-5 py-5 ">
                            <div className='contianer mb-4'>
                                <div className='d-flex justify-content-center mb-2'>
                                    <div className='profileimg-wrap'>
                                        <label htmlFor="profilepic" className="form-label profile-img ">
                                            {cover ? <img src={URL.createObjectURL(cover)} style={{
                                                borderRadius: "50%", width: "300px", height: "300px", objectFit: "cover", overflow: "hidden"
                                            }} alt="..." /> : <img src={avatar} style={{
                                                borderRadius: "50%", width: "300px", height: "300px", objectFit: "cover", overflow: "hidden"
                                            }} alt="..." />}</label>
                                    </div>
                                </div>
                            </div>
                            <input type="file" className="form-control " id="cover" name="cover" accept='.jpeg, .png, .jpg' aria-describedby="emailHelp" onChange={(e) => setCover(e.target.files[0])} required />
                        </div>

                    </div>
                </div>
            </section>



        </>
    )
};
export default ApplyFormPage;
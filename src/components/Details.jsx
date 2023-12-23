import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useFirebase } from '../context/firebase';
import { toast } from 'react-custom-alert';
import Spinner from './Spinner';
import Navbar from './Navbar';

const OfferDetailPage = () => {

    const params = useParams();
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [data, setData] = useState(null)

    // const copyToClipboard = async () => {
    //     try {
    //       const element = document.querySelector(".user-select-all");
    //       await navigator.clipboard.writeText(element.textContent);
    //       console.log("Text copied to clipboard!");
    //       toast.success("Job Link Copied");
    //     } catch (error) {
    //       console.error("Failed to copy :", error);
    //       // Optional: Display an error message to the user
    //     }
    //   };
    
    useEffect(() => {

        firebase.getOfferById(params.offerId).then(value => setData(value.data(),console.log(value.data())));
      console.log()
    }, []);


    const handleClick = async (e) => {

        e.preventDefault();
       
        navigate(`/offer/apply/${params.offerId}`)
    }

    if (data == null) return <div className='center'>  < Spinner />   </div>
    return (
        <>
            <Navbar />

            {/* <!-- Main jumbotron for a primary marketing message or call to action --> */}
      <div class="jumbotron">
        <div class="container">
          <h1 class="display-3">{data.title}</h1>
          <p> {data.description}</p><div class="location"><p>
    Location : {data.location}
</p>

<p>
    Salary : {data.salary} per annum.
</p>
</div>

<button className="btn btn-outline-primary" onClick={handleClick}>Apply</button>




        </div>
      </div>

            {/* <div>{data.title}</div>
            <div>{data.description}</div>
            <div>Job link :<p className="user-select-all">/offer/apply/{params.offerId}</p> */}
             {/* <button className='btn-secondary'onClick={copyToClipboard}>Copy Job Link</button>  */}
             {/* </div> 
            <button className="btn btn-outline-primary" onClick={handleClick}>Apply</button> */}
        </>
    )
}

export default OfferDetailPage;
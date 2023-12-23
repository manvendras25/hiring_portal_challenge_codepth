import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFirebase } from '../context/firebase';
import { toast } from 'react-custom-alert';

const Offeritem = (props) => {

    const { offer, id, updateOffer } = props;
    const inidate = new Date();
    const [curdate, setCurdate] = useState(inidate)
    const navigate = useNavigate();
    let location = useLocation();
    const firebase = useFirebase();
    // const offerdate = new Date((offer.date).slice(0, -1));

    const showApplicants = () => {
        navigate(`/offer/applicants/${id}`);
    };

    const handleClick = async (e) => {
        e.preventDefault();

        if (firebase.isLoggedIn)
            navigate(`/offer/view/${props.id}`);

        else toast.warning("Please Login")

    }

    return (
        <>

            <div className="col-md-4">

                <div className="card my-3">
                    <div className="card-body ">
                        <span className=" offer-badge position-absolute top-0 end-0 px-3 pb-0 translate-middle badge rounded-pill bg-danger">
                            <span className="visually-hidden"></span>
                        </span>
                        {/* {(curdate.getDate() - offerdate.getDate() <= 1 && curdate.getMonth() - offerdate.getMonth() <= 0 && curdate.getFullYear() - offerdate.getFullYear() <= 0) && <Newbadge />} */}
                        <div className="d-flex align-items-center ">
                            <h5 className="card-title">{offer.title}</h5>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className='mb-2 '><i class="fa-solid fa-location-dot" ></i> {offer.location}</div>
                            <div><i class="fa-solid fa-indian-rupee-sign " style={{color: "#082049"}}></i>   {offer.salary}</div>
                        </div>

                        <div className="d-flex justify-content-between">
                            {
                            (location.pathname === "/myjobs") ? <button className="btn btn-outline-primary" onClick={() => { showApplicants(offer); }} >Applicants</button> : <button className="btn btn-outline-primary" onClick={handleClick}>View</button>

                            }
                        </div>

                    </div>
                </div>

            </div >

        </>
    )
}

export default Offeritem

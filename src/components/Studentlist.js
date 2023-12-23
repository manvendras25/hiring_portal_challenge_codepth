
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import Studentitem from "./Studentitem";
import Navbar from "./Navbar";

const Studentlist = (props) => {

    const params = useParams();
    const firebase = useFirebase();

    const [applicants, setApplicants] = useState([]);

    useEffect(() => {
        firebase.getApplicants(params.offerId).then((applicants) => setApplicants(applicants.docs));

    }, []);

    const pdfref = useRef(null)

    const [pdf, setPdf] = useState()

    const showPdf = (currentpdf) => {
        pdfref.current.click();
        setPdf(currentpdf);

    }


    return (
        <>
            <Navbar />
            <div className="row my-0 d-flex justify-content-around">

                <div className="container mx-2 my-1">
                    {applicants?.length === 0 && 'No Applicants to display'}
                </div>

                {applicants?.map((applicant) => {
                    return <Studentitem key={applicant.id} showPdf={showPdf} applicant={applicant.data()} />
                })}
            </div>



            {/* <!-- Button trigger modal --> */}
            <button ref={pdfref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#resumemodal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="resumemodal" tabIndex="-5" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog  modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-2 " id="exampleModalLabel">Resume</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex justify-content-center">
                            <div style={{ width: '100%', height: '500px' }}>
                                <iframe
                                    title="PDF Viewer"
                                    src={pdf}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 'none' }}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Studentlist

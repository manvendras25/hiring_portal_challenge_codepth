import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFirebase } from '../context/firebase';
import avatar from "../assets/defaultpic.png"

const Navbar = () => {

    const firebase = useFirebase();
    let navigate = useNavigate();
    let location = useLocation();

    const handleLogout = async () => {

        await firebase.logout();
        navigate('/login');
    }

    return (

        // modal for logout confirmation

        <>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="logout" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Do you want to Logout?</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleLogout}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* navbar code */}

            <nav className="navbar navbar-expand-lg navbar-light nav-container">
                <div className="container-fluid ">
                    <Link className="navbar-brand" to="/"><h3 className='font-weight-bold '>Codepth</h3></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/"><p className='nav-ele'>Home</p></Link>
                            </li>

                            {firebase.isLoggedIn ? <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/myjobs" ? "active" : ""}`} to="/myjobs"><p className='nav-ele'>My Jobs</p></Link>
                            </li> : ""
                            }
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about"><p className='nav-ele'>About</p></Link>
                            </li>


                        </ul>
                        {!firebase.isLoggedIn ? <form className="d-flex">
                            <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                        </form> : <section><img src={avatar} className="nav-avatar mx-2" alt="..." /> <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#logout">
                            Logout
                        </button></section>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar

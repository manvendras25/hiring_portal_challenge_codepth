import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import { toast } from "react-custom-alert"
import "./login.css"
import loginimg from "../../assets/login.jpg"
import { useFirebase } from '../../context/firebase';



const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();

    const firebase = useFirebase();
    console.log(firebase);


    useEffect(() => {
        if (firebase.isLoggedIn) {
            // navigate to home
            toast.success("Login Successfull");
            navigate('/');
        }
    }, [firebase, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Loging in user....');

        try {
            const result = await firebase.signinUserWithEmailAndPassword(credentials.email, credentials.password);
            
            console.log('Log in successfull....', result);
        } catch (error) {
            toast.error(error.message)
        }

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Navbar />
            <section className='Form my-5 mx-5'>
                <div className="container">
                    <div className="row loginrow no-gutters">
                        <div className="col-lg-5 px-0">
                            <img src={loginimg} className='img-fluid loginimg' alt="..." />
                        </div>
                        <div className="col-lg-7 px-5 pt-5">
                            <div><h1 className='font-weight-bold py-3'>Codepth</h1></div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <input type="email" placeholder="Email-Address" className="form-control my-3 p-4" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-row">
                                    <input type="password" placeholder="*******" className="form-control my-3 p-4" value={credentials.password} onChange={onChange} name="password" id="password" />
                                </div>
                                <button type="submit" className="btn btn1 btn-dark my-3">Login</button>
                            </form>
                            <div className='d-flex justify-content-between'>
                                <div className='my-4'>
                                    <p>Login with google</p>
                                    <button onClick={firebase.signinWithGoogle} className="btn btn2">
                                        <i className="fa-brands fa-google "></i>
                                    </button>
                                </div>
                                <div className='my-4'>
                                    <p>Don't have any account?</p><Link to="/signup"> Register here</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login

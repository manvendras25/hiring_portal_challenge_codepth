import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from "react-custom-alert"
import { useState, useEffect } from 'react'
import Navbar from '../Navbar';
import "./signup.css"
import { useFirebase } from '../../context/firebase';


const Signup = (props) => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", userType: "Student" })



    useEffect(() => {
        if (firebase.isLoggedIn) {
            // navigate to home
            toast.success("Sign Up Successfull");
            navigate('/');
        }
    }, [firebase, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Signing in user....');

        try {
            const result = await firebase.signupUserWithEmailAndPassword(credentials.email, credentials.password);
            console.log('Sign in successfull....', result);
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
            <section className='Form my-4 mx-5 '>
                <div className="container">
                    <div className="row signuprow no-gutters">
                        <div className="col-lg-7 px-5 pt-2">
                            <div><h1 className='font-weight-bold py-3'>Codepth</h1></div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <input type="name" placeholder="Name" className="form-control my-3 p-3" value={credentials.name} onChange={onChange} id="name" name="name" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-row">
                                    <input type="email" placeholder="Email-Address" className="form-control my-3 p-3" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-row">
                                    <input type="password" placeholder="*******" className="form-control my-3 p-3" value={credentials.password} onChange={onChange} name="password" id="password" />
                                </div>

                                <button type="submit" className="btn btn1 btn-dark my-3 px-4">SignUp</button>

                            </form>
                            <div className='d-flex justify-content-between'>
                                <div className='my-4'>
                                    <p>Login with google</p>
                                    <button onClick={firebase.signinWithGoogle} className="btn btn2">
                                        <i className="fa-brands fa-google "></i></button>
                                </div>
                                <div className='my-4 mb-4'>
                                    <p>Already have an account?</p><Link to="/login">Login here</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 px-0">
                            <img src="https://img.freepik.com/free-vector/successful-financial-operation-cash-currency-money-income-credit-approval-savings-insurance-finance-contract-creative-budget-management_335657-2094.jpg?w=740&t=st=1686698730~exp=1686699330~hmac=02aa3718351f5404fceb99a95d005080fa7d65ed4e5dd21233c75d5a0d2724b0" className='img-fluid signupimg' alt="..." />
                        </div>

                    </div>
                </div>
            </section>

        </>
    )
}

export default Signup

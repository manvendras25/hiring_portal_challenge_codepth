import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/firebase';
import Navbar from './Navbar';
import { toast } from 'react-custom-alert';
const AddOffer = () => {

    const navigate=useNavigate();
    const firebase=useFirebase();
    const [offer, setOffer] = useState({ title: "", description: "", tag: "" ,location:"",salary:""})

    const handleClick = async(e) => {
        e.preventDefault();

       await firebase.handleCreateNewListing(offer.title,offer.description,offer.tag,offer.location,offer.salary);

        setOffer({ title: "", description: "", tag: "" ,location:"",salary:""})
         navigate('/')
        toast.success("Added successfully!");
    }

    const onChange = (e) => {
        setOffer({ ...offer, [e.target.name]: e.target.value })
    }


    return (
        <>
        <Navbar/>
        <div className="container my-3">
            <h2>Add Job</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={offer.title} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea type="textarea" className="form-control" id="description" name="description" value={offer.description} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input type="text" className="form-control" id="location" name="location" value={offer.location} onChange={onChange} minLength={2} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="salary" className="form-label">Salary</label>
                    <input type="number" className="form-control" id="salary" name="salary" value={offer.salary} onChange={onChange} minLength={1} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={offer.tag} onChange={onChange} minLength={5} required />
                </div>


                <button disabled={offer.title.length < 5 || offer.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Offer</button>
            </form>
        </div>
        </>
    )
}

export default AddOffer

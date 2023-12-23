import React, { useContext, useEffect, useRef, useState } from 'react'
import Offeritem from './Offeritem';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/firebase';
import { toast } from 'react-custom-alert';
import Spinner from './Spinner';

const Offers = (props) => {

    const firebase = useFirebase();
    let navigate = useNavigate();
    const [load, setLoad] = useState(true);
    const [offers, setOffers] = useState([]);

    useEffect(() => {

        const asyncFn = async () => {
            setLoad(true);

            await firebase.getAllOffers().then((offers) => setOffers(offers.docs));

            setLoad(false);
        };
        asyncFn();

    }, [])

    const handleClick = (e) => {
        e.preventDefault();
        if (firebase.isLoggedIn)
            navigate('/addoffer');
        else toast.warning("Please Login");

    }

    return (
        <>
            <div className="row my-5 mx-0">

                <div className='d-flex justify-content-between mb-3'><h2>All Jobs</h2>   <button className="btn btn-primary mb-4" type="button" onClick={handleClick}>Want to Add</button></div>
                {load ? <Spinner /> : <>
                    <div className="container mx-2">
                        {offers.length === 0 && 'No offers to display'}
                    </div>
                    {
                        offers.map((off) => {
                            return <Offeritem key={off.id} id={off.id} offer={off.data()} />
                        })
                    }</>
                }
            </div>
        </>
    )
}

export default Offers

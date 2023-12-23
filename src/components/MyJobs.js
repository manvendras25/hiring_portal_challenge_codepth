import React, {  useEffect, useState } from 'react'

import Offeritem from './Offeritem';
import Spinner from './Spinner';
import Navbar from './Navbar';
import { useFirebase } from '../context/firebase';

const MyJobs = () => {

    const firebase = useFirebase();
    const [offers, setOffers] = useState([]);
    const [load, setLoad] = useState(true);
  
    useEffect(() => {
        if (firebase.isLoggedIn)
            firebase.getMyOffers(firebase.user.uid)?.then((offers) => setOffers(offers.docs));
        if(offers)setLoad(false);
    }, [firebase]);



    // if (!firebase.isLoggedIn) { return <h1>Please Log in..</h1> }

    return (
        <>
            <Navbar />

            <div className="row my-3 mx-4 d-flex">
                <h2 className='text-center mb-4'> Jobs </h2>
                {
                    load ? <Spinner /> : <>
                        <div className="container mx-2">
                            {offers?.length === 0 && 'No offers to display'}
                        </div>
                        {offers.map((offer) => {
                            return <Offeritem key={offer.id} id={offer.id} offer={offer.data()} />

                        })}
                    </>}

            </div>
        </>
    )
}

export default MyJobs

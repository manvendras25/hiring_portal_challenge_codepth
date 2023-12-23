// import Offers from './Offers';
// import AllOffers from './AllOffers'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Offers from './Offers';

export const Home = () => {

    let navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className="container">
                {
                    <Offers />
                }
            </div>
        </>
    )
}

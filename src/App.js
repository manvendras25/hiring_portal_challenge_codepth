
import './App.css';
import { useState,useEffect } from 'react';
import {Routes,Route} from 'react-router-dom';
import { Home } from './components/Home';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import AddOffer from './components/AddOffer';
import Details from './components/Details';
import ApplyFormPage from './components/Applyform';
import MyJobs from './components/MyJobs';
// import Dashboard from './components/Dashboard';
import { useFirebase } from './context/firebase';
import Studentlist from './components/Studentlist';
import {getToken} from "firebase/messaging"
 function App() {
const [email,setEmail]=useState('');
const [token,setToken]=useState('')
const firebase=useFirebase();



async function requestPermission()
{
 const permission= await Notification.requestPermission()
 if(permission==='granted')
 {
  // generate token
  
  const token =await getToken(firebase.messaging,{vapiKey:'BAYOijdBAxkr_1aBZqef2JlAtsrH_KY_OG7dkeuwvDuV4z7GTEGzANJXm-Dz48YoviG6vAJOM7h3CrjWtgNFHZE'})
  console.log('Token Generated',token);
  setToken(token);
      await firebase.createUser(token);
      // console.log(result.docs);



 }
 else if(permission==='denied')
 {
  alert("You denied for the notifications!!");
 }
}
useEffect(()=>{
requestPermission();
},[]);
// console.log('Firebase', firebase);
  return (
    <>

  
            <div className='my-0'>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} /> 
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/addoffer" element={<AddOffer />} />
                <Route exact path="/myjobs" element={<MyJobs />} />
                <Route exact path="/offer/applicants/:offerId" element={<Studentlist />} />
                <Route exact path="/offer/view/:offerId" element={<Details />} />
                <Route exact path="/offer/apply/:offerId" element={<ApplyFormPage token={token} />} />
                {/* <Route exact path="/studentlist/:id" element={<Studentlist />} />
                <Route exact path="/dashboard" element={<Dashboard />} />  */}

              </Routes>
            </div>
            {/* <div>
          <Routes>
          </Routes>
        </div> */}

        
   

  </>
  );
}

export default App;

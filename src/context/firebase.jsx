import { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut,

} from 'firebase/auth'
import {getMessaging} from "firebase/messaging";

import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where } from 'firebase/firestore'

import {
getStorage,ref,uploadBytes,getDownloadURL
} from 'firebase/storage'
import { toast } from 'react-custom-alert';

const FirebaseContext = createContext(null);


const firebaseConfig = {
    apiKey: "AIzaSyBNwPmF7CwGPm1I2cvloHklUpVCiZEkIjg",
    authDomain: "codepth-challenge.firebaseapp.com",
    projectId: "codepth-challenge",
    storageBucket: "codepth-challenge.appspot.com",
    messagingSenderId: "226387316290",
    appId: "1:226387316290:web:efce7ede0fdca024c4a7db",
    //   databaseURL: 'https://codepth-challenge-default-rtdb.firebaseio.com/'
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);

const messaging = getMessaging(firebaseApp);

const firebaseAuth = getAuth(firebaseApp);

const firestore = getFirestore(firebaseApp);

const storage =getStorage(firebaseApp);

const googleProvider = new GoogleAuthProvider();



export const FirebaseProvider = (props) => {

    const [user, setUser] = useState(null)
  
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) setUser(user);
            else setUser(null);
           
        })
    }, []);

  
    const signupUserWithEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(firebaseAuth, email, password)
    };

    const signinUserWithEmailAndPassword = (email, password) => {
        return signInWithEmailAndPassword(firebaseAuth, email, password)
    };
    




    const getAllOffers = () => {
        return getDocs(collection(firestore, 'offers'));
    };



    const applyForOffer = async (offerId, name, email,resume,cover,gender) => {
       
        const collectionRef = collection(firestore, 'offers', offerId, 'applicants');

        const q = query(collectionRef, where('userEmail', '==', email));
        const result = await getDocs(q);
        // console.log(result.empty);
        if(!result.empty){
            toast.warning("Already applied !");
            return null;
        }

        const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
        const uploadImage = await uploadBytes(imageRef, cover);

        const resumeRef = ref(storage, `uploads/resumes/${Date.now()}-${resume.name}`);
        const uploadResult = await uploadBytes(resumeRef, resume);
        
        return await addDoc(collectionRef, {
            userName: name,
            userEmail: email,
            userGender: gender,
            resumeURL:uploadResult.ref.fullPath,
            imageURL: uploadImage.ref.fullPath,

        });
    };
    

    const getImageURL = (path) => {
        return getDownloadURL(ref(storage, path));
      };

      
    const getResumeURL = (path) => {
  
        return getDownloadURL(ref(storage,path));
      };

    const getOfferById = async (id) => {
        const docRef = doc(firestore, 'offers', id);
        const result = await getDoc(docRef);
        return result;
    }
    console.log(user);

    const getMyOffers = async (userId) => {

        const collectionRef = collection(firestore, 'offers');
        console.log(user);
        const q = query(collectionRef, where('userId', '==', userId));
        const result = await getDocs(q);
        return result;
        // console.log("offer",result);
    }

    const getApplicants = async (id) => {
        const collectionRef = collection(firestore, "offers", id, "applicants");
        const result = await getDocs(collectionRef);
        return result;
    };
    const handleCreateNewListing = async (title, description, tag, location, salary) => {


        return await addDoc(collection(firestore, 'offers'), {
            title,
            description,
            tag,
            location,
            salary,
            userId: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,

        })

    }
    const createUser=async (token)=>
    {


        const collectionRef = collection(firestore, 'users');
        if(user){
        const q = query(collectionRef, where('userEmail', '==', user.email));
        const result = await getDocs(q);
        // console.log(result.empty);
        if(!result.empty){
         
            return null;
        }
        return await addDoc(collection(firestore,'users'),{
        
            userEmail:user.email,
            userId:user.uid,
            userToken:token,

        })
    }
    }
    const getToken=async (email)=>{
        const collectionRef = collection(firestore, 'users');
        const q = query(collectionRef, where('userEmail', '==', email));
       
        console.log(user);
        const result = await getDocs(q);
        return result;

    }

    const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

    const logout = () => signOut(firebaseAuth);
    const isLoggedIn = user ? true : false;
    return (
        <FirebaseContext.Provider
            value={{
                signupUserWithEmailAndPassword,
                signinUserWithEmailAndPassword,
                signinWithGoogle,
                handleCreateNewListing,
                logout,
                getAllOffers,
                getApplicants,
                getOfferById,
                applyForOffer,
                getMyOffers,
                getResumeURL,
                getImageURL,
                createUser,
                getToken,
                messaging,
                user,
                isLoggedIn,


            }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}


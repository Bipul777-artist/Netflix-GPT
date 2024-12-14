import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useRef } from "react";
import { ValidPassword } from "../utils/Validatation";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";


const SignUp = () => {
    const dispatch = useDispatch();
    const [email, SetEmail] = useState();
    const [error, setError] = useState();
    const password = useRef()
    const name = useRef()

    const CreateAccount = () => {

        const validation = ValidPassword(password.current.value);
        setError(validation);
        if (validation === null)
       { 
            // Creating Account
            createUserWithEmailAndPassword(auth, email, password.current.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: name.current.value, photoURL: "https://yt3.ggpht.com/yti/ANjgQV-Kx9LxrybRZWRQWPDXxqpzsomRMJTMfFievpnQ60_Ki2o=s88-c-k-c0x00ffffff-no-rj"
                  }).then(() => {

                    // Profile updated!
                    const { uid, email, displayName} = auth.currentUser;
                    dispatch(addUser({ uid: uid, email: email, displayName: displayName }))
                    
                    // ...
                  }).catch((error) => {
                    // An error occurred
                    // ...
                  });
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
        })
        
    }
    }

    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        if (savedEmail) {
            SetEmail(savedEmail);
        }
    }, []);

    return (
       
        <div className="absolute w-4/5 top-1/3 left-1/5 m-5 p-3 -translate-y-1/2 md:top-1/2 md:left-1/3 md:m-5">

            <h1 className="w-full text-gray-800 font-bold my-2 text-3xl md:w-1/3">
            Create an Account to start your membership</h1>
            <p className=" my-3 text-md text-gray-600 ">Just a few more steps and you're done!
            We hate paperwork, too.</p>
            <div className="my-3">
                <h1>Email</h1>
                <h1 className="font-bold mt-2 text-gray-800 border-2 my-3 border-gray-600 rounded p-3 w-full md:w-1/3">{email}</h1>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="md:flex md:flex-col">
                <h1>Name</h1>
                <input 
                    ref={name}
                    type="Name"
                    placeholder="Your Name" 
                    className="border-2 my-3 border-gray-600 rounded p-3 w-full md:w-1/3"
                />
                <h1>Password</h1>
                <input 
                    ref={password}
                    type="Password"
                    placeholder="Shh! " 
                    className="border-2 my-3 border-gray-600 rounded p-3 w-full md:w-1/3"
                />
                <p>{error}</p>
                <button onClick={CreateAccount} className="border-2 border-red-600 my-4 text-white bg-red-600 rounded p-3 w-full md:w-1/3">
                    Next
                </button>
            </form>
        </div>
    )
}

export default SignUp;
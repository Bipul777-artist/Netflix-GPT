import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useEffect } from "react";
import { sendSignInLinkToEmail } from "firebase/auth";


const EmailVerification = () => {

    const navigate = useNavigate();

    const [emailId, SetEmailId] = useState();

    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        if (savedEmail) {
            SetEmailId(savedEmail);
        }
    }, []);

    const SkippingVerify = () => {
        navigate('/browse');
    }

    const VerifyEmail = () => {
        sendSignInLinkToEmail(auth, emailId)
        .then(() => {
            // The link was successfully sent. Inform the user.
            // Save the email locally so you don't need to ask the user for it again
            // if they open the link on the same device.
            // window.localStorage.setItem('emailForSignIn', email);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
        });
    }

    return (
        <div className="absolute w-4/5 top-1/3 left-1/5 ml-5 p-3 -translate-y-1/2 md:top-1/2 md:w-1/3 md:left-1/3 md:m-5">
            <h1 className="text-2xl my-2 text-black">Great, now let us verify your email</h1>
            <p className="text-gray-500 my-3 text-md">We will send a link to your email to verify.</p>
            <p className="text-gray-600 my-3 text-md">
            Verifying your email will improve account security and help you receive important Netflix communications.</p>
            <div className="flex flex-col w-screen">
                <button onClick={VerifyEmail} className="border-2 border-red-600 my-4 text-white bg-red-600 rounded p-3 w-full md:w-1/3">
                    Verify My Email
                </button>
                <button onClick={SkippingVerify} className= "border-2 border-gray-400 my-4 text-black bg-gray-600 rounded p-3 w-full md:w-1/3">
                    Skip this Part
                </button>
            </div>
        </div>
    )
};

export default EmailVerification;
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Header";
import HomePage from "./HomePage";
import LogIn from "./LogIn.js";
import SignUp from "./SignUp.js";
import EmailVerification from "./EmailVerification.js";
import Browse from "./Browse.js";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase.js";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice.js";


const Body = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
              const { uid, email, displayName} = user;
              dispatch(addUser({ uid: uid, email: email, displayName: displayName }))
              // ...
            } else {
              // User is signed out
              dispatch(removeUser());
            }
          })
    }, [])

    const appRouter = createBrowserRouter([
        {
            path: "/", 
            element: (
                <div className="">
                    <Header />
                    <HomePage />
                </div>
            )
        },
        {
            path: "/login", 
            element: (
                <div className="">
                    <Header />
                    <LogIn />
                </div>
            )
        },
        {
            path: "/signup", 
            element: (
                <div className="">
                    <Header />
                    <SignUp />
                </div>
            )
        },
        {
            path: "/signup/emailverification", 
            element: (
                <div className="">
                    <Header />
                    <EmailVerification />
                </div>
            )
        },
        {
            path: "/browse", 
            element: (
                <div className="">
                    <Header />
                    <Browse />
                </div>
            )
        }
    ])

    return (
        <RouterProvider router={appRouter} />
    )
};

export default Body;
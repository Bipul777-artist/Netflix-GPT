import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Header";
import HomePage from "./HomePage";
import LogIn from "./LogIn.js";
import SignUp from "./SignUp.js";
import EmailVerification from "./EmailVerification.js";
import Browse from "./Browse.js";



const Body = () => {



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
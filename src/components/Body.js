import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Header";
import HomePage from "./HomePage";
import LogIn from "./LogIn.js";

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
        }
    ])

    return (
        <RouterProvider router={appRouter} />
    )
};

export default Body;
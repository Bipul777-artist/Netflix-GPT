import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Header";
import HomePage from "./HomePage";
import LogIn from "./LogIn.js";
import SignUp from "./SignUp.js";
import EmailVerification from "./EmailVerification.js";
import Browse from "./Browse.js";
import GPTSearch from "./GPTSearch.js";
import PlayContent from "./PlayContent.js";
import FavoriteList from "./FavoriteList.js";
import Movies from "./Movies.js";
import TVSeries from "./TVSeries.js";



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
        },
        {
            path: "/GptSearchPage", 
            element: (
                <div className="">
                    <Header />
                    <GPTSearch />
                </div>
            )
        },
        {
            path: "/watch/:movieId", 
            element: (
                <div className="">
                    <Header />
                    <PlayContent />
                </div>
            )
        },
        {
            path: "/browse/my-list", 
            element: (
                <div className="">
                    <Header />
                    <FavoriteList />
                </div>
            )
        },
        {
            path: "/browse/movies", 
            element: (
                <div className="">
                    <Header />
                    <Movies />
                </div>
            )
        },
        {
            path: "/browse/tv-series", 
            element: (
                <div className="">
                    <Header />
                    <TVSeries />
                </div>
            )
        }
    ])

    return (
        <RouterProvider router={appRouter} />
    )
};

export default Body;
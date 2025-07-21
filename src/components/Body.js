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
import SecondPart from "./SecondPart.js";
import Footer from "./Footer.js";
import {lazy, Suspense, suspense} from 'react';
import VideoSkeleton from './VideoSkeleton.js';
import { LoadingSpinner } from "../utils/constant.js";

const BrowsePage = lazy(() => import('./Browse.js'));
const MoviesPage = lazy(() => import('./Movies.js'));
const TvSeries = lazy(() => import('./TVSeries.js'));
const Signup = lazy(() => import('./SignUp.js'))
const Secondpart = lazy(() => import('./SecondPart.js'))
const Login = lazy(() => import('./LogIn.js'))



const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path: "/", 
            element: (
                <div className="">
                    <Header />
                    <HomePage />
                    <Suspense fallback={<LoadingSpinner />}>
                        <Secondpart />
                    </Suspense>
                    {/* <Footer /> */}
                </div>
            )
        },
        {
            path: "/login", 
            element: (
                <div className="">
                    <Header />
                    <Suspense fallback={<LoadingSpinner />}>
                        <Login />
                    </Suspense>
                </div>
            )
        },
        {
            path: "/signup", 
            element: (
                <div className="">
                    <Header />
                    <Suspense fallback={<LoadingSpinner />}>
                        <Signup />
                    </Suspense>
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
                <Suspense fallback={<VideoSkeleton />}>
                    <BrowsePage />
                    
                </Suspense>
                <Footer />
                </div>
            )
        },
        
        {
            path: "/watch/:movieId", 
            element: (
                <div className="">
                    
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
                    <Suspense fallback={<VideoSkeleton />}>
                        <MoviesPage />
                    </Suspense>
                    
                    <Footer />
                </div>
            )
        },
        {
            path: "/browse/tv-series", 
            element: (
                <div className="">
                    <Header />
                    <Suspense fallback={<VideoSkeleton />}>
                        <tvSeries />
                    </Suspense>
                    <Footer />
                </div>
            )
        }
    ])

    return (
        <RouterProvider router={appRouter} />
    )
};

export default Body;
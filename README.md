# Things Done
    - Create React App
    - Configure Tailwind
    - Routing
    - Header
    - HomePage Basics 
    - Login Page Form
    - Sign Up Page & Form
    - Form Validation 
    - FireBase SetUp
    - Hosting WebApp In Firebase
    - Sign In & Sign Up Using API
    - Configure Redux Store & User Slice
    - Implement Sign Out
    - Update Profile 
    - Bug Fix - Updating Profile Post SignUp
    - Bug Fix - Using OnAuthStateChange API correctly. Making sure only authenticated users access the website. 
    - Bug Fix - Clearing OnAuthStateChange API 
    - Bug Fix - Unsubscribe fron OnAuthStateChange
    - TMDB Website API Call 
    - Adding Movies Data in MovieSlice (Store)
    - Custom Hook Creation & Verification
    - Movie Slice
    - Update Store with Movie Data
    - Planning For Main & Secondary Container
    - Fetch Data For Trailer Video
    - Update Store with Trailer Video
    - Embed YT Video and enable autoplay on mute
    - Secondary Container
    - Planning For Browse Page
        - Main Container
            - Videos API Call
            - Load the Movie Title, Details, Buttons
            - Load the Video
        - Secondary Container
            - Build Movie List
            - Build Movie Cart
            - Custom Hooks to Fetch Movies/Web Series Details
            - Show the Web-shows Images, use Pointers to move left and right
            -
    - GPT Search Page
        - Different Slice to control visbibility GPTSearch Page.      
        - GPT Search Component
            - GPT Search Bar
                - Multi-Language Feature in our App
                - Available Language Options Button.
                    - Create a different Constant File For Different Languages with text
                    - Add differnet Language Options in Constant File
                    - Add Options to show list of available supported Language In Header
                        - Make it dynamic.
                            - Add available languages with identifier in Constant File and make it dynamic.
                    - Change Language of Page as per user's actions/
            - GPT Movie Suggestions
                - GPT API Setup
                - API Calling for Search Bar
                - Load the result and Verify
    - SetUp Redux Persist
        - For Storing Favorites Contents
        - For storing email, for signup Page. 
    - Setting Up Netlify for Custom Function
        - Encapsulation of API key from Frontend
    - Host it in Online
    - HomePage Complete 
    - Footer
    - Skeleton for MainVideo Player and Hovered Video Player.


# My Plan & Changes
    - Sign Up Form In HomePage
        -Take Email, Push it in Local Storage, fetch Email in New page and Configure Create Account Login In New  Page -> Done
    - Login Page
        - Only write Authentication Logic   -> Done
    <!-- FOCUS AREA -->
    -Movie Card
        - When hovered or clicked, trailer should play. -> Done
        - Make the UI as close to the Netflix UI        -> Done
        - When Cards Hovered Over (Only For Large Screen), it should open and show the trailer along with basic info. -> Done
        - For mobile devices, when Cards are clicked, it should pop-out a larger screen showing trailer, details, Play Button Everything -- For Larger Devices, the same will happen when clicked on Drop Down button after hovering or clicked directly.
    - GPT PAGE
        - When content type is changed, earlier data should be cleared. -> Done
        - Shimmer Type UI, when submit is clicked



# Things to Understand
    -> Understand Navigation & Routing for PlayContent
    -> Understand Sound on/off logic
    -> PlayContent refresh not working. -> Done
    -> Content Info Work, Architecture.

# Current Issues
    - HomePage Second Part
        - Trending Videos
            - 10 posters, on click --> Get Started Button
            - More Reason to Join 
                - 4 Cards
            - FAQ - Accordian 
    - Header Items, change color when clicked
    - Footer
    - HomePage for mobile devices
    - Hover / Video Click functionality.
    - GPT Functionality and CSS
    - Lazy Loading.
    - Optimising Store Use for Fetching keys of Hovered Content

    
# Features
    -Login / SIgn Up Page
        -Sign In / SIgn Up Form
        -Post login, redirect to browse Page
        
    -Browse (Post authentication)
        - Header
        - Main Movie
            - Trailer in BG
            - Title & Description
            - Movie Suggestions
                - Movie Lists x N

    - Netflix GPT
        - Search Bar
        - Movie Suggestions
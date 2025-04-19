export const logos = {
    small : "https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.png",
    large : "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
}

export const LoginPage_img = "https://assets.nflxext.com/ffe/siteui/vlv3/4690cab8-243a-4552-baef-1fb415632f74/web/IN-en-20241118-TRIFECTA-perspective_0b813abc-8365-4a43-a9d8-14c06e84c9f3_medium.jpg"

export const HomePage_img = "https://assets.nflxext.com/ffe/siteui/vlv3/4f5e84fc-704f-49fb-8b7a-3cec295575d0/web_tall_panel/IN-en-20241021-TRIFECTA-perspective_9885128b-7e43-497f-bbd3-8ada7705b37f_large.jpg";

export const userIcon_img = "https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp";

export const dropDown_img = "https://www.svgrepo.com/show/346523/arrow-drop-down.svg";

export const DropUp_img = "https://www.svgrepo.com/show/346525/arrow-drop-up.svg";

export const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + process.env.REACT_APP_TMDB_KEY}
};

export const CLOUD_FUNCTION_URL = "https://comfy-bonbon-7c052c.netlify.app/.netlify/functions/tmdbProxy";
export const IMG_CDN = "https://image.tmdb.org/t/p/w200/";

export const Supported_Languages = [{identifier : "en", name: "English"}, {identifier : "hindi", name: "Hindi"}, {identifier : "spanish", name: "Spanish"}]

// export const GPT_API_KEY = process.env.REACT_APP_GPT_API_KEY;

// export const Another_API = process.env.REACT_APP_GPT_SECOND_API

export const Gemini_API = process.env.REACT_APP_Gemini_API

export const genre_name = 
  [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    },
    {
      "id": 10759,
      "name": "Action & Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 10762,
      "name": "Kids"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10763,
      "name": "News"
    },
    {
      "id": 10764,
      "name": "Reality"
    },
    {
      "id": 10765,
      "name": "Sci-Fi & Fantasy"
    },
    {
      "id": 10766,
      "name": "Soap"
    },
    {
      "id": 10767,
      "name": "Talk"
    },
    {
      "id": 10768,
      "name": "War & Politics"
    },
    {
      "id": 37,
      "name": "Western"
    }
]

export const genreLookUp = genre_name.reduce((lookup, genre) => {
  lookup[genre.id] = genre.name
  return lookup;
}, {})
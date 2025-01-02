
import { useSelector } from "react-redux";
import lang from "../utils/LanguageConstants";


const GPTSearchBar = () => {

    const langKey = useSelector(store => store.config.lang)
    console.log(langKey);
   

    return (
        <div className="  pt-[10%] flex justify-center">
            <form className="bg-black w-1/2 p-6 grid grid-cols-12 gap-3">
                <input className="col-span-9 px-3 py-2 border-2 border-white rounded-md w-full" type="text" 
                    placeholder={lang[langKey].gptPlaceHolder}
                />
                <button className="col-span-3 bg-red-700 px-2.5 py-1.5 text-white text-2xl border-1 border-red rounded-md">
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    )
}

export default GPTSearchBar;
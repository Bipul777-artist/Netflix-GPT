import { logos } from "../utils/constant";

const Header = () => {
    return (
        <div className="absolute top-3 left-4 z-10 md:left-24">
            <img src= {logos.large} 
                className="w-24 h-12 md:w-44 md:h-20"
            />
        </div>

    )
};

export default Header;
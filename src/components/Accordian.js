import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus,  faXmark}  from "@fortawesome/free-solid-svg-icons";

const Accordian = ({question, answer, isOpen, onToggle}) => {

    return (
        <div className="text-white">
            <div
                className="flex justify-between bg-stone-600 cursor-pointer border-b-2 border-black p-4"
                onClick={onToggle}
            >
                <h2 className="text-md md:text-xl">{question}</h2>
                <button>
                    <FontAwesomeIcon className="md:w-8 md:h-8" icon={isOpen ? faXmark : faPlus} />
                </button>
            </div>

            {isOpen && (
                <div className="p-4 bg-stone-600 transition-all duration-300 border-b-2 border-black"> {/* Added padding and background */}
                {/* Use whitespace-pre-line to respect newlines in the answer string */}
                <p style={{ whiteSpace: 'pre-line' }}>
                    {answer}
                </p>
                </div>
            )}
        </div>
    )
}
            

export default Accordian;
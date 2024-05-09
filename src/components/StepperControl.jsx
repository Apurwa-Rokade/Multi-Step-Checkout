import { useContext, useState } from "react";
import { StepperContext } from "../contexts/StepperContext";

const StepperControl = (handleSubmitProp) => {
  const { handleSubmit } = handleSubmitProp;
  const [isValid, setValid] = useState(false);
  const { handleClick, currentStep, steps } = useContext(StepperContext);

  const handleNextClick = async (e) => {
    e.preventDefault(); 

    let valid = await handleSubmit(e); // Call handleSubmit
    setValid(valid);
   
    if (valid) {
      handleClick("next"); // Advance to the next step if valid
    }
  };



  return (
    <div className="container flex justify-around mt-4 mb-8">
      {/* Back button */}
      {currentStep != 1 &&(
        <button
        type="button"
        onClick={() => handleClick("back")}
        className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out 
        ${currentStep == 1 ? "opacity-30 cursor-not-allowed" : ""}`}
      >
        Back
      </button>
      )}

      {/* Next/Submit button */}
      <button
        type="submit"
        onClick={handleNextClick}
        className={`bg-green-600 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out `}
      >
        {currentStep === steps.length - 1 ? "Confirm" : "Next"}
      </button>
    </div>
  );
};

export default StepperControl;

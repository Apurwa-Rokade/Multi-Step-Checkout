import React from "react";
import { useContext } from "react";
import { StepperContext } from "../../contexts/StepperContext";

const Final = () => {
  const {finalData} = useContext(StepperContext);
  console.log("UserData",finalData);
  return (
    
    <div className="container md:mt-10">
      <div className="flex flex-col items-center">
        <div className="text-green-400">
          <svg
            className="w-24 h-24"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1.707-4.707l-3.5-3.5a1 1 0 0 1 1.414-1.414l2.293 2.293 4.293-4.293a1 1 0 1 1 1.414 1.414l-5 5a1 1 0 0 1-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="mt-3 text-xl font-semibold uppercase text-green-500">
          Thank You for Shopping with Us !!
        </div>
        <div className="text-lg font-semibold text-gray-500">Payment done.</div>
        <a className="mt-10" href="/">
          <button className="h-10 px-5 text-green-700 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-green-500 hover:text-green-100">
            Close
          </button>
        </a>
      </div>
    </div>
  );
};

export default Final;

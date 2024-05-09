import { useState } from "react";
import { StepperContext } from "./contexts/StepperContext";
import Stepper from "./components/Stepper";
import StepperControl from "./components/StepperControl";
import Details from "./components/steps/Details";
import Payment from "./components/steps/Payment";
import Final from "./components/steps/Final";


function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({});
  const [finalData, setFinalData] = useState([]);
  const steps = ["Basic Details", "Payment", "Completed"];
  const displaySteps = (step) => {
    switch (step) {
      case 1:
        return <Details />;
      case 2:
        return <Payment />;

      case 3:
        return <Final />;
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;
    direction == "next" ? newStep++ : newStep--;
    //check if steps are within bounds

    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };
  return (
    <main className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
      {/**Stepper */}
      <div className="container horizontal mt-5">
        <Stepper steps={steps} currentStep={currentStep} />
      </div>
      {/**Display Components */}
      <div className="my-10 px-10">
        <StepperContext.Provider
          value={{
            setFinalData,
            finalData,
            userData,
            setUserData,
            handleClick,
            currentStep,
            steps,


          }}
        >
          
          {displaySteps(currentStep)}
          {/* <StepperControl/> */}
        </StepperContext.Provider>
      </div>

     
  </main>
  );
}

export default App;
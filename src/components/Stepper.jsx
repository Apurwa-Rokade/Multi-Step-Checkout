import React, { useEffect, useState } from 'react';

const Stepper = ({ steps, currentStep }) => {
  const [stepStates, setStepStates] = useState(() =>
    steps.map((description, index) => ({
      description,
      completed: index < currentStep,
      highlighted: index === currentStep - 1,
      selected: index <= currentStep - 1,
    }))
  );

  // Update step states only when currentStep changes
  useEffect(() => {
    const updatedStepStates = steps.map((description, index) => ({
      description,
      completed: index < currentStep,
      highlighted: index === currentStep - 1,
      selected: index <= currentStep - 1,
    }));

    // Check if state update is necessary
    const shouldUpdateState = updatedStepStates.some((newStepState, index) => {
      const currentStepState = stepStates[index];
      return (
        newStepState.completed !== currentStepState.completed ||
        newStepState.highlighted !== currentStepState.highlighted ||
        newStepState.selected !== currentStepState.selected ||
        newStepState.description !== currentStepState.description
      );
    });

    // Only update state if it has changed
    if (shouldUpdateState) {
      setStepStates(updatedStepStates);
    }
  }, [currentStep, steps, stepStates]);

  // Function to render each step
  const renderStep = (step, index) => (
    <div
      key={index}
      className={`flex items-center ${
        index !== stepStates.length - 1 ? 'w-full' : ''
      }`}
    >
      <div className="relative flex flex-col items-center text-teal-600">
        <div
          className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3 ${
            step.selected ? 'bg-green-600 text-white font-bold border border-green-600' : ''
          }`}
        >
          {step.completed ? (
            <span className="text-white font-bold text-xl">&#10003;</span>
          ) : (
            index + 1
          )}
        </div>
        <div
          className={`absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase ${
            step.highlighted ? 'text-gray-900' : 'text-gray-400'
          }`}
        >
          {step.description}
        </div>
      </div>
      <div
        className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
          step.completed ? 'border-green-600' : 'border-gray-300'
        }`}
      ></div>
    </div>
  );

  return (
    <div className="mx-4 p-4 flex justify-between items-center">
      {stepStates.map((step, index) => renderStep(step, index))}
    </div>
  );
};

export default Stepper;

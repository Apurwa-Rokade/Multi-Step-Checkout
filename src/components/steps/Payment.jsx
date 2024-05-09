import React, { useState } from "react";
import { useContext } from "react";
import { StepperContext } from "../../contexts/StepperContext";
import { paymentInfoSchema } from "../validationSchemas";
import StepperControl from "../StepperControl";

const Payment = () => {
  const { userData, setUserData} = useContext(StepperContext);
  const [errors, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let data = await paymentInfoSchema.validate(userData, {
        abortEarly: false,
      });
      console.log("form submitted");
      console.log("Handle submit triggered in details try block");
      return true; // Validation successful
    } catch (error) {
      console.log("Errors");
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
        console.log("Handle submit triggered in details catch block");
      });
      console.log(errors);
      setError(newErrors);
      return false; // Validation failed
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      {/* Card Number Field */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Card Number
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            name="cardNumber"
            placeholder="Card Number"
            value={userData["cardNumber"] || ""}
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />

          <img src="/MasterCard-2.png" alt="" className="w-8" />
        </div>
        {errors.cardNumber && (
          <div className="text-red-500">{errors.cardNumber}</div>
        )}
      </div>

      {/* CVV Field */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          CVV
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            name="cvv"
            value={userData["cvv"] || ""}
            placeholder="CVV"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
          {/* Add your error message display logic here */}
        </div>
        {errors.cvv && <div className="text-red-500">{errors.cvv}</div>}
      </div>

      {/* Expiry Date Fields */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Expiry Date
        </div>
        <div className="flex space-x-2">
          {/* Expiry Month Field */}
          <div className="bg-white my-2 p-1 flex border border-gray-200 rounded w-1/2">
            <input
              onChange={handleChange}
              type="text"
              name="expiryMonth"
              value={userData["expiryMonth"] || ""}
              placeholder="MM"
              className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            />
            {errors.expiryMonth && (
              <div className="text-red-500">{errors.expiryMonth} !</div>
            )}
          </div>

          {/* Expiry Year Field */}
          <div className="bg-white my-2 p-1 flex border border-gray-200 rounded w-1/2">
            <input
              onChange={handleChange}
              name="expiryYear"
              value={userData["expiryYear"] || ""}
              placeholder="YYYY"
              className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            />
            {errors.expiryYear && (
              <div className="text-red-500">{errors.expiryYear}</div>
            )}
          </div>
        </div>
        {errors.expiry && <div className="text-red-500">{errors.expiry}</div>}
      </div>

      <StepperControl handleSubmit={handleSubmit} />
    </form>
  );
};

export default Payment;

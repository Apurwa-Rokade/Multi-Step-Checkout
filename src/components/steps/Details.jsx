import React, { useState } from "react";
import { useContext } from "react";
import { StepperContext } from "../../contexts/StepperContext";
import StepperControl from "../StepperControl";
import { basicInfoSchema } from "../validationSchemas";

const Details = () => {
  const { userData, setUserData } =
    useContext(StepperContext);
  const [errors, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let data = await basicInfoSchema.validate(userData, {
        abortEarly: false,
      });
      // console.log("form submitted");
      // console.log("Handle submit triggered in details try block");
      return true; // Validation successful
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      console.log(errors);
      setError(newErrors);
      return false; // Validation failed
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          {" "}
          user Name
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["username"] || ""}
            name="username"
            placeholder="User Name"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
        {errors.username && (
          <div className="text-red-500">{errors.username}</div>
        )}
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          {" "}
          Email
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded w">
          <input
            onChange={handleChange}
            value={userData["email"] || ""}
            name="email"
            placeholder="Email"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
        {errors.email && <div className="text-red-500">{errors.email}</div>}
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          {" "}
          Mobile
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["contact"] || ""}
            name="contact"
            placeholder="Contact"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
        {errors.contact && <div className="text-red-500">{errors.contact}</div>}
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          {" "}
          Address
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["address"] || ""}
            name="address"
            placeholder="Address"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
        {errors.address && <div className="text-red-500">{errors.address}</div>}
      </div>

      <StepperControl handleSubmit={handleSubmit} />
    </form>
  );
};

export default Details;

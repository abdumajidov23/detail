import React, { useRef, useState } from "react";
import { useStateValue } from "../../context";
import { Navigate } from "react-router-dom";

const CheckOut = () => {
  const { cart, setCart } = useStateValue();
  const fname = useRef(null);
  const lname = useRef(null);
  const address = useRef(null);
  const [errors, setErrors] = useState({});

  if (!cart.length) {
    return <Navigate replace to={"/"} />;
  }
  const validate = () => {
    const newErrors = {};

    if (!fname.current.value.trim()) {
      newErrors.fname = "First name is required.";
    }

    if (!lname.current.value.trim()) {
      newErrors.lname = "Last name is required.";
    }

    if (!address.current.value.trim()) {
      newErrors.address = "Address is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setCart([]);
    fname.current.value = "";
    lname.current.value = "";
    address.current.value = "";
    alert("Your order has been placed successfully! 🚀");
  };

  const totalPrice = cart?.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-white to-blue-50">
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Complete Your Order 🛒
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="fname"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              First Name
            </label>
            <input
              ref={fname}
              id="fname"
              type="text"
              placeholder="John"
              className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.fname
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300"
              }`}
            />
            {errors.fname && (
              <p className="text-sm text-red-500 mt-1">{errors.fname}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="lname"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Last Name
            </label>
            <input
              ref={lname}
              id="lname"
              type="text"
              placeholder="Doe"
              className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.lname
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300"
              }`}
            />
            {errors.lname && (
              <p className="text-sm text-red-500 mt-1">{errors.lname}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Address
            </label>
            <input
              ref={address}
              id="address"
              type="text"
              placeholder="123 Greenway Blvd"
              className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.address
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300"
              }`}
            />
            {errors.address && (
              <p className="text-sm text-red-500 mt-1">{errors.address}</p>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <p className="text-lg text-gray-700 font-semibold">
              Total:{" "}
              <span className="text-blue-600 text-xl font-bold">
                ${totalPrice.toFixed(2)}
              </span>
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-700 rounded-lg shadow-md hover:from-green-400 hover:to-emerald-600 transition-transform transform hover:scale-105"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;

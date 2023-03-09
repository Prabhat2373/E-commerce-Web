import { useState } from 'react';
import OrderSummary from '../OrderSummary';
import BillingInfoForm from './BillingInfoForm';

const OrderForm = () => {
  const [step, setStep] = useState(1);
  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <h2 className="text-lg font-medium mb-4">Step {step} of 3</h2>
        <div className="flex mb-4">
          <div
            className={`w-1/2 border-r border-gray-400 ${
              step === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            } p-2 text-center cursor-pointer`}
            onClick={() => setStep(1)}
          >
            Shipping Details
          </div>
          <div
            className={`w-1/2 ${
              step === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            } p-2 text-center cursor-pointer`}
            onClick={() => setStep(2)}
          >
            Order Details
          </div>
          <div
            className={`w-1/2 ${
              step === 3 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            } p-2 text-center cursor-pointer`}
            onClick={() => setStep(3)}
          >
            Payment Details
          </div>
        </div>
        {(step === 1 && <Step1 />) ||
          (step === 2 && <Step2 />) ||
          (step === 3 && <Step3 />)}
        <div className="flex justify-between mt-6">
          {step > 2 && (
            <button
              className="bg-gray-300 px-6 py-1.5 rounded-lg text-gray-700 hover:bg-gray-400"
              onClick={handleBack}
            >
              Back
            </button>
          )}
          {step < 3 && (
            <button
              className="bg-blue-500 px-6 py-1.5 rounded-lg text-white hover:bg-blue-600"
              onClick={handleNext}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Step1 = () => (
  <div>
    <h3 className="text-lg font-medium mb-4">Shipping Details</h3>
    <div className="p-6 border border-gray-300 sm:rounded-md">
      <form
        method="POST"
        action="https://herotofu.com/start"
        encType="multipart/form-data"
      >
        <label className="block mb-6">
          <span className="text-gray-700">Your name</span>
          <input
            name="name"
            type="text"
            className="
      block
      w-full
      mt-1
      border-gray-300
      rounded-md
      shadow-sm
      focus:border-indigo-300
      focus:ring
      focus:ring-indigo-200
      focus:ring-opacity-50
    "
            placeholder="Joe Bloggs"
          />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Address line 1</span>
          <input
            name="address1"
            type="text"
            className="
      block
      w-full
      mt-1
      border-gray-300
      rounded-md
      shadow-sm
      focus:border-indigo-300
      focus:ring
      focus:ring-indigo-200
      focus:ring-opacity-50
    "
            placeholder=""
          />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Address line 2</span>
          <input
            name="address2"
            type="text"
            className="
      block
      w-full
      mt-1
      border-gray-300
      rounded-md
      shadow-sm
      focus:border-indigo-300
      focus:ring
      focus:ring-indigo-200
      focus:ring-opacity-50
    "
            placeholder=""
          />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">City</span>
          <input
            name="city"
            type="text"
            className="
      block
      w-full
      mt-1
      border-gray-300
      rounded-md
      shadow-sm
      focus:border-indigo-300
      focus:ring
      focus:ring-indigo-200
      focus:ring-opacity-50
    "
            placeholder=""
          />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">State/Province</span>
          <input
            name="state"
            type="text"
            className="
      block
      w-full
      mt-1
      border-gray-300
      rounded-md
      shadow-sm
      focus:border-indigo-300
      focus:ring
      focus:ring-indigo-200
      focus:ring-opacity-50
    "
            placeholder=""
          />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Zip/Postal code</span>
          <input
            name="zip"
            type="text"
            className="
      block
      w-full
      mt-1
      border-gray-300
      rounded-md
      shadow-sm
      focus:border-indigo-300
      focus:ring
      focus:ring-indigo-200
      focus:ring-opacity-50
    "
            placeholder=""
          />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Country</span>
          <input
            name="country"
            type="text"
            className="
      block
      w-full
      mt-1
      border-gray-300
      rounded-md
      shadow-sm
      focus:border-indigo-300
      focus:ring
      focus:ring-indigo-200
      focus:ring-opacity-50
    "
            placeholder=""
          />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Telephone</span>
          <input
            name="telephone"
            type="text"
            className="
      block
      w-full
      mt-1
      border-gray-300
      rounded-md
      shadow-sm
      focus:border-indigo-300
      focus:ring
      focus:ring-indigo-200
      focus:ring-opacity-50
    "
            placeholder=""
          />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Delivery information</span>
          <textarea
            name="message"
            className="
      block
      w-full
      mt-1
      border-gray-300
      rounded-md
      shadow-sm
      focus:border-indigo-300
      focus:ring
      focus:ring-indigo-200
      focus:ring-opacity-50
    "
            rows={3}
            placeholder="floor/door lock code/etc."
            defaultValue={''}
          />
        </label>
      </form>
    </div>
  </div>
);

const Step2 = () => (
  <div>
    <h3 className="text-lg font-medium mb-4">Order Summary</h3>
    <OrderSummary />
  </div>
);
const Step3 = () => (
  <div>
    <h3 className="text-lg font-medium mb-4">Payment Info</h3>
    <BillingInfoForm />
  </div>
);

export default OrderForm;

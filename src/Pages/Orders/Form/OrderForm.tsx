import { useState } from 'react';
import OrderSummary from '../OrderSummary';
import BillingInfoForm from './BillingInfoForm';
import ShippingDetails from './ShippingDetails';
import {
  FormContext,
  FormContextProvider,
  useOrderFormContext,
} from '../../../Contexts/formContext';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useAddBillingDetailsMutation } from '../../../features/services/RTK/Api';
import { useSelector } from 'react-redux';
import { User } from '../../../interfaces/Payload';

export interface BillingData {
  first_name: string
  address1: string
  address2: string
  city: string
  state: string
  zip: string
  country: string
  phone: string
  delivery: string
  email: string
}

const OrderForm = () => {
  const [BillingDetails] = useAddBillingDetailsMutation()
  const user: User = useSelector((state: any) => state?.user?.payload)
  const [step, setStep] = useState(1);
  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };
  const { formData, setFormData } = useOrderFormContext();

  const methods = useForm();
  const { register, handleSubmit } = methods;
  console.log('formdata', formData);
  const onSubmit = (data: any) => {
    let formData = new FormData();
    formData.append('first_name', data?.first_name)
    formData.append('email', data?.email)
    formData.append('address1', data?.address1)
    formData.append('address2', data?.address2)
    formData.append('city', data?.city)
    formData.append('country', data?.country)
    formData.append('phone', data?.phone)
    formData.append('state', data?.state)
    formData.append('zip', data?.zip)
    console.log('data', data);
    BillingDetails({
      id: user._id,
      payload: formData
    }).then((res) => {
      console.log('success', res)
    }).catch((err) => console.log(err?.message))
    setFormData(data)
  };

  return (
    <div className="flex items-center justify-center">
      <FormProvider {...methods} >
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <h2 className="text-lg font-medium mb-4">Step {step} of 3</h2>
            <div className="flex mb-4">
              <div
                className={`w-1/2 border-r border-gray-400 ${step === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  } p-2 text-center cursor-pointer`}
                onClick={() => setStep(1)}
              >
                Shipping Details
              </div>
              <div
                className={`w-1/2 ${step === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  } p-2 text-center cursor-pointer`}
                onClick={() => setStep(2)}
              >
                Order Details
              </div>
              <div
                className={`w-1/2 ${step === 3 ? 'bg-blue-500 text-white' : 'bg-gray-200'
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
                  type="submit"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

const Step1 = () => (
  <div>
    <h3 className="text-lg font-medium mb-4">Shipping Details</h3>
    <ShippingDetails />
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

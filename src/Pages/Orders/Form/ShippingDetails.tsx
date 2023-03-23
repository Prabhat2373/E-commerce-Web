import React from 'react';
import { useForm } from 'react-hook-form';
import { FormContext, useOrderFormContext } from '../../../Contexts/formContext';
const ShippingDetails = ({ formStep, nextFormStep }: {
  formStep: number;
  nextFormStep: () => void;
}) => {
  const { formData, setFormData } = useOrderFormContext()
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    setFormData(data)
    nextFormStep()
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6 border border-gray-300 sm:rounded-md">
          <label className="block mb-6">
            <span className="text-gray-700">Your name</span>
            <input
              type="text"
              {...register('first_name')}
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
            <span className="text-gray-700">Your Email</span>
            <input
              type="email"
              {...register('email')}
              className="block w-full
      mt-1
      border-gray-300
      rounded-md
      shadow-sm
      focus:border-indigo-300
      focus:ring
      focus:ring-indigo-200
      focus:ring-opacity-50
    "
              placeholder="example@gmail.com"

            />
          </label>
          <label className="block mb-6">
            <span className="text-gray-700">Address line 1</span>
            <input
              {...register('address1')}
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
              {...register('address2')}
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
              {...register('city')}
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
              {...register('state')}
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
              {...register('zip')}
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
              {...register('country')}
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
              {...register('phone')}
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
          <button type='submit'>Next</button>
        </div>
      </form>
    </>
  );
};

export default ShippingDetails;

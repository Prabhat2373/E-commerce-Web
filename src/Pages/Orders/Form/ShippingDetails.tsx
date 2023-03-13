import React from 'react';
import { useForm } from 'react-hook-form';

const ShippingDetails = () => {
  const { register, handleSubmit } = useForm();
  return (
    <>
      <div className="p-6 border border-gray-300 sm:rounded-md">
        <form
          method="POST"
          action="https://herotofu.com/start"
          encType="multipart/form-data"
        >
          <label className="block mb-6">
            <span className="text-gray-700">Your name</span>
            <input
              type="text"
              {...register('userName')}
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
              {...register('telephone')}
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
              {...register('delivery')}
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
    </>
  );
};

export default ShippingDetails;

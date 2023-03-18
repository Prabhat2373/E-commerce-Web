import React from 'react';
import { useForm } from 'react-hook-form';

const BillingInfoForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log('dataa', data);
  };
  return (
    <div>
      <form className="w-1/2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col ">
          <label htmlFor="name">Name On Card</label>
          <input
            type="text"
            placeholder="name on card"
            id="name"
            {...register('nameOnCard')}
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="number"
            // name=""
            {...register('cardNumber')}
            placeholder="Card Number"
            id="cardNumber"
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="expireDate">CVV</label>
          <input type="date" id="expireDate" {...register('expireDate')} />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="cvv">CVV</label>
          <input type="password" {...register('cvv')} id="cvv" />
        </div>
        <div className="flex justify-end">
          <button
            className="border bg-blue-500 px-5 py-2 text-white rounded-md hover:bg-opacity-60"
            type='submit'
          // onClick={(e) => {
          //   e.preventDefault();
          // }}
          >
            Proceed To Pay
          </button>
        </div>
      </form>
    </div>
  );
};

export default BillingInfoForm;

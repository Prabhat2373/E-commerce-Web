import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useOrderFormContext } from '../../../Contexts/formContext';
import { usePaymentProcessMutation } from '../../../features/services/RTK/Api';
import {
  CardNumberElement,
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { User } from '../../../interfaces/Payload';

const BillingInfoForm = ({
  formStep,
  nextFormStep,
}: {
  formStep: number;
  nextFormStep: () => void;
}) => {
  const [ProcessPayment] = usePaymentProcessMutation();
  const user: any = useSelector((state: RootState) => state.user.payload);
  const { register, handleSubmit } = useForm();
  const { formData } = useOrderFormContext();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const methods = useForm();
  const stripe = useStripe();
  const elements = useElements();
  const paymentData = {
    amount: Math.round(formData && formData?.totalAmount * 100),
  };

  const onSubmit = async (data: any) => {
    const res: any = await ProcessPayment(paymentData);

    const client_secret = res?.data?.client_secret;

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (cardElement) {
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: user?.name,
            email: user?.email,
            address: {
              line1: formData.address1,
              city: formData.city,
              state: formData.state,
              postal_code: formData?.zip,
              country: formData.country,
            },
          },
        },
      });

      if (result.error) {
        // payBtn.current.disabled = false;

        alert(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          // history.push('/success');
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    }

    console.log('res', client_secret);
    console.log('Order Items', cartItems);
    console.log(data);
    console.log('formdata', formData);
  };
  return (
    <FormProvider {...methods}>
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
              type="submit"
            >
              Proceed To Pay
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default BillingInfoForm;

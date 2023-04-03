import React, { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useOrderFormContext } from '../../../Contexts/formContext';
import {
  useCreateOrderMutation,
  usePaymentProcessMutation,
} from '../../../features/services/RTK/Api';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';
import { StripeCardNumberElement } from '@stripe/stripe-js';

const BillingInfoForm = ({
  formStep,
  nextFormStep,
}: {
  formStep: number;
  nextFormStep: () => void;
}) => {
  const [ProcessPayment] = usePaymentProcessMutation();
  const [CreateOrder] = useCreateOrderMutation();
  const user: any = useSelector((state: RootState) => state.user.payload);
  const { register, handleSubmit } = useForm();
  const { formData } = useOrderFormContext();
  console.log('FORMDATA', formData);
  const cartItems: any = useSelector((state: RootState) => state.cart.items);
  const methods = useForm();
  const stripe = useStripe();
  const elements = useElements();
  const paymentData = {
    amount: Math.round(formData && formData?.totalAmount * 100),
  };
  const payBtn = useRef(null);
  const order: any = {
    shippingInfo: user?.billing_info,
    orderItems: cartItems,
    itemsPrice: formData.totalAmount,
    taxPrice: 20,
    shippingPrice: 20,
    totalPrice: formData.totalAmount,
  };

  const onSubmit = async (data: any) => {
    const res: any = await ProcessPayment(paymentData);

    const client_secret = res?.data?.client_secret;

    if (!stripe || !elements) return;

    console.log('inside ');
    // const cardElement:
    //   | StripeCardElement
    //   | StripeCardNumberElement
    //   | any
    //   | { token: string } = elements.getElement(CardElement);
    // if (cardElement === null) return;
    // if (cardElement || cardElement !== null) {
    console.log('inside cardelee');

    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardNumberElement)!,
        billing_details: {
          name: user?.name,
          email: user?.email,
          address: {
            line1: formData.address1,
            city: formData.city,
            state: formData.state,
            postal_code: formData?.zip,
            country: 'IN',
          },
        },
      },
    });
    console.log('RESULT', result);
    console.log('NOT SUCCESS');
    if (result.error) {
      // payBtn.current.disabled = false;

      alert(result.error.message);
      console.log('NOT SUCCESS');
    } else {
      console.log('SUCCESS');

      if (result.paymentIntent.status === 'succeeded') {
        order.paymentInfo = {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
        };
        CreateOrder(order)
          .then((res) => {
            console.log('ORDER CREATED SUCCESSFULLY', res);
          })
          .catch((err) => {
            console.log(err?.message);
          });
        // dispatch(createOrder(order));

        // history.push('/success');
      } else {
        alert("There's some issue while processing payment ");
      }
    }
    // }

    // console.log('res', client_secret);
    // console.log('Order Items', cartItems);
    // console.log(data);
    // console.log('formdata', formData);
  };
  return (
    <FormProvider {...methods}>
      <div>
        <form className="w-1/2" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col ">
            <label htmlFor="name">Name On Card</label>
            <CardNumberElement className="paymentInput" />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="cardNumber">Card Number</label>
            {/* <input
              type="number"
              // name=""
              {...register('cardNumber')}
              placeholder="Card Number"
              id="cardNumber"
            /> */}
            <CardExpiryElement className="paymentInput" />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="expireDate">CVV</label>
            <input type="date" id="expireDate" {...register('expireDate')} />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="cvv">CVV</label>
            {/* <input type="password" {...register('cvv')} id="cvv" /> */}
            <CardCvcElement className="paymentInput" />
          </div>
          <div className="flex justify-end">
            {/* <button
              className="border bg-blue-500 px-5 py-2 text-white rounded-md hover:bg-opacity-60"
              type="submit"
            >
              Proceed To Pay
            </button> */}
            <input
              type="submit"
              value={`Pay - ₹${formData && formData.totalAmount}`}
              ref={payBtn}
              className="paymentFormBtn"
            />
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default BillingInfoForm;

import React from 'react';

const BillingInfoForm = () => {
  return (
    <div>
      <form action="">
        <div>
          <label htmlFor="name">Name On Card</label>
          <input type="text" name="name" placeholder="name on card" id="name" />
        </div>
        <div>
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="number"
            name="cardNumber"
            placeholder="Card Number"
            id="cardNumber"
          />
        </div>
        <div>
          <label htmlFor="expireDate">CVV</label>
          <input type="date" id="expireDate" name="expireDate" />
        </div>
        <div>
          <label htmlFor="cvv">CVV</label>
          <input type="password" name="cvv" id="cvv" />
        </div>
      </form>
    </div>
  );
};

export default BillingInfoForm;

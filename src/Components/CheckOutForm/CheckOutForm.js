import React, { useState } from 'react';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const CheckoutForm = () => {
    const [paymentError,setPaymentError] = useState(null);
    const [paymentFinished, setPaymentFinished] = useState(null)
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if(error){
        setPaymentError(error.message);
        setPaymentFinished(null)
    }
    else{
        setPaymentFinished(error.message);
        setPaymentError(null)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {
          paymentError && <p style={{color:'red'}}>{paymentError}</p>
      }
      {
          paymentFinished && <p style={{color:"green"}}>successfull</p>
      }
    </form>
  );
};
export default CheckoutForm;
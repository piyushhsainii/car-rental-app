import React, { FormEventHandler, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Layout } from "@stripe/stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();


  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(false);


  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        payment_method:'card',
        payment_method_data: {
          billing_details: {
            email: "email@email.com",
          },
        },
      },
      redirect: "if_required",
    });
    if (result?.paymentIntent?.status === "succeeded"){
      window.location.href = '/successPage'
    }
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (result?.error?.type === "card_error" || result?.error?.type === "validation_error") {
      setMessage(result.error.message as string);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };


  const paymentElementOptions = {
    layout: "tabs" as Layout ,
  };
  interface PaymentIntent {
    layout:string
  }
  return (
    <form id="payment-form" className="" onSubmit={handleSubmit}>
      <label>EMAIL</label>
      <input
            type="email"
            required
            placeholder="example@emmail.com"
            className="my-2 p-2 w-full border rounded bg-white text-black"
          /> 
      <PaymentElement className=" text-white" id="payment-element" options={paymentElementOptions} />
      <button className="border-slate-700 border-opacity-35 border text-white bg-blue-400 p-2 rounded-md m-4 px-3" disabled={!!(isLoading || !stripe || !elements) } type="submit" id="submit">
        <span  id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
import React, { FormEventHandler, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Layout } from "@stripe/stripe-js";
import axios from "axios";
import { url } from "@/lib/url";
import { useSession } from "next-auth/react"; 

export default  function CheckoutForm2({email,carid , userID}:{email:string,carid:string,userID:string}) {

  const stripe = useStripe();
  const elements = useElements();
  const { data } = useSession() 
  const [emailValue, setemail] = useState(email)
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const userID2 = data?.user?.name as string 
  const userEmail =data?.user?.email as string

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
            email: email,
          },
        },
      },
      redirect: "if_required",
    });
    if (result?.paymentIntent?.status === "succeeded"){
      try {
      const { data } = await axios.post(`${url}/api/reserveCar`,{
        id:carid,
        userID:userID ,
        userName:userID2,
        userEmail:userEmail,
        carID:carid
      })

      if(data){
        window.location.href = `/reserveCar/${carid}` 
      }
        }
       catch (error) {
        console.log(error)
        setMessage("Error occured while reserving your car")
      }
    }

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
      <input 
            type="email"
            required 
            value={emailValue}
            onChange={(e)=>setemail(e.target.value)}
            placeholder={"Card Name"}
            className="my-2 p-2 w-full border rounded bg-[#424353] text-slate-200"
          /> 
      <PaymentElement className=" text-white" id="payment-element" options={paymentElementOptions} />
      <button className="border-slate-700 border-opacity-35 border text-white bg-blue-400 p-2 rounded-md m-4 px-3" disabled={!!(isLoading || !stripe || !elements) } type="submit" id="submit">
        <span  id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
     { message && <div id="payment-message">{message}</div>}
      
    </form>
  );
}
"use client"
import NavMenu from '../components/NavMenu'
import { Elements } from '@stripe/react-stripe-js';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react'
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);


const page = () => {

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }, []);

    interface appearance {
      theme:'stripe' | "night" | "flat"
    }
    const appearance:appearance = {
      theme: 'stripe',
    };
    const options:StripeElementsOptions = {
      clientSecret,
      appearance,
    };

  return (
    <div>
        <NavMenu />
        <div className='w-[80vw] border border-slate-300 m-auto   ' >
            <div className='flex justify-evenly p-4 '>
              <div>
                <div>Car NAME</div>
                <div>Price</div>
                <div>
                    <img src="/Logo.png"  className='w-[400px] h-[auto] max-h-[300px] ' alt="" />
                </div>
              </div>
              <div className='flex p-5'>
                <div className='p-2'>
                    <div className='p-4'>Reg</div>
                    <div className='p-4'>Plate</div>
                </div>
                <div className='p-2'>
                    <div className='p-4'>Km</div> 
                    <div className='p-4'>Fuel Type</div>
                </div>
              </div>
            </div>
            {/* Payment */}
        <div className='text-4xl font-semibold p-3 text-center'>
             Your dream car awaits. Reserve it today
        </div>
          <div className=" w-[50%] m-auto ">
              {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              )}
        </div>
        </div>
    </div>
  )
}

export default page
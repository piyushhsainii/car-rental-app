// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items:number) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  const twentyPercent = (items/5 )* 100
  console.log(twentyPercent)
  return twentyPercent; 
};

export async function POST(req:Request) { 
  const { items , amount } =  await req.json();

  // Create a PaymentIntent with the order amount and currency
  try {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(amount),
        currency: "Inr",
        
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
          enabled: true,
        },
      });
    
     return Response.json({
        clientSecret: paymentIntent.client_secret,
      },{
        status:200
      });
  } catch (error) {
   return Response.json({
        error:error
    },{
        status:400
    })
  }

};
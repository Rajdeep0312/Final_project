import React from 'react';
import { useUserAuth } from '../Authentication/UseAuthContext';

const Payment = () => {

  const { user } = useUserAuth();

  const amount = 50000;
  const currency = "INR";
  const receiptID = "qwsaq1";

  const paymentHandler = async (e) =>{
    const response = await fetch("http://localhost:8000/order",{
      method:"POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt : receiptID,
      }),
      headers:{
        "Content-Type" : "application/json",
      },
    });
    const order = await response.json();
    console.log(order)

    var options = {
      "key": "rzp_test_RNzP8Il9LFT8hU", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      "name": "SkillSprint", //your business name
      "description": "Course Fees",
      "image": "https://example.com/your_logo",
      "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": async function (response){
          const body = {
            ...response,
          };

          const validateRes = await fetch("http://localhost:8000/order/validate",{
            method:"POST",
            body: JSON.stringify(body),
            headers:{
              "Content-Type" : "application/json",
            },
          });
          const jsonRes = await validateRes.json();
          console.log(jsonRes)

      },
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          "name": user.displayName, //your customer's name
          "email": user.email, 
          "contact": "+919000090000"  //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      },
      config: {
        display: {
          blocks: {
            banks: {
              name: 'All payment methods',
              instruments: [
                {
                  method: 'upi'
                },
                {
                  method: 'card'
                },
                {
                    method: 'wallet'
                },
                {
                    method: 'netbanking'
                }
              ],
            },
          },
          sequence: ['block.banks'],
          preferences: {
            show_default_blocks: false,
          },
        },
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response){
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  }
  
  return (
    <>
      <button onClick={paymentHandler} id="rzp-button1">Pay</button>
    </>
  )
}

export default Payment
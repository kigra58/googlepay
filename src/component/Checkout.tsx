
import {  useState } from "react";
import { IonButton } from "@ionic/react";
import { Stripe } from "@capacitor-community/stripe";
import axios from "axios"


const Checkout = () => {
    const [loading, setLoading] = useState(false);
    // const [isGooglePayAvailable, setIsGooglePayAvailable] = useState(false);

    const handleCheckout = async () => {
      setLoading(true);

      try {
        const { data } = await axios.post(
        //   "http://localhost:4041/create-payment-intent",
          "https://e19d-122-160-11-153.ngrok-free.app/create-payment-intent",
          { amount: 100, currency: "usd" }
        );

        if (data && data.success && data.data) {
          console.log("PaymentIntent client secret:", data.data);
         await Stripe.createPaymentSheet({
            paymentIntentClientSecret: data.data.client_secret,
            merchantDisplayName: "Inclusive Innovation Incubator",
          });
          
        //   console.log("resres",res);

          const { paymentResult } = await Stripe.presentPaymentSheet();
          console.log(paymentResult);
          // } else {
          //   // gets a credit card to use for a payment
          //   await Stripe.createPaymentFlow({
          //     paymentIntentClientSecret: data.clientSecret,
          //     merchantDisplayName: "Inclusive Innovation Incubator",
          //   });

          //   const { cardNumber } = await Stripe.presentPaymentFlow();
          //   console.log(cardNumber);
          //   console.log("Payment succeeded:", cardNumber);

          //   const { paymentResult } = await Stripe.confirmPaymentFlow();
          //   console.log("Payment succeeded:", paymentResult);
          // }
        }

      } catch (error) {
        console.error("Payment failed:", error);
      } finally {
        setLoading(false);
      }
    };
  
    // useEffect(() => {
    //     const checkGooglePayAvailability = async () => {
    //       try {
    //         const result = await Stripe.isGooglePayAvailable();
    //         console.log("resultresultresult",result)
    //         setIsGooglePayAvailable(true);
    //       } catch (error) {
    //         console.error('Error checking Google Pay availability:', error);
    //       }
    //     };

    //     checkGooglePayAvailability();
    //   }, []);

    return (
      <>
        <h1> Pay </h1>
        {/* { ( */}
          <IonButton onClick={handleCheckout} disabled={loading}>
            {loading ? "Loading..." : "Checkout"}
          </IonButton>
        {/* )} */}
      </>
    );
}

export default Checkout
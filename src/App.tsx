import { IonApp, IonRouterOutlet,} from "@ionic/react";
// import { Redirect, Route } from "react-router-dom";
import { Capacitor } from "@capacitor/core";
import { Stripe } from "@capacitor-community/stripe";
// import Home from "./component/Home";
import { useEffect } from "react";
import Checkout from "./component/Checkout";

// if (Capacitor.isPluginAvailable("Stripe")) {
//   Stripe.initialize({
//     publishableKey : "pk_test_51Q0G8bFNv1k7uJX7Y52xBqcSjxxbFYrg1G6FKctF1nQn9X8sOZHgx9w86t25wj4RD1jqJFxd5k5pHE7i0OfgASwi00mKgCsuDp"
//   })
// }


const App = () => {
  
  useEffect(() => {
    const initializeStripe = async () => {
      if (Capacitor.isPluginAvailable("Stripe")) {
        try {
          await Stripe.initialize({
            publishableKey: "pk_test_51Q0G8bFNv1k7uJX7Y52xBqcSjxxbFYrg1G6FKctF1nQn9X8sOZHgx9w86t25wj4RD1jqJFxd5k5pHE7i0OfgASwi00mKgCsuDp"
          });
          console.log("Stripe initialized successfully");
        } catch (error) {
          console.error("Error initializing Stripe:", error);
        }
      } else {
        console.error("Stripe plugin is not available");
      }
    };

    initializeStripe();
  }, []);

  return (
    <IonApp>

      <IonRouterOutlet>
        {/* <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route> */}
        <Checkout/>
      </IonRouterOutlet>
  </IonApp>
  )
}

export default App
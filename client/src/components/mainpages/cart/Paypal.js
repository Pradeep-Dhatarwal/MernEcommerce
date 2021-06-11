import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Paypal(props) {
	const initialOptions = {
		currency: "USD",
		intent: "capture",
		"client-id":
			"ARU34p8Sl3tpnHFcPlwoypvQB3AbkVHh8ygdHEEAZ0jqMAUQP8xCZCrEv3fvKTOA1VvTztc3q0wicvh_",
	};

	const createOrder = (data, actions) => {
		// Set up the transaction
		return actions.order.create({
			purchase_units: [
				{
					amount: {
						value: props.total,
					},
				},
			],
		});
	};
  const onApprove = async (data, actions) => {
		return actions.order.capture().then(function(details) {
      // This function shows a transaction success message to your buyer.
      return props.transferSuccess(details)
    });
  }
	


	// const onSuccess = (data, actions) => {
	// 	console.log(data)
	// }

  const onError = (err) => {
    // The main Paypal's script cannot be loaded or somethings block the loading of that script!
    console.log("Error!", err);
    // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
    // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
}
const onCancel = (data,actions) => {
  // User pressed "cancel" or close Paypal's popup!
  console.log('The payment was cancelled!', data);
  // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
}
	const styles = {
		color: "blue",
		label: "checkout",
		layout: "horizontal",
		shape: "rect",
		tagline: false,
	};
	return (
		<PayPalScriptProvider options={initialOptions}>
			<PayPalButtons style={styles} createOrder={createOrder}   onError={onError} onCancel={onCancel} onApprove={onApprove}  forceReRender={props.total} />
		</PayPalScriptProvider>
	);
}
export default Paypal;

// clientId: "ARU34p8Sl3tpnHFcPlwoypvQB3AbkVHh8ygdHEEAZ0jqMAUQP8xCZCrEv3fvKTOA1VvTztc3q0wicvh_"
// const styles = {
//   color: "blue",
//   label: "checkout",
//   layout: "horizontal",
//   shape: "rect",
//   tagline: false,
// };

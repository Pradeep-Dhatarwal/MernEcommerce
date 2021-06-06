import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function paypal(props) {
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
  const onApprove = (data, actions) => {
    return actions.order.capture();
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
			<PayPalButtons style={styles} createOrder={createOrder} onApprove={onApprove} />
		</PayPalScriptProvider>
	);
}
export default paypal;

// clientId: "ARU34p8Sl3tpnHFcPlwoypvQB3AbkVHh8ygdHEEAZ0jqMAUQP8xCZCrEv3fvKTOA1VvTztc3q0wicvh_"
// const styles = {
//   color: "blue",
//   label: "checkout",
//   layout: "horizontal",
//   shape: "rect",
//   tagline: false,
// };

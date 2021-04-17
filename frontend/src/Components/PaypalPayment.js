import React from "react";
import PayPalButton from "./PaypalButton";

class PaypalPayment extends React.Component {
    createOrder(data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: "0.99",
            },
          },
        ],
      });
    }
  
    onApprove(data, actions) {
      return actions.order.capture();
    }
  
    render() {
      return (
        <PayPalButton
          createOrder={(data, actions) => this.createOrder(data, actions)}
          onApprove={(data, actions) => this.onApprove(data, actions)}
        />
      );
    }
}

export default PaypalPayment;
import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../contexts/OrderDetails";
import AlertBanner from "../common/AlertBanner";
import "@testing-library/jest-dom/extend-expect";


interface OrderConfirmationProps {
  setOrderPhase: (phase: string) => void;
}

export default function OrderConfirmation({ setOrderPhase }: OrderConfirmationProps): JSX.Element {
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    axios
      // in a real app, we would get order details from context
      // and send with POST
      .post(`http://localhost:3030/order`)
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch(() => setError(true));
  }, []);

  function handleClick() {
    // clear the order details
    resetOrder();

    // send back to the order page
    setOrderPhase("inProgress");
  }

  const newOrderButton = (
    <Button onClick={handleClick}>Create new order</Button>
  );

  if (error) {
    return (
      <>
        <AlertBanner message="An unexpected error occurred. Please try again later" variant="danger" />
        {newOrderButton}
      </>
    );
  }

  if (orderNumber !== null) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank You!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: "25%" }}>
          As per our terms and conditions, nothing will happen now
        </p>
        {newOrderButton}
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}

import React, { useState } from "react";
import Container from "react-bootstrap/Container";

import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";

import { OrderDetailsProvider } from "./contexts/OrderDetails";

export default function App(): JSX.Element {
  // orderPhase needs to be 'inProgress', 'review' or 'completed'
  const [orderPhase, setOrderPhase] = useState<string>("inProgress");

  let Component: React.ComponentType<{ setOrderPhase: (phase: string) => void }> = OrderEntry; // default to order page
  switch (orderPhase) {
    case "inProgress":
      Component = OrderEntry;
      break;
    case "review":
      Component = OrderSummary;
      break;
    case "completed":
      Component = OrderConfirmation;
      break;
    default:
  }

  return (
    <OrderDetailsProvider>
      <Container>
        {<Component setOrderPhase={setOrderPhase} />}
      </Container>
    </OrderDetailsProvider>
  );
}

import { render, screen } from "../../../test-utils/testing-library-utils";
import { server } from "../../../mocks/server";
import '@testing-library/jest-dom/extend-expect';
import { rest } from "msw";


import OrderConfirmation from "../OrderConfirmation";
import React from "react";

test("error response from server for submitting order", async () => {
  // override default msw response for options endpoint with error response
  server.resetHandlers(
    rest.post("http://localhost:3030/order", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderConfirmation setOrderPhase={function (phase: string): void {
    throw new Error("Function not implemented.");
  } } />);

  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent(
    "An unexpected error occurred. Please try again later."
  );
});

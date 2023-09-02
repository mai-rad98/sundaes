import { render, RenderOptions } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetails";

const renderWithContext = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

// Re-export everything from "@testing-library/react"
export * from "@testing-library/react";

// Override the render method with the TypeScript version
export { renderWithContext as render };

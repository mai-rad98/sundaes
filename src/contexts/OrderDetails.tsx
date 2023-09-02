import React, { createContext, useContext, useState, ReactNode } from "react";
import { pricePerItem, } from "../constants";

interface OptionCounts {
  scoops: { [itemName: string]: number };
  toppings: { [itemName: string]: number };
}

interface Totals {
  scoops: number;
  toppings: number;
}

interface OrderDetailsContext {
  optionCounts: OptionCounts;
  totals: Totals;
  updateItemCount: (itemName: string, newItemCount: number, optionType: 'scoops'|'toppings') => void;
  resetOrder: () => void;
}

const OrderDetails = createContext<OrderDetailsContext | undefined>(undefined);

export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error("useOrderDetails must be called from within an OrderDetailsProvider");
  }

  return contextValue;
}

interface OrderDetailsProviderProps {
  children: ReactNode;
}

export function OrderDetailsProvider(props: OrderDetailsProviderProps) {
  const [optionCounts, setOptionCounts] = useState<OptionCounts>({
    scoops: {},
    toppings: {},
  });

  function updateItemCount(itemName: string, newItemCount: number, optionType: 'scoops'|'toppings') {
    const newOptionCounts = { ...optionCounts };
    newOptionCounts[optionType][itemName] = newItemCount;
    setOptionCounts(newOptionCounts);
  }

  function resetOrder() {
    setOptionCounts({ scoops: {}, toppings: {} });
  }

  function calculateTotal(optionType: 'scoops'|'toppings') {
    const countsArray = Object.values(optionCounts[optionType]);
    const totalCount = countsArray.reduce((total, value) => total + value, 0);
    return totalCount * pricePerItem[optionType];
  }

  const totals: Totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  const value: OrderDetailsContext = { optionCounts, totals, updateItemCount, resetOrder };

  return <OrderDetails.Provider value={value} {...props} />;
}

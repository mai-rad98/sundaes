import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { formatCurrency } from '../../utilities'
import { useOrderDetails } from "../../contexts/OrderDetails";
import React from "react";

interface OptionsProps {
  optionType: "scoops" | "toppings";
}

export default function Options({ optionType }: OptionsProps): JSX.Element {
  const [items, setItems] = useState<Array<{ name: string; imagePath: string }>>([]);
  const [error, setError] = useState<boolean>(false);
  const { totals } = useOrderDetails();

  useEffect(() => {
    // create an abortController to attach to the network request
    const controller = new AbortController();
    axios
      // attach abortController to request
      .get(`http://localhost:3030/${optionType}`, {
        signal: controller.signal,
      })
      .then((response) => setItems(response.data))
      .catch((error: AxiosError) => {
        if (error.name !== "AbortError") {
          setError(true);
        }
      });
    return () => {
      // on unmount, abort any active requests
      controller.abort();
    };
  }, [optionType]);

  if (error) {
    return <AlertBanner message="An error occurred while fetching data." variant="danger" />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(totals[optionType])}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
}

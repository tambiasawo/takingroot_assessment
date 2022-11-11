import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

interface Props {
  stock: number;
}
export default function SelectSmall({ stock }: Props) {
  const [counter, setCounter] = React.useState(0);

  const handleChange = (direction: string) => {
    if (counter > 0.25 * stock) return;

    if (direction === "plus") setCounter((counter) => counter + 1);
    else if (counter == 0) return;
    else setCounter((counter) => counter - 1);
  };

  return (
    <ButtonGroup size="small" aria-label="small outlined button group">
      <Button onClick={() => handleChange("minus")}>-</Button>

      <Button>{counter}</Button>
      <Button onClick={() => handleChange("plus")}>+</Button>
    </ButtonGroup>
  );
}

import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { generateDefaultAttrs } from "../utils";

export function CharSheet() {
  const [characters, setCharacters] = useState([
    { name: "Zeel", attributes: generateDefaultAttrs() },
  ]);
  const [error, setError] = useState("");

  const handleDecrement = (characterIndex, attribute) => {
    setCharacters((pre) => {
      const currentPoints = pre[characterIndex].attributes[attribute];
      const updatedCharacters = [...pre];
      if (currentPoints - 1 >= 0) {
        updatedCharacters[characterIndex].attributes[attribute] -= 1;
      }
      return updatedCharacters;
    });
  };
  const handleIncrement = (characterIndex, attribute) => {
    setCharacters((pre) => {
      const currentPoints = pre[characterIndex].attributes[attribute];
      console.log("increament: called", currentPoints);
      const totalValue = Object.entries(pre[characterIndex].attributes).reduce(
        (sum, [_, point]) => sum + point,
        0
      );
      const updatedCharacters = [...pre];
      if (totalValue < 70) {
        updatedCharacters[characterIndex].attributes[attribute] += 1;
        console.log("increament:updatedCharacters", updatedCharacters);
        setError('')
      } else {
        setError("Max attribute level is 70, please try decreasing");
      }
      return updatedCharacters;
    });
  };
  return (
    <Grid container spacing={3}>
      {error && <Typography color="error">{error}</Typography>}
      {characters.map((character, characterIndex) => (
        <Grid item xs={12} key={characterIndex}>
          <Typography variant="h4">Char: {character.name}</Typography>
          <Grid container spacing={3} className="p-2">
            <Typography variant="h6">Attributes:</Typography>
            {Object.entries(character.attributes).map(([attribute, value]) => {
              //   console.log(attribute);
              return (
                <Grid item xs={3} key={attribute}>
                  <Typography variant="body2">{attribute}</Typography>
                  <TextField value={value + ""}></TextField>
                  <Button
                    onClick={() => handleIncrement(characterIndex, attribute)}
                  >
                    +
                  </Button>
                  <Button
                    onClick={() => handleDecrement(characterIndex, attribute)}
                  >
                    -
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}

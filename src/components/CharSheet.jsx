import {
  Button,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { generateDefaultAttrs } from "../utils";
import { CLASS_LIST } from "../consts";

export function CharSheet() {
  const [characters, setCharacters] = useState([
    { name: "Zeel", selectedClass: "", attributes: generateDefaultAttrs() },
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
    //   const currentPoints = pre[characterIndex].attributes[attribute];
    //   console.log("increament: called", currentPoints);
      const totalValue = Object.entries(pre[characterIndex].attributes).reduce(
        (sum, [_, point]) => sum + point,
        0
      );
      const updatedCharacters = [...pre];
      if (totalValue < 70) {
        updatedCharacters[characterIndex].attributes[attribute] += 1;
        // console.log("increament:updatedCharacters", updatedCharacters);
        setError("");
      } else {
        setError("Max attribute level is 70, please try decreasing");
      }
      return updatedCharacters;
    });
  };

  const handleClassClick = (characterIndex, selectedClass) => {
    const updatedCharacters = [...characters];
    updatedCharacters[characterIndex].selectedClass = selectedClass;
    setCharacters(updatedCharacters);
  };
  const isClassMinimumMet = (characterIndex, className) => {
    const classRequirements = CLASS_LIST[className];
    // console.log(CLASS_LIST, classRequirements, className);
    return Object.keys(classRequirements).every(
      (attributeKey) =>
        characters[characterIndex].attributes[attributeKey] >=
        classRequirements[attributeKey]
    );
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

          <Grid container spacing={2} className="p-20">
            <Grid item xs={3}>
              <Typography variant="h6">Available Classes:</Typography>
              <List title="Available Classes">
                {Object.keys(CLASS_LIST).map((className) => (
                  <ListItem
                    key={className}
                    selected={character.selectedClass === className}
                    onClick={() => handleClassClick(characterIndex, className)}
                  >
                    <Typography
                      variant="body2"
                      color={
                        isClassMinimumMet(characterIndex, className)
                          ? "secondary"
                          : "textPrimary"
                      }
                    >
                      {className}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Grid>
            {character.selectedClass && (
              <Grid item xs={4}>
                <Typography variant="body1">
                  Minimum Config for {character.selectedClass}:
                </Typography>
                <List>
                  {Object.entries(CLASS_LIST[character.selectedClass]).map(
                    ([attribute, value]) => (
                      <ListItem key={attribute}>
                        <Typography variant="body2">
                          {attribute}: {value}
                        </Typography>
                      </ListItem>
                    )
                  )}
                </List>
              </Grid>
            )}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}

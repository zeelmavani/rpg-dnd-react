import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { ATTRIBUTE_LIST } from "../consts";
import { generateDefaultAttrs, generateDefaultSkills } from "../utils";
import { DisplayClass } from "./DisplayClass";
import { DisplaySkill } from "./DisplaySkill";

export function CharSheet() {
  const [characters, setCharacters] = useState([
    {
      name: "Zeel",
      selectedClass: "",
      attributes: generateDefaultAttrs(),
      skillLevels: generateDefaultSkills(),
    },
  ]);
  const [error, setError] = useState("");

  const handleDecrement = (characterIndex, attribute) => {
    setCharacters((pre) => {
      const currentPoints =
        pre[characterIndex].attributes[attribute].currentPoints;
      const updatedCharacters = [...pre];
      if (currentPoints - 1 >= 0) {
        updatedCharacters[characterIndex].attributes[
          attribute
        ].currentPoints -= 1;
      }
      return updatedCharacters;
    });
  };
  const handleIncrement = (characterIndex, attribute) => {
    setCharacters((pre) => {
      const currentPoints =
        pre[characterIndex].attributes[attribute].currentPoints;
      console.log("increament: called", currentPoints);
      const totalValue = Object.entries(pre[characterIndex].attributes).reduce(
        (sum, [key, value]) => sum + value.currentPoints,
        0
      );
      const updatedCharacters = [...pre];
      if (totalValue < 70) {
        updatedCharacters[characterIndex].attributes[
          attribute
        ].currentPoints += 1;
        console.log("increament:updatedCharacters", updatedCharacters);
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
  const handleSkillPointsChange = (
    characterIndex,
    { name, attributeModifier },
    points
  ) => {
    setCharacters((prevCharacters) => {
      const updatedCharacters = [...prevCharacters];
      const character = updatedCharacters[characterIndex];
      const currentAttribute = character.attributes[attributeModifier];
      const remainingPoints = currentAttribute.remainingPoints - points;
      console.log("remainingPoints", {
        newRemainingPoints: remainingPoints,
        points,
        name,
        attributeModifier,
      });
      if (remainingPoints >= 0) {
        character.skillLevels[name].currentPoints += points;
        currentAttribute.remainingPoints = remainingPoints;
      } else {
        // Display error message or handle insufficient skill points
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
            {ATTRIBUTE_LIST.map((attribute) => {
            //   console.log(attribute);
              return (
                <Grid item xs={3} key={attribute}>
                  <Typography variant="body2">{attribute}</Typography>
                  <TextField
                    value={character.attributes[attribute].currentPoints}
                  ></TextField>
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

          <DisplayClass
            character={character}
            onClassSelection={(selectedClass) =>
              handleClassClick(characterIndex, selectedClass)
            }
          />
          <DisplaySkill
            character={character}
            onSkillPointsChange={(skill, opValue) =>
              handleSkillPointsChange(characterIndex, skill, opValue)
            }
          />
        </Grid>
      ))}
    </Grid>
  );
}

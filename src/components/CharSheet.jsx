import { Grid, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { ATTRIBUTE_LIST } from "../consts";

export function CharSheet() {
  const [characters, setCharacters] = useState([
    { name: "Zeel", attributes: [{ Strength: 10 }] },
  ]);
  return (
    <Grid container spacing={3}>
      {characters.map((character, characterIndex) => (
        <Grid item xs={12} key={characterIndex}>
          <Typography variant="h4">Char: {character.name}</Typography>
          <Grid container spacing={3} className="p-2">
            <Typography variant="h6">Attributes:</Typography>
            {ATTRIBUTE_LIST.map((attribute) => (
              <Grid item xs={3} key={attribute}>
                <Typography variant="body2">{attribute}</Typography>
                <TextField
                  type="number"
                  value={character.attributes[attribute]}
                >

                </TextField>
              </Grid>
            ))}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}

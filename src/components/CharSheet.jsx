import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { ATTRIBUTE_LIST } from "../consts";
import { generateDefaultAttrs } from "../utils";

export function CharSheet() {
  const [characters, setCharacters] = useState([
    { name: "Zeel", attributes: generateDefaultAttrs() },
  ]);
  
  const handleDecrement=(characterIndex,attribute)=>{
    setCharacters(pre=>{
        const currentPoints=pre[characterIndex].attributes[attribute]
        if(currentPoints-1>0){
            const updatedCharacters=[...pre];
            updatedCharacters[characterIndex].attributes[attribute]-=1
            return updatedCharacters
        }
    })
  }
  const handleIncrement=(characterIndex,attribute)=>{
    setCharacters(pre=>{
        const currentPoints=pre[characterIndex].attributes[attribute]
        console.log('increament: called',currentPoints)
        if(currentPoints-1>0){
            const updatedCharacters=[...pre];
            updatedCharacters[characterIndex].attributes[attribute]+=1
            console.log('increament:updatedCharacters',updatedCharacters)
            return updatedCharacters
        }
    })
  }
  return (
    <Grid container spacing={3}>
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
                  <TextField value={value+""}></TextField>
                  <Button onClick={() => handleIncrement(characterIndex, attribute)}>
                    +
                  </Button>
                  <Button onClick={() => handleDecrement(characterIndex, attribute)}>
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

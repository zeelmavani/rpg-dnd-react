import {
  Grid,
  List,
  ListItem,
  Typography
} from "@material-ui/core";
import React from "react";
import { CLASS_LIST } from "../consts";

export function DisplayClass({character, onClassSelection}) {
  
  const isClassMinimumMet = (className) => {
    const classRequirements = CLASS_LIST[className];
    // console.log(CLASS_LIST, classRequirements, className);
    return Object.keys(classRequirements).every(
      (attributeKey) =>
        character.attributes[attributeKey] >=
        classRequirements[attributeKey]
    );
  };

  return (
    <Grid container spacing={2} className="p-20">
      <Grid item xs={3}>
        <Typography variant="h6">Available Classes:</Typography>
        <List title="Available Classes">
          {Object.keys(CLASS_LIST).map((className) => (
            <ListItem
              key={className}
              selected={character.selectedClass === className}
              onClick={() => onClassSelection(className)}
            >
              <Typography
                variant="body2"
                color={
                  isClassMinimumMet(className)
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
  );
}

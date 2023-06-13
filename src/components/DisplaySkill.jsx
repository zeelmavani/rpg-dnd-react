import { Button, Grid, List, ListItem, Typography } from "@material-ui/core";
import React from "react";
import { SKILL_LIST } from "../consts";
import { calAbilityModifier } from "../utils";

export function DisplaySkill({ character, onSkillPointsChange }) {
  return (
    <Grid container spacing={2} className="p-2">
      <Typography variant="h6">Skills:</Typography>
      <List>
        {SKILL_LIST.map((skill) => {
          // console.log(character)
          const { name, attributeModifier } = skill;
          const abilityModifier = calAbilityModifier(
            character.attributes[attributeModifier].currentPoints
          );
          const totalSkillValue =
            character.skillLevels[name].currentPoints + abilityModifier;
          //   console.log("skill", name);
          //   console.log(
          //     "skill value",
          //     character,
          //     character.skillLevels[name].currentPoints
          //   );
          //   console.log("totalSkillValue", totalSkillValue);

          return (
            <ListItem key={name}>
              <Typography>
                {`${name} - points: ${character.skillLevels[name].currentPoints}`}{" "}
                <Button
                  variant="outlined"
                  onClick={() => onSkillPointsChange(skill, 1)}
                >
                  +
                </Button>{" "}
                <Button
                  variant="outlined"
                  onClick={() => onSkillPointsChange(skill, -1)}
                >
                  -
                </Button>{" "}
                {`modifier (${attributeModifier}): ${abilityModifier} total: ${totalSkillValue}`}
              </Typography>
            </ListItem>
          );
        })}
      </List>
    </Grid>
  );
}

import { ATTRIBUTE_LIST, SKILL_LIST } from "./consts";

export const generateDefaultAttrs = (defaultValue = 10) => {
    const outputJson = {};
    for (const attribute of ATTRIBUTE_LIST) {
        outputJson[attribute] = {
            currentPoints:defaultValue,
            remainingPoints:calAvailablePoints(calAbilityModifier(defaultValue))
        }
    }
    return outputJson;
};
export const generateDefaultSkills=(defaultValue=0)=>{
    const outputJson = {};
    for (const skill of SKILL_LIST) {
        outputJson[skill.name] = {
            currentPoints:defaultValue,
            attributeModifier:skill.attributeModifier,
            totalSkillValue:0
        }
    }
    return outputJson;
}

export const calAbilityModifier = (attributeValue) => {
    return Math.round((attributeValue - 10) / 2);
};
export const calAvailablePoints = (attributeModifierValue) => {
    const temp = 4 * attributeModifierValue;
    return 10 + temp;
};
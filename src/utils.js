import { ATTRIBUTE_LIST } from "./consts";

export const generateDefaultAttrs = (defaultValue = 10) => {
    const outputJson = {};
    for (const attribute of ATTRIBUTE_LIST) {
        outputJson[attribute] = defaultValue
    }
    return outputJson;
};

export const calAbilityModifier = (attributeValue) => {
    return Math.round((attributeValue - 10) / 2);
};
export const calAvailablePoints = (attributeModifierValue) => {
    const temp = 4 * attributeModifierValue;
    return 10 + temp;
};
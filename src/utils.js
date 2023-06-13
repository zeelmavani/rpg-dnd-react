import { ATTRIBUTE_LIST } from "./consts";

export const generateDefaultAttrs = (defaultValue = 10) => {
    const outputJson = {};
    for (const attribute of ATTRIBUTE_LIST) {
        outputJson[attribute] = defaultValue
    }
    return outputJson;
};
import {appendTypeToToken} from '@/app/components/createTokenObj';
import set from 'set-value';

export default function convertTokensToGroupedObject(tokens, excludedSets) {
    let tokenObj = {};
    tokenObj = tokens.reduce((acc, token) => {
        if (excludedSets.includes(token.internal__Parent)) {
            return acc;
        }
        const obj = acc || {};
        const tokenWithType = appendTypeToToken(token);
        delete tokenWithType.name;
        delete tokenWithType.rawValue;
        delete tokenWithType.internal__Parent;
        if (tokenWithType.type === 'typography') {
            const expandedTypography = Object.entries(tokenWithType.value).reduce((acc, [key, val]) => {
                acc[key] = {
                    value: val,
                };
                return acc;
            }, {});
            set(obj, token.name, {...expandedTypography});
        } else {
            set(obj, token.name, tokenWithType);
        }
        return acc;
    }, {});
    return tokenObj;
}

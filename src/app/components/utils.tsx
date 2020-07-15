import JSON5 from 'json5';

const objectPath = require('object-path');

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach((key) => {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, {[key]: {}});
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, {[key]: source[key]});
            }
        });
    }

    return mergeDeep(target, ...sources);
}

const findAllAliases = ({key = null, arr}) => {
    return arr.reduce((prev, el) => {
        if (typeof el[1] === 'string' && el[1].startsWith('$')) {
            const obj = [`${key}.${el[0]}`, el[1]];
            prev.push(obj);
            return prev;
        }
        if (typeof el[1] === 'object') {
            const newKey = key ? [key, el[0]].join('.') : el[0];
            prev.push(...findAllAliases({key: newKey, arr: Object.entries(el[1])}));
        }
        return prev;
    }, []);
};

export function reduceToValues(tokens) {
    const reducedTokens = Object.entries(tokens).reduce((prev, group) => {
        // Retrieve all aliases and fill in their real value
        prev.push({[group[0]]: group[1].values});
        return prev;
    }, []);

    // Merge all tokens to one object
    const assigned = mergeDeep({}, ...reducedTokens);
    console.log({assigned});

    return assigned;
}

export function mergeTokens(tokens) {
    const mergedTokens = Object.entries(tokens).reduce((prev, group) => {
        // TODO: Iterate over self, allowing one to set references within a JSON
        const values = JSON5.parse(group[1].values);

        // Retrieve all aliases and fill in their real value
        const aliases = findAllAliases({arr: Object.entries(values)});
        if (aliases.length > 0) {
            aliases.forEach((item) => {
                const resolvedAlias = objectPath.get(JSON5.parse(tokens.options.values), item[1].substring(1));
                objectPath.set(values, item[0], resolvedAlias);
            });
        }
        prev.push(values);
        return prev;
    }, []);

    // Merge all tokens to one object
    const assigned = mergeDeep({}, ...mergedTokens);

    return assigned;
}

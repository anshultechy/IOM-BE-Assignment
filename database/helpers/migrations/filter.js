module.exports = (filterJSON, modelAlias) => {
    const filterObject =
    filterJSON !== null && filterJSON !== undefined
        ? JSON.parse(filterJSON)
        : null;

    return filterObject !== null
        ? Object.keys(filterObject).reduce(
            (acc, key) =>
                acc +
        `AND ${modelAlias}."${key}" = ${
            typeof filterObject[key] === 'string'
                ? `'${filterObject[key]}'`
                : filterObject[key]
        } `, '')
        : '';
};

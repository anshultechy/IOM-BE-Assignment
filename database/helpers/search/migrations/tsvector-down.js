module.exports = (sequelize, tableName, searchFields, vectorName) => {
    return sequelize
        .query(`DROP TRIGGER np_vector_${tableName.toLowerCase()}_update ON "${tableName}"`)
        .then(function() {
            console.log('removed trigger');
            return sequelize
                .query(`DROP INDEX np_search_${tableName.toLowerCase()}_idx`)
                .catch(console.log);
        }).then(function() {
            console.log('removed index');
            return sequelize
                .query('ALTER TABLE "' + tableName + '" DROP COLUMN "' + vectorName + '"')
                .catch(console.log);
        }).then(function() {
            console.log('removed column');
        }).catch(console.log);

};

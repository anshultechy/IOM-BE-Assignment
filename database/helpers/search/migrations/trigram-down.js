module.exports = (sequelize, tableName) => {
    return sequelize
        .query(`DROP INDEX IF EXISTS np_search_${tableName}_idx`)
        .then(function() {
            console.log('Index dropped: Dropping extension');
            return sequelize
                .query(`DROP EXTENSION IF EXISTS pg_trgm CASCADE`)
                .catch(console.log);
        }).catch(console.log);
};

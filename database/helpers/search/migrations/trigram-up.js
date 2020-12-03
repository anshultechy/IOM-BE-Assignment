module.exports = (sequelize, tableName, searchFields) => {
    return sequelize
        .query('CREATE EXTENSION IF NOT EXISTS pg_trgm ')
        .then(function() {
            console.log('Extension created: Creating index');
            return sequelize
                .query(`CREATE INDEX CONCURRENTLY np_search_${tableName}_idx ON "${tableName}" 
                        USING gin(${searchFields.map(el => el + ' gin_trgm_ops').join(',')});`)
                .catch(console.log);
        }).catch(console.log);
};


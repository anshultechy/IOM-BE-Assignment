module.exports = (sequelize, tableName, searchFields, vectorName) => {
    return sequelize
        .query('ALTER TABLE "' + tableName + '" ADD COLUMN "' + vectorName + '" TSVECTOR')
        .then(function() {
            console.log('Column added: Adding updating values');
            return sequelize
                .query('UPDATE "' + tableName + '" SET "' + vectorName + '" = to_tsvector(\'english\', ' + searchFields.join(' || \' \' || ') + ')')
                .catch(console.log);
        }).then(function() {
            console.log('Values added: Creating Index');
            return sequelize
                .query(`CREATE INDEX np_search_${tableName.toLowerCase()}_idx ON "${tableName}" USING gin("${vectorName}");`)
                .catch(console.log);
        }).then(function() {
            console.log('Index created: Adding trigger');
            return sequelize
                .query(`CREATE TRIGGER np_vector_${tableName.toLowerCase()}_update BEFORE INSERT OR UPDATE ON "${tableName}" FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger("${vectorName}", 'pg_catalog.english', ${searchFields.join(', ')})`)
                .catch(console.log);
        }).then(function() {
            console.log('Everything worked!');
        }).catch(console.log);
};

'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'Workers',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: true,
            } 
        },
        {
            freezeTableName: true,
        }
    );
};

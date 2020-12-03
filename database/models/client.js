'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'Client',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            }
        },
        {
            freezeTableName: true,
        }
    );
};

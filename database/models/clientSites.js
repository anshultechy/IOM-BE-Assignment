'use strict';
module.exports = (sequelize, DataTypes) => {
    const ClientSites = sequelize.define('ClientSites', {
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        clientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            references: {
                model: 'Client',
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
            },
        },
    }, {
        freezeTableName: true,
    });

    return require('./repositories/ClientSites')(ClientSites, sequelize);

};
